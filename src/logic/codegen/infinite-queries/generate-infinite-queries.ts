import { writeFile } from 'fs-extra';

import { infiniteQueryHookContent } from './content/infinite-query-hook-content';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';
import { SelectorsGenerationResult } from '../selectors/generate-selectors';

export const generareInfiniteQueries = async (
  fields: Array<GqlField> | null,
  infiniteQueries: Array<string>,
  fetcher: FetcherConfig,
  outputPath: string,
  selectors: SelectorsGenerationResult,
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

    const regex = new RegExp(`^${query.name}\\?: {(.*)}$`, 'm');
    const selector = regex.exec(selectors.querySelector)?.[1];
    const selectorType = selector?.replace(/\?: /g, ': ');
    const selectorValue = selector
      ?.replace(/\?: boolean;/g, ': true,')
      .replace(/\?: {/g, ': {')
      .replace(/};/g, '},');

    const type = capitalize(query.name);

    let variables = '';
    let variablesArgument = '';
    if (query.args && query.args.length > 0) {
      variables = `, variables`;
      variablesArgument = `variables: ${type}QueryArgs,`;
    }

    const data = infiniteQueryHookContent
      .replace(
        '#fetcher-hook-import#',
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      )
      .replace(/#type#/g, type)
      .replace(/#name#/g, query.name)
      .replace('#full-selector-type#', selectorType || '')
      .replace('#full-selector#', selectorValue || '')
      .replace('#variables-argument#', variablesArgument)
      .replace('#variables#', variables);

    await writeFile(`${outputPath}/queries/use${type}InfiniteQuery.ts`, data);
    generatedInfiniteQueries.push(`use${type}InfiniteQuery`);
  }

  return generatedInfiniteQueries;
};
