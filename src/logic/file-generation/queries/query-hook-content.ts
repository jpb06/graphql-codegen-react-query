export const queryHookContent = `import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';

#fetcher-hook-import#
import { querySelectorToDocument } from '../logic/query-selector-to-document';
import { DeepReplace } from '../types/deep-replace.type';
import { QuerySelector } from '../types/query-selector';
import { QuerySelectorResult } from '../types/query-selector-result';
#args-type-import#
type #type#SelectorResult = Pick<QuerySelectorResult, '#name#'>['#name#'];

export type #type#Result<Selector> = DeepReplace<Selector, #type#SelectorResult>;

export const #name#QueryKey = ['#name#'];
export const use#type#Query = <Selector extends Pick<QuerySelector, '#name#'>['#name#']>(
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
  const document = querySelectorToDocument('#name#', selector#variables#);

  return useQuery<#type#Result<Selector>, unknown, #type#Result<Selector>>({
    queryKey: #name#QueryKey,
    queryFn: #fetcherFn#<#type#Result<Selector>>(document)#variables-binding#,
    ...options
  });
};`;
