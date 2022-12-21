import { copyFile } from 'fs-extra';

export const generateOutputCodeChunks = async (
  outputPath: string,
): Promise<void> => {
  await copyFile(
    './src/output-code/stringify-object.ts',
    `${outputPath}/logic/stringify-object.ts`,
  );
  await copyFile(
    './src/output-code/dynamic-query-selector-to-document.ts',
    `${outputPath}/logic/dynamic-query-selector-to-document.ts`,
  );
  await copyFile(
    './src/output-code/named-query-selector-to-document.ts',
    `${outputPath}/logic/named-query-selector-to-document.ts`,
  );

  await copyFile(
    './src/output-code/deep-replace.type.ts',
    `${outputPath}/types/deep-replace.type.ts`,
  );
};
