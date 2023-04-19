import { extractArgsTypes } from './args-types/extract-args-types';
import { parseGraphqlObject } from './object-parsing/parse-graphql-object';
import { GqlType } from '../../../types/introspection-query-response.type';
import { SchemaTypesRoot } from '../../../types/schema-types-root.type';

export type ParsedType = {
  name: string;
  type: 'arg' | 'enum' | 'type';
  data: string;
};

export type ParsedArg = {
  type: string;
  name: string;
  imports: Array<string>;
  gqlParams: Array<string>;
  gqlArgs: Array<string>;
  data: string;
};

export type ParseTypesResult = {
  count: number;
  types: Array<ParsedType>;
  args: Array<ParsedArg>;
  typesObject: SchemaTypesRoot;
};

export const translateGraphqlTypesToTypescript = (
  input: Array<GqlType>,
): ParseTypesResult => {
  const output = input.reduce(
    (result, { kind, name, fields, inputFields, enumValues }) => {
      if (name.startsWith('__')) {
        return result;
      }

      const isRoutesObject = name === 'Query' || name === 'Mutation';
      if (isRoutesObject) {
        const args = extractArgsTypes(name, fields);
        result.args.push(...args);
      }

      if (kind === 'ENUM') {
        const typeOutput = `export type ${name} = ${enumValues
          ?.map((v) => `'${v.name}'`)
          .join(' | ')}`;

        result.types.push({
          name,
          type: 'enum',
          data: typeOutput,
        });
        result.count++;

        return result;
      }

      const isObject = kind === 'OBJECT' || kind === 'INPUT_OBJECT';
      if (isObject) {
        const target = kind === 'OBJECT' ? fields : inputFields;

        const { output, typesObject: t } = parseGraphqlObject(name, target);

        result.typesObject[name] = t;

        result.types.push({ name, data: output, type: 'type' });
        result.count += 1;
      }

      return result;
    },
    {
      typesObject: {} as SchemaTypesRoot,
      types: [] as Array<ParsedType>,
      args: [] as Array<ParsedArg>,
      count: 0,
    },
  );

  const args = output.args.map((arg) => ({
    ...arg,
    imports: arg.imports.filter((i) => output.types.some((t) => t.name === i)),
  }));

  return {
    types: output.types,
    args,
    typesObject: { ...output.typesObject },
    count: output.count,
  };
};
