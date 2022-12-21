import chalk from 'chalk';

import { runCommand } from '../../tests-related/run-command';

describe('validateUrlArguments function', () => {
  const validateArgumentsPath = './../cli/args/validate-url-arguments';
  const url = 'https://cool.org';
  const outputPath = './src/api';
  const fetcherPath = './../../useFetchData#useFetchData';
  global.console = { error: jest.fn() } as unknown as Console;
  const mockExit = jest
    .spyOn(process, 'exit')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementation((() => {}) as (code?: number | undefined) => never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error when no -s option was provided', async () => {
    runCommand(validateArgumentsPath, '-o', outputPath, '-f', fetcherPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: s');
  });

  it('should display an error when no -o option was given', async () => {
    runCommand(validateArgumentsPath, '-s', url, '-f', fetcherPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: o');
  });

  it('should display an error when no -f option was given', async () => {
    runCommand(validateArgumentsPath, '-s', url, '-o', outputPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: f');
  });

  it('should display an error when -s option value is not an url', async () => {
    runCommand(
      validateArgumentsPath,
      '-s',
      'yolo',
      '-o',
      outputPath,
      '-f',
      fetcherPath,
    );

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith(
      chalk.bold.redBright('Errors:\n-s\t\tExpecting an url\n'),
    );
  });

  it('should return args and default values', async () => {
    const args = runCommand(
      validateArgumentsPath,
      '-s',
      url,
      '-o',
      outputPath,
      '-f',
      fetcherPath,
    );

    expect(args).toStrictEqual({
      schemaUrl: url,
      outputPath,
      fetcherPath: './../../useFetchData#useFetchData',
    });
  });

  it('should return true when passing -t option', async () => {
    const args = runCommand(
      validateArgumentsPath,
      validateArgumentsPath,
      '-s',
      url,
      '-o',
      outputPath,
    );

    expect(args).toEqual(expect.objectContaining({}));
  });
});
