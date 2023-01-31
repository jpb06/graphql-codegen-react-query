import chalk from 'chalk';

import { ConfigFileOptions } from '../../types/args.type';

export const validateInfiniteQueries = (
  config: Partial<ConfigFileOptions>,
): Array<string> => {
  if (Array.isArray(config.infiniteQueries)) {
    return config.infiniteQueries;
  }

  throw new Error(
    chalk.bold.redBright(
      `Invalid type for 'infiniteQueries' option: expecting an array.\n`,
    ),
  );
};
