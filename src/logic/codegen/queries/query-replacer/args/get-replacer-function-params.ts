import { capitalize } from '../../../../util/capitalize';

export const getReplacerFunctionParams = (name: string): string =>
  `(args: ${capitalize(name)}QueryArgs)`;
