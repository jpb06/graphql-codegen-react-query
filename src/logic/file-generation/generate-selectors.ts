import { writeFile } from 'fs-extra';

import { GqlType } from '../../types/introspection-query-response.type';
import { generateQuerySelector } from '../parsing/query-selector/generate-query-selector';

export const generateSelectors = async (
  queryObject: GqlType,
  types: string,
  rootObjectsName: string[],
  outputPath: string,
): Promise<void> => {
  const querySelector = generateQuerySelector(
    queryObject,
    types,
    rootObjectsName,
  );
  await writeFile(`${outputPath}/types/query-selector.ts`, querySelector);

  const querySelectorResult = generateQuerySelector(
    queryObject,
    types,
    rootObjectsName,
    false,
  );
  await writeFile(
    `${outputPath}/types/query-selector-result.ts`,
    querySelectorResult,
  );
};
