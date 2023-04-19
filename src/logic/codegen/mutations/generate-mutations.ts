import { writeFile } from 'fs-extra';

import { mutationHookContent } from './content/mutation-hook-content';
import { generateDocument } from './document/generate-document';
import { getMutationResultTypes } from './result-type/get-mutation-result-types';
import { getTypesImports } from './types-imports/get-types-imports';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import { GqlField } from '../../../types/introspection-query-response.type';
import { ParsedType } from '../../parsing/graphql-types/translate-graphql-types-to-typescript';
import { capitalize } from '../../util/capitalize';

export const generateMutations = async (
  fields: GqlField[] | null,
  types: Array<ParsedType>,
  fetcher: FetcherConfig,
  outputPath: string,
): Promise<void> => {
  if (fields === null) {
    return;
  }

  for (const { type, name, args } of fields) {
    const mutationType = capitalize(name);
    const hasArgs = args?.length && args.length > 0;
    const mutationArgsType = hasArgs
      ? `${mutationType}MutationArgs`
      : 'unknown';

    const argType = hasArgs
      ? `export type ${mutationType}MutationArgs = Args\n`
      : ``;

    const { documentResultFields, resultType, resultKind } =
      getMutationResultTypes(name, type, types);
    const document = generateDocument(
      name,
      args,
      documentResultFields,
      resultKind,
    );
    const typesImports = getTypesImports(
      name,
      mutationArgsType,
      types,
      resultType,
    );

    const data = mutationHookContent
      .replace(
        '#fetcher-hook-import#',
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      )
      .replace('#mutation-types-import#', typesImports)
      .replace('#name#', name)
      .replace('#args-type#', argType)
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
