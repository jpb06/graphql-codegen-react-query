import chalk from 'chalk';

import { runCommand } from '../../tests-related/run-command';

describe('validateUrlArguments function', () => {
  const validateArgumentsPath = './../cli/args/validate-url-arguments';
  const url = 'https://cool.org';
  const outputPath = './src/api';
  global.console = { error: jest.fn() } as unknown as Console;
  const mockExit = jest
    .spyOn(process, 'exit')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementation((() => {}) as (code?: number | undefined) => never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error when no -s option was given', async () => {
    runCommand(validateArgumentsPath, '-o', outputPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: s');
  });

  it('should display an error when no -o option was given', async () => {
    runCommand(validateArgumentsPath, '-s', url);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: o');
  });

  it('should display an error when -s option value is not an url', async () => {
    runCommand(validateArgumentsPath, '-s', 'yolo', '-o', outputPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith(
      chalk.bold.redBright('Errors:\n-s\t\tExpecting an url\n'),
    );
  });

  it('should return args and default values', async () => {
    const args = runCommand(validateArgumentsPath, '-s', url, '-o', outputPath);

    expect(args).toStrictEqual({
      schemaUrl: url,
      outputPath,
      importsNotUsedAsValues: false,
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
      '-t',
    );

    expect(args).toEqual(
      expect.objectContaining({
        importsNotUsedAsValues: true,
      }),
    );
  });

  it('should return true when giving an arbitrary valut to -t option', async () => {
    const args = runCommand(
      validateArgumentsPath,
      '-s',
      url,
      '-o',
      outputPath,
      '-t',
      'yolo',
    );

    expect(args).toEqual(
      expect.objectContaining({
        importsNotUsedAsValues: true,
      }),
    );
  });
});
