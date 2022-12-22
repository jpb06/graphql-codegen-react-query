import { copyFile } from 'fs-extra';

import { deepReplaceTypeContent } from '../../output-code/deep-replace.type';
import { dynamicQuerySelectorToDocumentContent } from '../../output-code/dynamic-query-selector-to-document';
import { namedQuerySelectorToDcumentContent } from '../../output-code/named-query-selector-to-document';
import { stringifyObjectContent } from '../../output-code/stringify-object';

export const generateOutputCodeChunks = async (
  outputPath: string,
): Promise<void> => {
  await copyFile(
    stringifyObjectContent,
    `${outputPath}/logic/stringify-object.ts`,
  );
  await copyFile(
    dynamicQuerySelectorToDocumentContent,
    `${outputPath}/logic/dynamic-query-selector-to-document.ts`,
  );
  await copyFile(
    namedQuerySelectorToDcumentContent,
    `${outputPath}/logic/named-query-selector-to-document.ts`,
  );

  await copyFile(
    deepReplaceTypeContent,
    `${outputPath}/types/deep-replace.type.ts`,
  );
};
