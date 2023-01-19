import chalk from 'chalk';

import { ConfigFileOptions } from '../types/args.type';

export const validateSchemaUrl = (
  config: Partial<ConfigFileOptions>,
): string => {
  const message = chalk.bold.redBright(
    `Invalid type for 'schemaUrl' option: expecting an url.\n`,
  );
  if (typeof config.schemaUrl !== 'string') {
    throw new Error(message);
  }

  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  if (!urlRegex.test(config.schemaUrl)) {
    throw new Error(message);
  }

  return config.schemaUrl;
};
