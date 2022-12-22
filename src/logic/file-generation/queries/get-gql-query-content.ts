import { useGqlQueryContent } from '../../../output-code/useGqlQuery';

export const getGqlQueryContent = async (
  fetcherPath: string,
): Promise<string> => {
  const [path, fetcherFn] = fetcherPath.split('#');

  return useGqlQueryContent
    .replace('//fetcher-hook-import', `import { ${fetcherFn} } from '${path}';`)
    .replace('#fetcher#', fetcherFn);
};
