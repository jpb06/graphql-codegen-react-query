export const infiniteQueryHookContent = `import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { namedQuerySelectorToDocument } from '../logic/named-query-selector-to-document';
import { deepMerge } from '../logic/deep-merge';
import { #type#QueryArgs } from '../types/api-types';
import { DeepReplace } from '../types/deep-replace.type';
import { QuerySelector } from '../types/query-selector';
import { QuerySelectorResult } from '../types/query-selector-result';
#fetcher-hook-import#

type #type#SelectorResult = Pick<
  QuerySelectorResult,
  '#name#'
>['#name#'];

export type #type#InfiniteResult<Selector> = {
  #name#: DeepReplace<Selector, #type#SelectorResult>;
};

export const use#type#InfiniteQuery = <
  Selector extends Pick<QuerySelector, '#name#'>['#name#'],
>(
  selector: Selector,
  variables: #type#QueryArgs,
  options?: Omit<
    UseInfiniteQueryOptions<
      #type#InfiniteResult<Selector>,
      unknown,
      #type#InfiniteResult<Selector>
    >,
    'queryFn' | 'queryKey'
  >,
): UseInfiniteQueryResult<#type#InfiniteResult<Selector>> => {
  const initialDocument = namedQuerySelectorToDocument(
    '#name#',
    selector,
    variables,
  );

  const queryKey = ['#name#InfiniteQuery', ...Object.values(variables)];
  const fetchFn =
    useFetchData<#type#InfiniteResult<Selector>>(initialDocument);

  return useInfiniteQuery<
    #type#InfiniteResult<Selector>,
    unknown,
    #type#InfiniteResult<Selector>
  >(
    queryKey,
    (metaData) => {
      const updatedVariables = deepMerge(variables, metaData.pageParam ?? {});
      const document = namedQuerySelectorToDocument(
        'productsByPage',
        selector,
        updatedVariables
      );

      return fetchFn(updatedVariables, document);
    },
    options,
  );
};
`;
