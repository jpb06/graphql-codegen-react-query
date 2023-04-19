import { writeFile } from 'fs-extra';

import { queryHookContent } from './content/query-hook-content';
import { generateGqlQuery } from './gql-query/generate-gql-query';
import {
  displayError,
  displayWarning,
} from '../../../cli/console/console.messages';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import {
  GqlField,
  GqlFieldType,
} from '../../../types/introspection-query-response.type';
import { ParsedArg } from '../../parsing/graphql-types/translate-graphql-types-to-typescript';
import { capitalize } from '../../util/capitalize';
import { SelectorsGenerationResult } from '../selectors/generate-selectors';

type ResultType = {
  type: string | null;
  isArray: boolean;
};

const getUnderlyingType = (type: GqlFieldType): ResultType => {
  if (type.kind === 'LIST') {
    return { type: type.ofType?.ofType?.name || null, isArray: true };
  }

  return { type: type.name, isArray: false };
};

const getQueryResultType = (type: GqlFieldType): ResultType => {
  if (type.kind === 'NON_NULL') {
    return getUnderlyingType(type.ofType as GqlFieldType);
  }

  return getUnderlyingType(type);
};

export const generateQueries = async (
  fields: Array<GqlField> | null,
  fetcher: FetcherConfig,
  outputPath: string,
  selectors: SelectorsGenerationResult,
  args: Array<ParsedArg>,
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
    let queryKey = '';
    let argExport = '';
    let documentParams = '';
    if (query.args && query.args.length > 0) {
      const queryParams = args.find((a) => a.name === query.name);
      if (!queryParams) {
        displayError(`Missing args for query ${query.name}`);
        continue;
      }

      documentParams = `,'${queryParams.gqlParams}','${queryParams.gqlArgs}'`;

      const argstypeName = `${type}QueryArgs`;
      variables = `, variables`;
      queryKeyVariables = ', ...Object.values(variables)';
      variablesArgument = `variables: ${argstypeName},`;
      argsTypeImport = `import { ${argstypeName} as Args } from '../types/queries/${query.name}/${argstypeName}.type';\n`;
      variablesBinding = `.bind(null, variables, undefined)`;
      queryKey = `(variables: ${argstypeName}): QueryKey => ['${query.name}', variables];`;
      argExport = `export type ${argstypeName} = Args;\n`;
    } else {
      queryKey = `(_: never): QueryKey => ['${query.name}'];`;
    }

    const resultType = getQueryResultType(query.type);
    let resultTypeImport = '';
    let resultTypeName = `${type}QueryResult`;
    if (resultType.type === null) {
      displayWarning(`Missing result type for query ${query.name}`);
      resultTypeName = resultType.isArray ? `Array<unknown>` : `unknown`;
    } else {
      resultTypeImport = `import { ${resultTypeName} } from '../types/queries/${query.name}/${resultTypeName}.type';\n`;
    }

    const data = queryHookContent
      .replace(/#variables#/g, variables)
      .replace('#params-args#', documentParams)
      .replace(/#variables-argument#/g, variablesArgument)
      .replace('#args-type-import#', argsTypeImport)
      .replace('#args-type#', argExport)
      .replace('#result-type-import#', resultTypeImport)
      .replace('#queryKey#', queryKey)
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
      .replace(/#name#/g, query.name)
      .replace(/#outputType#/g, resultTypeName);

    await writeFile(`${outputPath}/queries/use${type}Query.ts`, data);
  }
};
