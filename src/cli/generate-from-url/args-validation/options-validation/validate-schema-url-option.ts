import chalk from 'chalk';

import { ConfigFileOptions } from '../../types/args.type';

export const validateSchemaUrl = (
  config: Partial<ConfigFileOptions>,
): string => {
  const message = chalk.bold.redBright(
    `Invalid type for 'schemaUrl' option: expecting a string.\n`,
  );
  if (typeof config.schemaUrl !== 'string') {
    throw new Error(message);
  }

  return config.schemaUrl;
};
