import { writeFile } from 'fs-extra';

import { deepMergeContent } from './content/deep-merge.content';
import { deepReplaceTypeContent } from './content/deep-replace-type.content';
import { dynamicQuerySelectorToDocumentContent } from './content/dynamic-query-selector-to-document.content';
import { isObjectContent } from './content/is-object.content';
import { namedQuerySelectorToDcumentContent } from './content/named-query-selector-to-document.content';
import { stringifyObjectContent } from './content/stringify-object.content';

export const writeStaticCode = async (outputPath: string): Promise<void> => {
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

  await writeFile(`${outputPath}/logic/is-object.ts`, isObjectContent, {
    encoding: 'UTF8',
  });

  await writeFile(`${outputPath}/logic/deep-merge.ts`, deepMergeContent, {
    encoding: 'UTF8',
  });

  await writeFile(
    `${outputPath}/types/deep-replace.type.ts`,
    deepReplaceTypeContent,
    {
      encoding: 'UTF8',
    },
  );
};
