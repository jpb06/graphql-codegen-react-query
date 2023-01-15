export const queryHookContent = `import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';

#fetcher-hook-import#
import { namedQuerySelectorToDocument } from '../logic/named-query-selector-to-document';
import { DeepReplace } from '../types/deep-replace.type';
import { QuerySelector } from '../types/query-selector';
import { QuerySelectorResult } from '../types/query-selector-result';
#args-type-import#
type #type#SelectorResult = Pick<QuerySelectorResult, '#name#'>['#name#'];

export type #type#Result<Selector> = {
  #name#: DeepReplace<Selector, #type#SelectorResult>;
};

export const use#type#PartialQuery = <Selector extends Pick<QuerySelector, '#name#'>['#name#']>(
  selector: Selector, #variables-argument#
  options?: Omit<
  UseQueryOptions<
    #type#Result<Selector>,
    unknown,
    #type#Result<Selector>
  >,
  'queryFn' | 'queryKey'
>
): UseQueryResult<#type#Result<Selector>> => {
  const document = namedQuerySelectorToDocument('#name#', selector#variables#);

  return useQuery<#type#Result<Selector>, unknown, #type#Result<Selector>>({
    queryKey: ['#name#'#query-key-variables#],
    queryFn: #fetcherFn#<#type#Result<Selector>>(document)#variables-binding#,
    ...options
  });
};

type #type#Selector = {
  #full-selector-type#
};

export const use#type#Query = (
  #variables-argument#
  options?: Omit<
    UseQueryOptions<
      #type#Result<#type#Selector>,
      unknown,
      #type#Result<#type#Selector>
    >,
    'queryFn' | 'queryKey'
  >
): UseQueryResult<#type#Result<#type#Selector>> =>
  use#type#PartialQuery(
    {
      #full-selector#
    }#variables#
    ,options
  );
`;
