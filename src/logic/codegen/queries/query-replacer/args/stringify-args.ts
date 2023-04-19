import { FunctionArgParsingResult } from './parse-function-arg';

export const stringifyArgs = (
  tsArgs: Array<FunctionArgParsingResult>,
): string =>
  tsArgs
    .map(({ name, type, imports }) => {
      const value = `$\{args?.${name} === undefined ? '${
        imports ? '{}' : 'null'
      }' : stringify(args?.${name}, "${type}")}`;

      return `${name}: ${value}`;
    })
    .join(', ');
