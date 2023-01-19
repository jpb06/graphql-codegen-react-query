import { FunctionArgParsingResult } from './parse-function-arg';

export const stringifyArgs = (
  tsArgs: Array<FunctionArgParsingResult>,
): string =>
  tsArgs
    .map((el) => {
      const value = `$\{stringify(${el.name}, "${el.type}")}`;

      return `${el.name}: ${value}`;
    })
    .join(', ');
