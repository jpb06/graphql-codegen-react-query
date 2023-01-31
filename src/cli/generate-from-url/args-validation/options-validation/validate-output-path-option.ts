import chalk from 'chalk';

import { ConfigFileOptions } from '../../types/args.type';

export const validateOutputPath = (
  config: Partial<ConfigFileOptions>,
): string => {
  if (typeof config.outputPath !== 'string') {
    throw new Error(
      chalk.bold.redBright(
        `Invalid type for 'outputPath' option: expecting a string.\n`,
      ),
    );
  }

  return config.outputPath;
};
