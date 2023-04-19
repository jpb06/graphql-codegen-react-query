export const queryHookContent = `import { useQuery, UseQueryResult, UseQueryOptions, QueryKey } from '@tanstack/react-query';

#fetcher-hook-import#
import { namedQuerySelectorToDocument } from '../logic/named-query-selector-to-document';
import { DeepReplace } from '../types/deep-replace.type';
import { QuerySelector } from '../types/query-selector';
import { QuerySelectorResult } from '../types/query-selector-result';
#args-type-import#
#result-type-import#
type #type#SelectorResult = Pick<QuerySelectorResult, '#name#'>['#name#'];

#args-type#

export type #type#QueryResultSelect<Selector> = {
  #name#: DeepReplace<Selector, #type#SelectorResult>;
};

export const use#type#PartialQuery = <Selector extends Pick<QuerySelector, '#name#'>['#name#']>(
  selector: Selector, #variables-argument#
  options?: Omit<
  UseQueryOptions<
    #type#QueryResultSelect<Selector>,
    unknown,
    #type#QueryResultSelect<Selector>
  >,
  'queryFn' | 'queryKey'
>
): UseQueryResult<#type#QueryResultSelect<Selector>> => {
  const document = namedQuerySelectorToDocument('#name#', selector#params-args#);

  return useQuery<#type#QueryResultSelect<Selector>, unknown, #type#QueryResultSelect<Selector>>({
    queryKey: ['#name#'#query-key-variables#],
    queryFn: #fetcherFn#<#type#QueryResultSelect<Selector>>(document)#variables-binding#,
    ...options
  });
};

export type #type#QueryResultType = { #name#?: #outputType# };

export const use#type#Query = (
  #variables-argument#
  options?: Omit<
    UseQueryOptions<
      #type#QueryResultType,
      unknown,
      #type#QueryResultType
    >,
    'queryFn' | 'queryKey'
  >
): UseQueryResult<#type#QueryResultType> =>
  use#type#PartialQuery(
    {
      #full-selector#
    }#variables#
    ,options as never
  );

use#type#Query.getKey = #queryKey#
`;
