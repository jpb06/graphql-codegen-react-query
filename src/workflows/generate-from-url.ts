import { ensureDir, writeFile } from 'fs-extra';

import { fetchGraphqlSchema } from '../logic/fetching/fetch-graphql-schema';
import { parseTypes } from '../logic/parsing/parse-types';

export type GenerateFromUrlArguments = {
  schemaUrl: string;
  outputPath: string;
  importsNotUsedAsValues: boolean;
};

export type GenerateFromUrlResult = {
  typesCount: number;
};

export const generateFromUrl = async ({
  schemaUrl,
  outputPath,
}: GenerateFromUrlArguments): Promise<GenerateFromUrlResult> => {
  const schemaTypes = await fetchGraphqlSchema(schemaUrl);
  const { output, typesCount } = parseTypes(schemaTypes);

  await ensureDir(outputPath);
  await writeFile(`${outputPath}/types.ts`, output);

  return { typesCount };
};
