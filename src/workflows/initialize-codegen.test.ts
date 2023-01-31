import { ensureDir, writeFile } from 'fs-extra';

import { initializeCodegen } from './initialize-codegen';

jest.mock('fs-extra');

describe('initializeCodegen', () => {
  const apiUrl = 'http://localhost:3333/graphql';
  const codegenConfigFilePath = './config';
  const codegenOutputPath = './api';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create output directories', async () => {
    await initializeCodegen({
      apiUrl,
      codegenConfigFilePath,
      codegenOutputPath,
    });

    expect(ensureDir).toHaveBeenCalledTimes(2);
    expect(ensureDir).toHaveBeenNthCalledWith(1, codegenConfigFilePath);
    expect(ensureDir).toHaveBeenNthCalledWith(2, codegenOutputPath);
  });

  it('should write a config file', async () => {
    await initializeCodegen({
      apiUrl,
      codegenConfigFilePath,
      codegenOutputPath,
    });

    expect(writeFile).toHaveBeenCalledTimes(2);
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      './config/react-query.codegen.yml',
      `outputPath: './api/codegen'
schemaUrl: http://localhost:3333/graphql
fetcher:
  path: './../../useFetchData'
  functionName: 'useFetchData'
infiniteQueries:
  -
`,
    );
  });

  it('should write a fetcher hook', async () => {
    await initializeCodegen({
      apiUrl,
      codegenConfigFilePath,
      codegenOutputPath,
    });

    expect(writeFile).toHaveBeenCalledTimes(2);
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      './api/useFetchData.ts',
      `const endpointUrl = 'http://localhost:3333/graphql';

export const useFetchData = <TData>(
  initialQuery: string
): ((variables?: unknown, query?: string) => Promise<TData>) => {
  return async (variables?: unknown, query?: string) => {
    const result = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // <- Set your custom headers here
      },
      body: JSON.stringify({
        query: query ? query : initialQuery,
        variables,
      }),
    });

    const json = await result.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || 'Error ...');
    }

    return json.data;
  };
};
`,
    );
  });
});
