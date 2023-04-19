import { GqlField } from '../../../../types/introspection-query-response.type';
import { capitalize } from '../../../util/capitalize';
import { parseGraphqlField } from '../object-parsing/field-parsing/parse-graphql-field';
import { ParsedArg } from '../translate-graphql-types-to-typescript';

export const extractArgsTypes = (
  operationType: 'Query' | 'Mutation',
  fields: GqlField[] | null,
): Array<ParsedArg> => {
  if (!fields) {
    return [];
  }

  return fields.reduce((out, field): Array<ParsedArg> => {
    if (!field.args || field.args.length === 0) {
      return out;
    }

    const parsedArgs = field.args.map((arg) => parseGraphqlField(arg, true));

    const typeName = `${capitalize(field.name)}${operationType}Args`;
    const properties = parsedArgs.map((arg) => arg.output).join(', ');
    const data = `export type ${typeName} = { ${properties} };\n`;

    const imports = parsedArgs.map((arg) =>
      arg.type.startsWith('Array<')
        ? /^Array<(.*)>$/.exec(arg.type)?.[1] ?? ''
        : arg.type,
    );

    out.push({
      type: operationType === 'Query' ? 'queries' : 'mutations',
      name: field.name,
      gqlParams: parsedArgs.map((el) => el.gqlParams),
      gqlArgs: parsedArgs.map((el) => el.gqlArgs),
      imports,
      data,
    });

    return out;
  }, [] as Array<ParsedArg>);
};
