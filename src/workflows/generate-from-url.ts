import { ensureDir, writeFile } from 'fs-extra';

import { fetchGraphqlSchema } from '../logic/fetching/fetch-graphql-schema';
import { generateIndexFile } from '../logic/file-generation/generate-index';
import { generateOutputCodeChunks } from '../logic/file-generation/generate-output-code-chunks';
import { generateSelectors } from '../logic/file-generation/generate-selectors';
import { generateMutations } from '../logic/file-generation/mutations/generate-mutations';
import { generateQueries } from '../logic/file-generation/queries/generate-queries';
import { generateQueryReplacer } from '../logic/parsing/query-replacer/generate-query-replacer';
import { translateTypesToTs } from '../logic/parsing/types/translate-types-to-ts';
import { getEndpointsObjects } from './get-endpoints-objects';

export type GenerateFromUrlArguments = {
  schemaUrl: string;
  outputPath: string;
  fetcherPath: string;
};

export type GenerateFromUrlResult = {
  typesCount: number;
};

export const generateFromUrl = async ({
  schemaUrl,
  outputPath,
  fetcherPath,
}: GenerateFromUrlArguments): Promise<GenerateFromUrlResult> => {
  const schemaTypes = await fetchGraphqlSchema(schemaUrl);

  const { queryObject, mutationObject } = getEndpointsObjects(schemaTypes);
  const { types, rootObjectsName, count } = translateTypesToTs(schemaTypes);

  await ensureDir(`${outputPath}/types`);
  await writeFile(`${outputPath}/types/api-types.ts`, types);
  await generateSelectors(queryObject, types, rootObjectsName, outputPath);

  await ensureDir(`${outputPath}/logic`);
  const queryReplacer = generateQueryReplacer(queryObject);
  await writeFile(`${outputPath}/logic/query-replacer.ts`, queryReplacer);

  await ensureDir(`${outputPath}/queries`);
  await generateQueries(queryObject.fields, fetcherPath, outputPath);

  await ensureDir(`${outputPath}/mutations`);
  await generateMutations(
    types,
    mutationObject.fields,
    fetcherPath,
    outputPath,
  );

  await generateOutputCodeChunks(outputPath);

  await generateIndexFile(outputPath, queryObject, mutationObject);

  return { typesCount: count };
};
