import { booleanizeTypes } from './booleanize/booleanize-types';
import { GqlType } from '../../../types/introspection-query-response.type';

export const generateQuerySelector = (
  queryObject: GqlType,
  types: string,
  objectsName: Array<string>,
  booleanize = true,
): string => {
  const fieldsOutput =
    queryObject.fields?.reduce((output, { name, type }) => {
      let typeOutput = `${name}${booleanize ? '?' : ''}: `;

      if (type.ofType?.kind === 'LIST') {
        typeOutput +=
          booleanizeTypes(
            type.ofType.ofType?.ofType?.name as string,
            types,
            objectsName,
            booleanize,
          ) + `${booleanize ? '' : '[]'}\n`;
      } else if (type.ofType?.kind === 'OBJECT') {
        typeOutput +=
          booleanizeTypes(
            type.ofType.name as string,
            types,
            objectsName,
            booleanize,
          ) + '\n';
      }

      return output + typeOutput;
    }, '') ?? '';

  return `export type QuerySelector${
    booleanize ? '' : 'Result'
  } = {\n${fieldsOutput}}`;
};
