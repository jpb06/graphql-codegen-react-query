import { writeFile } from 'fs-extra';

import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';
import { getGqlQueryContent } from './get-gql-query-content';
import { queryHookContent } from './query-hook-content';

export const generateQueries = async (
  fields: GqlField[] | null,
  fetcherPath: string,
  outputPath: string,
): Promise<void> => {
  const data = await getGqlQueryContent(fetcherPath);
  await writeFile(`${outputPath}/queries/useGqlQuery.ts`, data);

  if (fields === null) {
    return;
  }

  const [path, fetcherFn] = fetcherPath.split('#');

  for (const query of fields) {
    const type = capitalize(query.name);

    let argsType = '';

    let variables = '';
    let variablesArgument = '';
    let variablesBinding = '';
    if (query.args && query.args.length > 0) {
      const argstypeName = `${type}QueryArgs`;
      argsType = `import { ${argstypeName} } from '../types/api-types';\n`;
      variables = `, variables`;
      variablesArgument = `variables: ${argstypeName},`;
      variablesBinding = `.bind(null, variables)`;
    }

    const data = queryHookContent
      .replace('#args-type-import#', argsType)
      .replace('#variables#', variables)
      .replace('#variables-argument#', variablesArgument)
      .replace('#variables-binding#', variablesBinding)
      .replace(
        '#fetcher-hook-import#',
        `import { ${fetcherFn} } from '${path}';`,
      )
      .replace('#fetcherFn#', `${fetcherFn}`)
      .replace(/#type#/g, type)
      .replace(/#name#/g, query.name);

    await writeFile(`${outputPath}/queries/use${type}Query.ts`, data);
  }
};
