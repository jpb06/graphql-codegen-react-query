import { getQueryFields } from './query-fields/get-query-fields';
import { GqlType } from '../../../types/introspection-query-response.type';

export const generateQuerySelector = (
  queryObject: GqlType,
  types: string,
  objectsName: Array<string>,
  enums: Array<string>,
  booleanize = true,
): string => {
  const empty = {
    output: '',
    imports: [] as Array<string>,
  };

  const { output, imports } =
    queryObject.fields?.reduce((acc, { name, type }) => {
      let target = '';
      if (type.ofType?.kind === 'LIST') {
        target = type.ofType.ofType?.ofType?.name as string;
      } else if (type.ofType?.kind === 'OBJECT') {
        target = type.ofType.name as string;
      }

      const { queryOutput, queryImports } = getQueryFields(
        name,
        target,
        types,
        objectsName,
        enums,
        booleanize,
      );

      return {
        output: `${acc.output}${name}${booleanize ? '?' : ''}: ${queryOutput}${
          booleanize ? '' : '[]'
        }\n`,
        imports: [...acc.imports, ...queryImports],
      };
    }, empty) ?? empty;

  const importsString =
    booleanize || imports.length === 0
      ? ''
      : `import {${imports
          .filter((value, index, array) => array.indexOf(value) === index)
          .join(',')}} from './api-types'\n\n`;

  return `${importsString}export type QuerySelector${
    booleanize ? '' : 'Result'
  } = {\n${output}}`;
};
