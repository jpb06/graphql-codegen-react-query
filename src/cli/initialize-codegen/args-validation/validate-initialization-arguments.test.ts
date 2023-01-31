import { runCommand } from '../../../tests-related/run-command';

jest.mock('fs-extra');

describe('validateUrlArguments function', () => {
  const validateArgumentsPath =
    './../cli/initialize-codegen/args-validation/validate-initialization-arguments';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use default parameters', async () => {
    const args = await runCommand(validateArgumentsPath);
    expect(args).toStrictEqual({
      apiUrl: 'http://localhost:3333/graphql',
      codegenConfigFilePath: '.',
      codegenOutputPath: './api',
    });
  });

  it('should return custom arguments', async () => {
    const args = await runCommand(
      validateArgumentsPath,
      '-c',
      './libs/graphql/codegen/src',
      '-o',
      'libs/graphql/artifacts/src/api',
      '-u',
      'NEXT_PUBLIC_GQL_API_URL',
    );

    expect(args).toStrictEqual({
      apiUrl: 'NEXT_PUBLIC_GQL_API_URL',
      codegenConfigFilePath: './libs/graphql/codegen/src',
      codegenOutputPath: 'libs/graphql/artifacts/src/api',
    });
  });
});
