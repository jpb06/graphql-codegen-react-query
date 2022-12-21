import chalk from 'chalk';

import {
  displayError,
  displayException,
  displaySuccess,
  displayWarning,
} from './console.messages';

jest.mock('chalk', () => ({
  cyanBright: jest.fn(),
  greenBright: jest.fn(),
  redBright: jest.fn(),
  whiteBright: jest.fn(),
  yellowBright: jest.fn(),
  underline: {
    cyanBright: jest.fn(),
  },
}));
global.console = { info: jest.fn(), error: jest.fn() } as unknown as Console;

describe('displaySuccess function', () => {
  const outPath = './src/api';

  beforeEach(() => jest.clearAllMocks());

  it('should call console.info', () => {
    displaySuccess(outPath, {
      typesCount: 23,
    });

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    displaySuccess(outPath, {
      typesCount: 23,
    });

    expect(chalk.cyanBright).toHaveBeenCalledWith(
      'graphql-codegen-react-query',
    );
  });

  it('should display a success message in green and the number of handled endpoints', () => {
    displaySuccess(outPath, {
      typesCount: 23,
    });

    expect(chalk.greenBright).toHaveBeenCalledTimes(2);
    expect(chalk.greenBright).toHaveBeenNthCalledWith(
      2,
      'Types generated and saved in',
    );
  });

  it('should display the outpath in cyan underlined', () => {
    displaySuccess(outPath, {
      typesCount: 23,
    });

    expect(chalk.underline.cyanBright).toHaveBeenCalledWith(outPath);
  });
});

describe('displayException function', () => {
  const errorMessage = 'oh no!';

  it('should call console.error', () => {
    displayException({ stack: errorMessage });

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    displayException({ stack: errorMessage });

    expect(chalk.cyanBright).toHaveBeenCalledWith(
      'graphql-codegen-react-query',
    );
  });

  it('should display the error message in red', () => {
    displayException({ stack: errorMessage });

    expect(chalk.redBright).toHaveBeenCalledWith(errorMessage);
  });
});

describe('displayWarning function', () => {
  const warningMessage = 'oh no!';

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should call console.error', () => {
    displayWarning(warningMessage);

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    displayWarning(warningMessage);

    expect(chalk.cyanBright).toHaveBeenCalledWith(
      'graphql-codegen-react-query',
    );
  });

  it('should display the error message in red', () => {
    displayWarning(warningMessage);

    expect(chalk.yellowBright).toHaveBeenCalledWith(warningMessage);
  });
});

describe('displayError function', () => {
  const errorMessage = 'oh no!';

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should call console.error', () => {
    displayError(errorMessage);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should display the package name in cyan', () => {
    displayError(errorMessage);

    expect(chalk.cyanBright).toHaveBeenCalledWith(
      'graphql-codegen-react-query',
    );
  });

  it('should display the error message in red', () => {
    displayError(errorMessage);

    expect(chalk.redBright).toHaveBeenCalledWith(errorMessage);
  });
});
