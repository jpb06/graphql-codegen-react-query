import { writeFile } from 'fs-extra';

import { deepReplaceTypeContent } from '../../output-code/deep-replace.type';
import { dynamicQuerySelectorToDocumentContent } from '../../output-code/dynamic-query-selector-to-document';
import { namedQuerySelectorToDcumentContent } from '../../output-code/named-query-selector-to-document';
import { stringifyObjectContent } from '../../output-code/stringify-object';

export const generateOutputCodeChunks = async (
  outputPath: string,
): Promise<void> => {
  await writeFile(
    `${outputPath}/logic/stringify-object.ts`,
    stringifyObjectContent,
    {
      encoding: 'UTF8',
    },
  );
  await writeFile(
    `${outputPath}/logic/dynamic-query-selector-to-document.ts`,
    dynamicQuerySelectorToDocumentContent,
    {
      encoding: 'UTF8',
    },
  );
  await writeFile(
    `${outputPath}/logic/named-query-selector-to-document.ts`,
    namedQuerySelectorToDcumentContent,
    {
      encoding: 'UTF8',
    },
  );

  await writeFile(
    `${outputPath}/types/deep-replace.type.ts`,
    deepReplaceTypeContent,
    {
      encoding: 'UTF8',
    },
  );
};
