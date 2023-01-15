import { parseGraphqlObject } from './object-parsing/parse-graphql-object';
import { GqlType } from '../../../types/introspection-query-response.type';
import { SchemaTypesRoot } from '../../../types/schema-types-root.type';

type ParseTypesResult = {
  types: string;
  typesObject: SchemaTypesRoot;
  count: number;
  rootObjectsName: Array<string>;
  enums: Array<string>;
};

export const translateGraphqlTypesToTypescript = (
  input: Array<GqlType>,
): ParseTypesResult => {
  let count = 0;
  const rootObjectsName: Array<string> = [];
  const typesObject: SchemaTypesRoot = {};
  let argsTypesObject: SchemaTypesRoot = {};
  const enums: Array<string> = [];

  let argsTypesOutput = '';
  const output = input.reduce(
    (acc, { kind, name, fields, inputFields, enumValues }) => {
      if (name.startsWith('__')) {
        return acc;
      }

      if (kind === 'OBJECT' || kind === 'INPUT_OBJECT') {
        rootObjectsName.push(name);
        const target = kind === 'OBJECT' ? fields : inputFields;
        const {
          argsTypes,
          output,
          argsCount,
          typesObject: t,
          argsTypesObject: at,
        } = parseGraphqlObject(name, target);

        if (name !== 'Query' && name !== 'Mutation') {
          typesObject[name] = t;
        }
        acc += output;
        argsTypesOutput += argsTypes;
        argsTypesObject = { ...argsTypesObject, ...at };
        count += argsCount + 1;
      } else if (kind === 'ENUM') {
        enums.push(name);
        const typeOutput = `export type ${name} = ${enumValues
          ?.map((v) => `'${v.name}'`)
          .join(' | ')}`;

        acc += `${typeOutput};\n`;
        count++;
      }

      return acc;
    },
    '',
  );

  return {
    types: `/* eslint-disable */\n/* tslint:disable */\n\n${output}\n${argsTypesOutput}`,
    typesObject: { ...typesObject, ...argsTypesObject },
    count,
    rootObjectsName,
    enums,
  };
};
