export const configFileContent = (
  outputPath: string,
  apiUrl?: string,
): string => `outputPath: '${outputPath}/codegen'
schemaUrl: ${apiUrl}
fetcher:
  path: './../../useFetchData'
  functionName: 'useFetchData'
infiniteQueries:
  -
`;
