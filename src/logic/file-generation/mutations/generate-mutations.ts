import { writeFile } from 'fs-extra';

import { GqlField } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';
import { generateDocument } from './generate-document';
import { getMutationResultTypes } from './get-mutation-result-types';
import { mutationHookContent } from './mutation-hook-content';

export const generateMutations = async (
  types: string,
  fields: GqlField[] | null,
  fetcherPath: string,
  outputPath: string,
): Promise<void> => {
  if (fields === null) {
    return;
  }

  const [path, fetcherFn] = fetcherPath.split('#');

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
        `import { ${fetcherFn} } from '${path}';`,
      )
      .replace(
        '#mutation-types-import#',
        `import {${
          mutationArgsType !== 'never' ? ` ${mutationArgsType}, ` : ''
        } ${resultType} } from '../types/api-types';`,
      )
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
