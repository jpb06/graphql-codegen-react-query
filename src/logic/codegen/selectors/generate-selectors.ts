import { writeFile } from 'fs-extra';

import { GqlType } from '../../../types/introspection-query-response.type';
import { generateQuerySelector } from '../../parsing/query-selector/generate-query-selector';

export type SelectorsGenerationResult = {
  querySelector: string;
  querySelectorResult: string;
};

export const generateSelectors = async (
  queryObject: GqlType,
  types: string,
  rootObjectsName: Array<string>,
  enums: Array<string>,
  outputPath: string,
): Promise<SelectorsGenerationResult> => {
  const querySelector = generateQuerySelector(
    queryObject,
    types,
    rootObjectsName,
    enums,
  );
  await writeFile(`${outputPath}/types/query-selector.ts`, querySelector);

  const querySelectorResult = generateQuerySelector(
    queryObject,
    types,
    rootObjectsName,
    enums,
    false,
  );
  await writeFile(
    `${outputPath}/types/query-selector-result.ts`,
    querySelectorResult,
  );

  return {
    querySelector,
    querySelectorResult,
  };
};
