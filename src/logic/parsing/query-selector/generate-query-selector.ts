import chalk from 'chalk';

import { getQueryFields } from './query-fields/get-query-fields';
import { displayWarning } from '../../../cli/console/console.messages';
import {
  GqlFieldType,
  GqlType,
} from '../../../types/introspection-query-response.type';
import { ParsedType } from '../graphql-types/translate-graphql-types-to-typescript';

type FieldTypeResult = {
  type: string;
  maybeArray: string;
};

const getFieldType = (input: GqlFieldType): FieldTypeResult => {
  if (input.ofType?.kind === 'LIST') {
    return {
      type: input.ofType.ofType?.ofType?.name as string,
      maybeArray: '[]',
    };
  } else if (input.ofType?.kind === 'OBJECT') {
    return {
      type: input.ofType.name as string,
      maybeArray: '',
    };
  }

  return {
    type: '',
    maybeArray: '',
  };
};

export const generateQuerySelector = (
  queryObject: GqlType,
  types: Array<ParsedType>,
  booleanize = true,
): string => {
  const empty = {
    output: '',
    imports: [] as Array<string>,
  };

  const { output, imports } =
    queryObject.fields?.reduce((acc, { name, type: fieldType }) => {
      const { type, maybeArray } = getFieldType(fieldType);

      const { queryOutput, queryImports, circularDependencies } =
        getQueryFields(name, type, types, booleanize);

      if (circularDependencies.length > 0) {
        displayWarning(
          `Circular references detected in ${name} query:\n${chalk.gray(
            circularDependencies.join('\n'),
          )}\n`,
        );
      }

      return {
        output: `${acc.output}${name}${booleanize ? '?' : ''}: ${queryOutput}${
          booleanize ? '' : maybeArray
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
