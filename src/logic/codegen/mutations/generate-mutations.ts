import { writeFile } from 'fs-extra';

import { mutationHookContent } from './content/mutation-hook-content';
import { generateDocument } from './document/generate-document';
import { getMutationResultTypes } from './result-type/get-mutation-result-types';
import { FetcherConfig } from '../../../cli/args/options-validation';
import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';

export const generateMutations = async (
  types: string,
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
      args?.length && args.length > 0 ? `${mutationType}MutationArgs` : 'never';

    const { documentResultFields, resultType } = getMutationResultTypes(
      type,
      types,
    );
    const document = generateDocument(name, args, documentResultFields);

    const data = mutationHookContent
      .replace(
        '#fetcher-hook-import#',
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      )
      .replace(
        '#mutation-types-import#',
        `import {${
          mutationArgsType !== 'never' ? ` ${mutationArgsType}, ` : ''
        } ${resultType} } from '../types/api-types';`,
      )
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
