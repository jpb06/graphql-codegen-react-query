import { writeFile } from 'fs-extra';

import { infiniteQueryHookContent } from './content/infinite-query-hook-content';
import { FetcherConfig } from '../../../cli/args/options-validation';
import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';

export const generareInfiniteQueries = async (
  fields: Array<GqlField> | null,
  infiniteQueries: Array<string>,
  fetcher: FetcherConfig,
  outputPath: string,
): Promise<Array<string>> => {
  if (infiniteQueries.length === 0 || fields === null) {
    return [];
  }

  const generatedInfiniteQueries = [];
  for (const infiniteQueryName of infiniteQueries) {
    const query = fields.find((el) => el.name === infiniteQueryName);
    if (!query) {
      continue;
    }

    const type = capitalize(query.name);

    const data = infiniteQueryHookContent
      .replace(
        '#fetcher-hook-import#',
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      )
      .replace(/#type#/g, type)
      .replace(/#name#/g, query.name);

    await writeFile(`${outputPath}/queries/use${type}InfiniteQuery.ts`, data);
    generatedInfiniteQueries.push(`use${type}InfiniteQuery`);
  }

  return generatedInfiniteQueries;
};
