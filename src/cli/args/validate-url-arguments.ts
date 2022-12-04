import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { GenerateFromUrlArguments } from '../../workflows/generate-from-url';

type Argv = { s: string; o: string; t: boolean };

export const validateArguments = (): GenerateFromUrlArguments => {
  const argv = yargs(hideBin(process.argv))
    .scriptName('generateFromUrl')
    .usage(chalk.blueBright('$0 -s [schemaUrl] -o [outputPath]'))
    .epilogue('Generates types and react-query hooks from a graphql schema')
    .example('$0 -s http://localhost:3333/graphql -o ./src/api', '')
    .describe('s', chalk.cyanBright('Graphql schema json url'))
    .describe('o', chalk.cyanBright('Where to write the generated artifacts'))
    .describe(
      't',
      chalk.cyanBright(
        'Whether types should be exported with the `export type ...` syntax (importsNotUsedAsValues option)',
      ),
    )
    .default('t', false)
    .boolean('t')
    .check((args) => {
      const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
      if (!urlRegex.test(args.s as string)) {
        throw new Error(
          chalk.bold.redBright('Errors:\n-u\t\tExpecting an url\n'),
        );
      }

      return true;
    })
    .demandOption(['s', 'o']).argv as Argv;

  return {
    schemaUrl: argv.s,
    outputPath: argv.o,
    importsNotUsedAsValues: argv.t,
  };
};
