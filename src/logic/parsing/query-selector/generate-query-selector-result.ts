import { getQueryFields } from './query-fields/get-query-fields';
import { GqlType } from '../../../types/introspection-query-response.type';
import { ParsedType } from '../graphql-types/translate-graphql-types-to-typescript';

type SelectorResultFile = {
  name: string;
  content: string;
  imports?: Array<string>;
};

export const generateQuerySelectorResult = (
  queryObject: GqlType,
  types: Array<ParsedType>,
): Array<SelectorResultFile> => {
  const queries =
    queryObject.fields?.reduce((acc, { name, type }) => {
      let target = '';
      let maybeArray = '';
      if (type.ofType?.kind === 'LIST') {
        target = type.ofType.ofType?.ofType?.name as string;
        maybeArray = '[]';
      } else if (type.ofType?.kind === 'OBJECT') {
        target = type.ofType.name as string;
      }

      const { queryOutput, queryImports } = getQueryFields(
        name,
        target,
        types,
        false,
      );

      return [
        ...acc,
        {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          content: `${queryOutput}${maybeArray}`,
          imports: queryImports,
        },
      ];
    }, [] as Array<SelectorResultFile>) ?? [];

  return queries;
};
