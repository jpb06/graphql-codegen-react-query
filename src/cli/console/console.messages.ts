/* eslint-disable no-console */
import chalk from 'chalk';

import { GenerateFromUrlResult } from '../../workflows/generate-from-url';

export const displaySuccess = (
  outPath: string,
  { typesCount }: GenerateFromUrlResult,
): void => {
  const summary = `${chalk.greenBright(typesCount)} types generated`;
  console.info(
    `${chalk.cyanBright(
      'graphql-codegen-react-query',
    )} 🚀 - ${chalk.greenBright(
      'Types generated and saved in',
    )} ${chalk.underline.cyanBright(outPath)} (${summary})`,
  );
};

export const displayCodegenInitialized = (): void => {
  console.log(
    `${chalk.cyanBright(
      'graphql-codegen-react-query',
    )} ✅ - ${chalk.greenBright('Codegen initialized!')}`,
  );
};

export const displayError = (message: string): void => {
  console.error(
    `${chalk.cyanBright('graphql-codegen-react-query')} ❌ - ${chalk.redBright(
      message,
    )}`,
  );
};

export const displayException = (err: unknown): void => {
  console.error(
    `${chalk.cyanBright('graphql-codegen-react-query')} ❌ - ${chalk.redBright(
      (err as { stack: string }).stack,
    )}`,
  );
};

export const displayWarning = (text: string, id?: string): void => {
  const optionalId = id ? ` ${chalk.magentaBright(id)}:` : '';
  console.info(
    `${chalk.cyanBright(
      'graphql-codegen-react-query',
    )} 🚨 -${optionalId} ${chalk.hex('#FFA500')(text)}`,
  );
};
