import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { GenerateFromUrlArguments } from '../../workflows/generate-from-url';

type Argv = { s: string; o: string; f: string };

export const validateArguments = (): GenerateFromUrlArguments => {
  const argv = yargs(hideBin(process.argv))
    .scriptName('generate-from-url')
    .usage(
      chalk.blueBright(
        '$0 -s [schemaUrl] -f [fetcherHookPath] -o [outputPath]',
      ),
    )
    .epilogue('Generates types and react-query hooks from a graphql schema')
    .example(
      '$0 -s http://localhost:3333/graphql -o ./src/api -f ./useFetcher#useFetcher',
      '',
    )
    .describe('s', chalk.cyanBright('Graphql schema url'))
    .describe('o', chalk.cyanBright('Generated code output path'))
    .describe(
      'f',
      chalk.cyanBright('Fetcher hook path and name (<path>#<hookName>)'),
    )
    .check((args) => {
      const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
      if (!urlRegex.test(args.s as string)) {
        throw new Error(
          chalk.bold.redBright('Errors:\n-s\t\tExpecting an url\n'),
        );
      }

      return true;
    })
    .demandOption(['s', 'o', 'f']).argv as Argv;

  return {
    schemaUrl: argv.s,
    outputPath: argv.o,
    fetcherPath: argv.f,
  };
};
