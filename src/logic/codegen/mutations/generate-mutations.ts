import { writeFile } from 'fs-extra';

import { mutationHookContent } from './content/mutation-hook-content';
import { generateDocument } from './document/generate-document';
import { getMutationResultTypes } from './result-type/get-mutation-result-types';
import { getTypesImports } from './types-imports/get-types-imports';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';

export const generateMutations = async (
  types: string,
  rootObjectsName: Array<string>,
  fields: GqlField[] | null,
  fetcher: FetcherConfig,
  outputPath: string,
): Promise<void> => {
  if (fields === null) {
    return;
  }

  for (const { type, name, args } of fields) {
    const mutationType = capitalize(name);
    const mutationArgsType =
      args?.length && args.length > 0
        ? `${mutationType}MutationArgs`
        : 'unknown';

    const { documentResultFields, resultType } = getMutationResultTypes(
      type,
      types,
    );
    const document = generateDocument(name, args, documentResultFields);
    const typesImports = getTypesImports(
      mutationArgsType,
      rootObjectsName,
      resultType,
    );

    const data = mutationHookContent
      .replace(
        '#fetcher-hook-import#',
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      )
      .replace('#mutation-types-import#', typesImports)
      .replace('#name#', name)
      .replace(/#mutation-result-type#/g, resultType)
      .replace(/#mutation-args-type#/g, mutationArgsType)
      .replace(/#type#/g, mutationType)
      .replace('#document#', document);

    await writeFile(
      `${outputPath}/mutations/use${mutationType}Mutation.ts`,
      data,
    );
  }
};
