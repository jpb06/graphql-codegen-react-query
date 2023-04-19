import { ensureDir, writeFile } from 'fs-extra';

import { ConfigFileOptions } from '../cli/generate-from-url/types/args.type';
import { generateEntryPoint } from '../logic/codegen/entry-point/generate-entry-point';
import { generareInfiniteQueries } from '../logic/codegen/infinite-queries/generate-infinite-queries';
import { generateMutations } from '../logic/codegen/mutations/generate-mutations';
import { generateQueries } from '../logic/codegen/queries/generate-queries';
import { generateQueryReplacer } from '../logic/codegen/queries/query-replacer/generate-query-replacer';
import { generateSelectors } from '../logic/codegen/selectors/generate-selectors';
import { writeStaticCode } from '../logic/codegen/static-code/write-static-code';
import { fetchGraphqlSchema } from '../logic/fetching/fetch-graphql-schema';
import { getTypesWithEnumsObject } from '../logic/parsing/graphql-types/enums-picking/get-types-with-enums-object';
import { translateGraphqlTypesToTypescript } from '../logic/parsing/graphql-types/translate-graphql-types-to-typescript';
import { getEndpointsObjects } from '../logic/parsing/selectors/get-endpoints-objects';
import { capitalize } from '../logic/util/capitalize';

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
  const { count, types, typesObject, args } =
    translateGraphqlTypesToTypescript(schemaTypes);

  const typesWithEnumsObject = getTypesWithEnumsObject(typesObject, types);

  await ensureDir(`${outputPath}/types`);
  await writeFile(
    `${outputPath}/types/api-types.ts`,
    types.map((el) => el.data).join('\n'),
  );

  for (const { type, name, imports: i, data } of args) {
    await ensureDir(`${outputPath}/types/${type}/${name}`);

    const maybeImports =
      i.length > 0
        ? `import {${i.join(', ')}} from '../../api-types';\n\n`
        : '';
    await writeFile(
      `${outputPath}/types/${type}/${name}/${capitalize(name)}${capitalize(
        type === 'queries' ? 'Query' : 'Mutation',
      )}Args.type.ts`,
      `${maybeImports}${data}`,
    );
  }

  const selectors = await generateSelectors(queryObject, types, outputPath);

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
  await generateQueries(
    queryObject.fields,
    fetcher,
    outputPath,
    selectors,
    args,
  );
  const generatedInfiniteQueries = await generareInfiniteQueries(
    queryObject.fields,
    infiniteQueries,
    fetcher,
    outputPath,
    selectors,
  );

  await ensureDir(`${outputPath}/mutations`);

  await generateMutations(mutationObject.fields, types, fetcher, outputPath);

  await writeStaticCode(outputPath);

  await generateEntryPoint(
    outputPath,
    queryObject,
    mutationObject,
    generatedInfiniteQueries,
  );

  return { typesCount: count };
};
