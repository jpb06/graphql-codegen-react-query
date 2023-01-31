import { ensureDir, writeFile } from 'fs-extra';

import { CodegenInitializationOptions } from '../cli/initialize-codegen/types/args.type';
import { configFileContent } from '../logic/initialization/content/config-file.content';
import { fetcherHookContent } from '../logic/initialization/content/fetcher-hook.content';

export const initializeCodegen = async ({
  codegenConfigFilePath,
  codegenOutputPath,
  apiUrl,
}: CodegenInitializationOptions): Promise<void> => {
  await ensureDir(codegenConfigFilePath);
  await ensureDir(codegenOutputPath);

  await writeFile(
    `${codegenConfigFilePath}/react-query.codegen.yml`,
    configFileContent(codegenOutputPath, apiUrl),
  );
  await writeFile(
    `${codegenOutputPath}/useFetchData.ts`,
    fetcherHookContent(apiUrl),
  );
};
