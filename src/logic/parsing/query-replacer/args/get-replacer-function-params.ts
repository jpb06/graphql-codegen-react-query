import { FunctionArgParsingResult } from './parse-function-arg';
import { capitalize } from '../../../util/capitalize';

const join = (tsArgs: Array<FunctionArgParsingResult>): string =>
  tsArgs.map((el) => el.name).join(', ');

export const getReplacerFunctionParams = (
  name: string,
  tsArgs: Array<FunctionArgParsingResult>,
): string => `({${join(tsArgs)}}: ${capitalize(name)}QueryArgs)`;
