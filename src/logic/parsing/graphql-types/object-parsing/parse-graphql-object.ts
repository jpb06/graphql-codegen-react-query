import { parseGraphqlField } from './field-parsing/parse-graphql-field';
import { GqlField } from '../../../../types/introspection-query-response.type';
import { SchemaType } from '../../../../types/schema-type.type';
import { SchemaTypesRoot } from '../../../../types/schema-types-root.type';
import { capitalize } from '../../../util/capitalize';

type ParseGraphqlObjectOutput = {
  output: string;
  argsTypes: string;
  argsCount: number;
  typesObject: SchemaType;
  argsTypesObject: SchemaTypesRoot;
};

export const parseGraphqlObject = (
  name: string,
  fields: GqlField[] | null,
): ParseGraphqlObjectOutput => {
  if (!fields) {
    return {
      output: '',
      argsTypes: '',
      argsCount: 0,
      typesObject: {},
      argsTypesObject: {},
    };
  }

  const result = fields.reduce(
    (out, field): ParseGraphqlObjectOutput => {
      if (field.args && field.args.length > 0) {
        const outputType = parseGraphqlField(field, true).output;

        const functionDefinition = `${field.name}: (${field.args
          .map((arg) => parseGraphqlField(arg, true).output)
          .join(', ')}) =>${outputType?.split(':')[1]}`;

        out.output += `${functionDefinition}; `;
        const typeName = `${capitalize(field.name)}${name}Args`;
        const properties = field.args
          .map((arg) => parseGraphqlField(arg, true).output)
          .join(', ');
        out.argsTypes += `export type ${typeName} = { ${properties} };\n`;
        out.argsCount += 1;

        out.argsTypesObject[typeName] = field.args.reduce(
          (acc, arg) => ({
            ...acc,
            [arg.name]: parseGraphqlField(arg, true).type,
          }),
          {},
        );
      } else {
        const res = parseGraphqlField(field, false);
        out.output += res.output;
        out.typesObject[field.name] = res.type;
      }

      return out;
    },
    {
      output: '',
      argsTypes: '',
      argsCount: 0,
      typesObject: {} as SchemaType,
      argsTypesObject: {} as SchemaTypesRoot,
    },
  );

  return {
    ...result,
    output: `export interface ${name} { ${result.output}}\n`,
  };
};
