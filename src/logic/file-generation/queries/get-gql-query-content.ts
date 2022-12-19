import { readFile } from 'fs-extra';

export const getGqlQueryContent = async (
  fetcherPath: string,
): Promise<string> => {
  const data = await readFile('./src/output-code/useGqlQuery.ts', 'utf8');
  const [path, fetcherFn] = fetcherPath.split('#');

  return data
    .replace('//fetcher-hook-import', `import { ${fetcherFn} } from '${path}';`)
    .replace('#fetcher#', fetcherFn);
};
