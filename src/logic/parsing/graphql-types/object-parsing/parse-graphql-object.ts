import { parseGraphqlField } from './field-parsing/parse-graphql-field';
import { GqlField } from '../../../../types/introspection-query-response.type';
import { SchemaType } from '../../../../types/schema-type.type';

type ParseGraphqlObjectOutput = {
  output: string;
  typesObject: SchemaType;
};

export const parseGraphqlObject = (
  name: string,
  fields: GqlField[] | null,
): ParseGraphqlObjectOutput => {
  if (!fields) {
    return {
      output: '',
      typesObject: {},
    };
  }

  const result = fields.reduce(
    (out, field): ParseGraphqlObjectOutput => {
      const res = parseGraphqlField(field, false);
      out.output += res.output;
      out.typesObject[field.name] = res.type;

      return out;
    },
    {
      output: '',
      typesObject: {} as SchemaType,
    },
  );

  return {
    ...result,
    output: `export interface ${name} { ${result.output}}\n`,
  };
};
