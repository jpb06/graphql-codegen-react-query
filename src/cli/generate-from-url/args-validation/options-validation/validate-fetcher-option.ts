import chalk from 'chalk';

import { ConfigFileOptions } from '../../types/args.type';

export type FetcherConfig = {
  path: string;
  functionName: string;
};

export const validateFetcherOption = async (
  config: Partial<ConfigFileOptions>,
): Promise<FetcherConfig> => {
  if (!config.fetcher) {
    throw new Error(chalk.bold.redBright(`Missing fetcher config.\n`));
  }

  if (typeof config.fetcher.path !== 'string') {
    throw new Error(
      chalk.bold.redBright(
        `Invalid type for fetcher path option: expecting a string.\n`,
      ),
    );
  }

  if (typeof config.fetcher.functionName !== 'string') {
    throw new Error(
      chalk.bold.redBright(
        `Invalid type for fetcher function name option: expecting a string.\n`,
      ),
    );
  }

  return config.fetcher;
};
