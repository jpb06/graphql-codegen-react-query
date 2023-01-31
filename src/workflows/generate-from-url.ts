import { ensureDir, writeFile } from 'fs-extra';

import { ConfigFileOptions } from '../cli/generate-from-url/types/args.type';
import { generateEntryPoint } from '../logic/codegen/entry-point/generate-entry-point';
import { generareInfiniteQueries } from '../logic/codegen/infinite-queries/generate-infinite-queries';
import { generateMutations } from '../logic/codegen/mutations/generate-mutations';
import { generateQueries } from '../logic/codegen/queries/generate-queries';
import { generateSelectors } from '../logic/codegen/selectors/generate-selectors';
import { writeStaticCode } from '../logic/codegen/static-code/write-static-code';
import { fetchGraphqlSchema } from '../logic/fetching/fetch-graphql-schema';
import { getTypesWithEnumsObject } from '../logic/parsing/graphql-types/enums-picking/get-types-with-enums-object';
import { translateGraphqlTypesToTypescript } from '../logic/parsing/graphql-types/translate-graphql-types-to-typescript';
import { generateQueryReplacer } from '../logic/parsing/query-replacer/generate-query-replacer';
import { getEndpointsObjects } from '../logic/parsing/selectors/get-endpoints-objects';

export type GenerateFromUrlResult = {
  typesCount: number;
};

export const generateFromUrl = async ({
  schemaUrl,
  outputPath,
  fetcher,
  infiniteQueries,
}: ConfigFileOptions): Promise<GenerateFromUrlResult> => {
  const schemaTypes = await fetchGraphqlSchema(schemaUrl);

  const { queryObject, mutationObject } = getEndpointsObjects(schemaTypes);
  const { types, rootObjectsName, count, enums, typesObject } =
    translateGraphqlTypesToTypescript(schemaTypes);
  const typesWithEnumsObject = getTypesWithEnumsObject(typesObject, enums);

  await ensureDir(`${outputPath}/types`);
  await writeFile(`${outputPath}/types/api-types.ts`, types);
  const selectors = await generateSelectors(
    queryObject,
    types,
    rootObjectsName,
    outputPath,
  );

  await ensureDir(`${outputPath}/logic`);
  await writeFile(
    `${outputPath}/logic/types-with-enums-object.ts`,
    `export const typesWithEnumsObject = ${JSON.stringify(
      typesWithEnumsObject,
      null,
      2,
    )}`,
  );
  const queryReplacer = generateQueryReplacer(queryObject);
  await writeFile(`${outputPath}/logic/query-replacer.ts`, queryReplacer);

  await ensureDir(`${outputPath}/queries`);
  await generateQueries(queryObject.fields, fetcher, outputPath, selectors);
  const generatedInfiniteQueries = await generareInfiniteQueries(
    queryObject.fields,
    infiniteQueries,
    fetcher,
    outputPath,
  );

  await ensureDir(`${outputPath}/mutations`);
  await generateMutations(types, mutationObject.fields, fetcher, outputPath);

  await writeStaticCode(outputPath);

  await generateEntryPoint(
    outputPath,
    queryObject,
    mutationObject,
    generatedInfiniteQueries,
  );

  return { typesCount: count };
};
