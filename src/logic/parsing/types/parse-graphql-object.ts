import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';
import { getField } from './fields-handling/get-field';

type ParseGraphqlObjectOutput = {
  output: string;
  argsTypes: string;
  argsCount: number;
};

export const parseGraphqlObject = (
  name: string,
  fields: GqlField[] | null,
): ParseGraphqlObjectOutput => {
  if (!fields) {
    return { output: '', argsTypes: '', argsCount: 0 };
  }

  const result = fields.reduce(
    (out, field): ParseGraphqlObjectOutput => {
      if (field.args && field.args.length > 0) {
        const outputType = getField(field, true);

        const functionDefinition = `${field.name}: (${field.args
          .map((arg) => getField(arg, true))
          .join(', ')}) =>${outputType?.split(':')[1]}`;

        out.output += `${functionDefinition}; `;
        out.argsTypes += `export type ${capitalize(
          field.name,
        )}${name}Args = { ${field.args
          .map((arg) => getField(arg, true))
          .join(', ')} };\n`;
        out.argsCount += 1;
      } else {
        out.output += getField(field, false);
      }

      return out;
    },
    { output: '', argsTypes: '', argsCount: 0 },
  );

  return {
    ...result,
    output: `export interface ${name} { ${result.output}}\n`,
  };
};
