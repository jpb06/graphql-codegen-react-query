export const mutationHookContent = `import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

#fetcher-hook-import#
#mutation-types-import#

#args-type#

export type #type#MutationResult = {
  #name#: #mutation-result-type#;
};

export const use#type#Mutation = (
  options?: UseMutationOptions<#type#MutationResult, unknown, #mutation-args-type#>
): UseMutationResult<#type#MutationResult, unknown, #mutation-args-type#> => {
  const mutation = \`#document#\`;

  return useMutation<#type#MutationResult, unknown, #mutation-args-type#>({
    mutationFn: useFetchData(mutation),
    ...options,
  });
};`;
