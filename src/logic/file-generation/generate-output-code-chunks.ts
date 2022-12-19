import { copyFile } from 'fs-extra';

export const generateOutputCodeChunks = async (
  outputPath: string,
): Promise<void> => {
  await copyFile(
    './src/output-code/stringify-object.ts',
    `${outputPath}/logic/stringify-object.ts`,
  );
  await copyFile(
    './src/output-code/selector-to-document.ts',
    `${outputPath}/logic/selector-to-document.ts`,
  );
  await copyFile(
    './src/output-code/query-selector-to-document.ts',
    `${outputPath}/logic/query-selector-to-document.ts`,
  );

  await copyFile(
    './src/output-code/deep-replace.type.ts',
    `${outputPath}/types/deep-replace.type.ts`,
  );
};
