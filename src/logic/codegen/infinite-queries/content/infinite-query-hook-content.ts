export const infiniteQueryHookContent = `import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { namedQuerySelectorToDocument } from '../logic/named-query-selector-to-document';
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
  const document = namedQuerySelectorToDocument(
    '#name#',
    selector,
    variables,
  );

  const queryKey = ['#name#InfiniteQuery', ...Object.values(variables)];
  const fetchFn =
    useFetchData<#type#InfiniteResult<Selector>>(document);

  return useInfiniteQuery<
    #type#InfiniteResult<Selector>,
    unknown,
    #type#InfiniteResult<Selector>
  >(
    queryKey,
    (metaData) => fetchFn({ ...variables, ...(metaData.pageParam ?? {}) }),
    options,
  );
};
`;
