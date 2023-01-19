import { writeFile } from 'fs-extra';

import { FetcherConfig } from '../../../../cli/args/options-validation';
import { useGqlQueryContent } from '../content/useGqlQuery-content';

export const generateGqlQuery = async (
  fetcher: FetcherConfig,
  outputPath: string,
): Promise<void> => {
  const data = useGqlQueryContent
    .replace(
      '//fetcher-hook-import',
      `import { ${fetcher.functionName} } from '${fetcher.path}';`,
    )
    .replace('#fetcher#', fetcher.functionName);

  await writeFile(`${outputPath}/queries/useGqlQuery.ts`, data);
};
