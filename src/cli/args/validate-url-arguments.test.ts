import chalk from 'chalk';
import { pathExists, readFile } from 'fs-extra';

import { configFileWithBadUrlTypeMockData } from '../../tests-related/mocked-data/config-file/config-file-with-bad-url-type.mock-data';
import { configFileWithInvalidUrlMockData } from '../../tests-related/mocked-data/config-file/config-file-with-invalid-url.mock-data';
import { configFileWithoutFetcherFunctionNameMockData } from '../../tests-related/mocked-data/config-file/config-file-without-fetcher-function-name.mock-data';
import { configFileWithoutFetcherPathMockData } from '../../tests-related/mocked-data/config-file/config-file-without-fetcher-path.mock-data';
import { configFileWithoutFetcherMockData } from '../../tests-related/mocked-data/config-file/config-file-without-fetcher.mock-data';
import { configFileMockData } from '../../tests-related/mocked-data/config-file/config-file.mock-data';
import { runCommand } from '../../tests-related/run-command';

jest.mock('fs-extra');

describe('validateUrlArguments function', () => {
  const validateArgumentsPath = './../cli/args/validate-url-arguments';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error when config file does not exist', async () => {
    jest.mocked(pathExists).mockResolvedValueOnce(false as never);

    await expect(runCommand(validateArgumentsPath)).rejects.toThrow(
      chalk.bold.redBright(
        `Errors:\n-c\t\tConfig file ./react-query.codeden.yml doesn't exist\n`,
      ),
    );
  });

  it('should display an error when no fetcher option was provided', async () => {
    jest.mocked(pathExists).mockResolvedValueOnce(true as never);
    jest
      .mocked(readFile)
      .mockResolvedValueOnce(configFileWithoutFetcherMockData as never);

    await expect(runCommand(validateArgumentsPath)).rejects.toThrow(
      chalk.bold.redBright(`Missing fetcher config.\n`),
    );
  });

  it('should display an error when fetcher option has no path', async () => {
    jest.mocked(pathExists).mockResolvedValueOnce(true as never);
    jest
      .mocked(readFile)
      .mockResolvedValueOnce(configFileWithoutFetcherPathMockData as never);

    await expect(runCommand(validateArgumentsPath)).rejects.toThrow(
      chalk.bold.redBright(
        `Invalid type for fetcher path option: expecting a string.\n`,
      ),
    );
  });

  it('should display an error when fetcher option has no function name', async () => {
    jest.mocked(pathExists).mockResolvedValueOnce(true as never);
    jest
      .mocked(readFile)
      .mockResolvedValueOnce(
        configFileWithoutFetcherFunctionNameMockData as never,
      );

    await expect(runCommand(validateArgumentsPath)).rejects.toThrow(
      chalk.bold.redBright(
        `Invalid type for fetcher function name option: expecting a string.\n`,
      ),
    );
  });

  it('should display an error when url is invalid', async () => {
    jest.mocked(pathExists).mockResolvedValueOnce(true as never);
    jest
      .mocked(readFile)
      .mockResolvedValueOnce(configFileWithInvalidUrlMockData as never);

    await expect(runCommand(validateArgumentsPath)).rejects.toThrow(
      chalk.bold.redBright(
        `Invalid type for 'schemaUrl' option: expecting an url.\n`,
      ),
    );
  });

  it('should display an error when url has invalid type', async () => {
    jest.mocked(pathExists).mockResolvedValueOnce(true as never);
    jest
      .mocked(readFile)
      .mockResolvedValueOnce(configFileWithBadUrlTypeMockData as never);

    await expect(runCommand(validateArgumentsPath)).rejects.toThrow(
      chalk.bold.redBright(
        `Invalid type for 'schemaUrl' option: expecting an url.\n`,
      ),
    );
  });

  it('should use default path for config file', async () => {
    jest.mocked(pathExists).mockReturnValueOnce(true as never);
    jest.mocked(readFile).mockResolvedValueOnce(configFileMockData as never);

    await runCommand(validateArgumentsPath);

    expect(pathExists).toHaveBeenCalledWith('./react-query.codeden.yml');
  });

  it('should use the provided path for config file', async () => {
    const configFilePath = './cool.yml';

    jest.mocked(pathExists).mockReturnValueOnce(true as never);
    jest.mocked(readFile).mockResolvedValueOnce(configFileMockData as never);

    await runCommand(validateArgumentsPath, '-c', configFilePath);

    expect(pathExists).toHaveBeenCalledWith(configFilePath);
  });

  it('should return config', async () => {
    jest.mocked(pathExists).mockReturnValueOnce(true as never);
    jest.mocked(readFile).mockResolvedValueOnce(configFileMockData as never);

    const args = await runCommand(validateArgumentsPath);

    expect(args).toStrictEqual({
      fetcher: {
        path: './../../temp/useFetchData',
        functionName: 'useFetchData',
      },
      outputPath: './src/api',
      schemaUrl: 'http://localhost:3333/graphql',
      infiniteQueries: ['productsByPage'],
    });
  });
});
