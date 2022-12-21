export const mutationHookContent = `import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

#fetcher-hook-import#
#mutation-types-import#

export const use#type#Mutation = (
  options?: UseMutationOptions<#mutation-result-type#, unknown, #mutation-args-type#>
): UseMutationResult<#mutation-result-type#, unknown, #mutation-args-type#> => {
  const query = \`#document#\`;

  return useMutation<#mutation-result-type#, unknown, #mutation-args-type#>({
    mutationFn: useFetchData(query),
    ...options,
  });
};`;
