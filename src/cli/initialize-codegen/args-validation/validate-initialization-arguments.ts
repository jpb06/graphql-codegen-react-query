import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { CodegenInitializationOptions } from '../types/args.type';

type CliArguments = { c: string; o: string; u: string };

export const validateArguments = (): CodegenInitializationOptions => {
  const defaultConfigFilePath = '.';
  const defaultCodegenOutputPath = './api';
  const defaultApiUrl = 'http://localhost:3333/graphql';

  const argv = yargs(hideBin(process.argv))
    .scriptName('gqlCodegenInit')
    .usage(chalk.blueBright('$0 -c [configFilePath] -o [generatedCodePath]'))
    .epilogue(
      'Initializing codegen tooling by creating a config file and the fetcher hook',
    )
    .example('$0 -c ./libs/graphql/codegen -o ./libs/graphql/artifacts', '')
    .describe('c', chalk.cyanBright('Where to write the codegen config file'))
    .default('c', defaultConfigFilePath)
    .describe('o', chalk.cyanBright('Where generated code should be written'))
    .default('o', defaultCodegenOutputPath)
    .describe('u', chalk.cyanBright('Graphql api url'))
    .default('u', defaultApiUrl)
    .demandOption(['c', 'o', 'u']).argv as CliArguments;

  return {
    codegenConfigFilePath: argv.c,
    codegenOutputPath: argv.o,
    apiUrl: argv.u,
  };
};
