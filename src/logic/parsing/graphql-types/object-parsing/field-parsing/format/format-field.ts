export const formatField = (
  name: string,
  value: unknown,
  isFunctionArg: boolean,
  isNull: boolean,
): string =>
  `${name}${isNull ? '?' : ''}: ${value}${isFunctionArg ? '' : '; '}`;
