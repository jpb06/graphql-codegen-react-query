import { writeFile } from 'fs-extra';

import { queryHookContent } from './content/query-hook-content';
import { generateGqlQuery } from './gql-query/generate-gql-query';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';
import { SelectorsGenerationResult } from '../selectors/generate-selectors';

export const generateQueries = async (
  fields: GqlField[] | null,
  fetcher: FetcherConfig,
  outputPath: string,
  selectors: SelectorsGenerationResult,
): Promise<void> => {
  await generateGqlQuery(fetcher, outputPath);

  if (fields === null) {
    return;
  }

  for (const query of fields) {
    const regex = new RegExp(`^${query.name}\\?: {(.*)}$`, 'm');
    const selector = regex.exec(selectors.querySelector)?.[1];
    const selectorType = selector?.replace(/\?: /g, ': ');
    const selectorValue = selector
      ?.replace(/\?: boolean;/g, ': true,')
      .replace(/\?: {/g, ': {')
      .replace(/};/g, '},');

    const type = capitalize(query.name);

    let variables = '';
    let queryKeyVariables = '';
    let variablesArgument = '';
    let variablesBinding = '';
    let argsTypeImport = '';
    if (query.args && query.args.length > 0) {
      const argstypeName = `${type}QueryArgs`;
      variables = `, variables`;
      queryKeyVariables = ', ...Object.values(variables)';
      variablesArgument = `variables: ${argstypeName},`;
      argsTypeImport = `import { ${argstypeName} } from '../types/api-types';\n`;
      variablesBinding = `.bind(null, variables, undefined)`;
    }

    const data = queryHookContent
      .replace(/#variables#/g, variables)
      .replace(/#variables-argument#/g, variablesArgument)
      .replace('#args-type-import#', argsTypeImport)
      .replace('#query-key-variables#', queryKeyVariables)
      .replace('#variables-binding#', variablesBinding)
      .replace(
        '#fetcher-hook-import#',
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      )
      .replace('#fetcherFn#', `${fetcher.functionName}`)
      .replace('#full-selector-type#', selectorType || '')
      .replace('#full-selector#', selectorValue || '')
      .replace(/#type#/g, type)
      .replace(/#name#/g, query.name);

    await writeFile(`${outputPath}/queries/use${type}Query.ts`, data);
  }
};
