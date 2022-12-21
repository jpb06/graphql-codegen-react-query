import { capitalize } from '../../util/capitalize';
import { ArgResult } from './handle-arg';

const join = (tsArgs: Array<ArgResult>): string =>
  tsArgs.map((el) => el.name).join(', ');

export const getReplacerFunctionParams = (
  name: string,
  tsArgs: Array<ArgResult>,
): string => {
  return `({${join(tsArgs)}}: ${capitalize(name)}QueryArgs)`;
};
