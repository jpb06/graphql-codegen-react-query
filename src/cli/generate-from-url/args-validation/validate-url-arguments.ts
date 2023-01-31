import chalk from 'chalk';
import { pathExists, readFile } from 'fs-extra';
import yaml from 'yaml';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { ConfigFileOptions } from './../types/args.type';
import {
  validateFetcherOption,
  validateInfiniteQueries,
  validateOutputPath,
  validateSchemaUrl,
} from './options-validation';

type CliArguments = { c: string };

export const validateArguments = async (): Promise<ConfigFileOptions> => {
  const defaultConfigFilePath = './react-query.codegen.yml';

  const argv = yargs(hideBin(process.argv))
    .scriptName('gqlCodegen')
    .usage(chalk.blueBright('$0 -c [configFilePath]'))
    .epilogue('Generates types and react-query hooks from a graphql schema')
    .example('$0 -c ./libs/graphql/react-query.codegen.yml', '')
    .describe('c', chalk.cyanBright('Codegen config file path'))
    .default('c', defaultConfigFilePath)
    .demandOption(['c']).argv as CliArguments;

  const configFileExists = await pathExists(argv.c);
  if (!configFileExists) {
    throw new Error(
      chalk.bold.redBright(
        `Errors:\n-c\t\tConfig file ${argv.c} doesn't exist\n`,
      ),
    );
  }

  const configData = await readFile(argv.c, 'UTF8');
  const config = yaml.parse(configData) as Partial<ConfigFileOptions>;
  const fetcher = await validateFetcherOption(config);
  const outputPath = validateOutputPath(config);
  const schemaUrl = validateSchemaUrl(config);
  const infiniteQueries = validateInfiniteQueries(config);

  return {
    fetcher,
    outputPath,
    schemaUrl,
    infiniteQueries,
  };
};
