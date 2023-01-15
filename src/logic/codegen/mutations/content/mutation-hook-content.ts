export const mutationHookContent = `import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

#fetcher-hook-import#
#mutation-types-import#

export type #type#Result = {
  #name#: #mutation-result-type#;
};

export const use#type#Mutation = (
  options?: UseMutationOptions<#type#Result, unknown, #mutation-args-type#>
): UseMutationResult<#type#Result, unknown, #mutation-args-type#> => {
  const mutation = \`#document#\`;

  return useMutation<#type#Result, unknown, #mutation-args-type#>({
    mutationFn: useFetchData(mutation),
    ...options,
  });
};`;
