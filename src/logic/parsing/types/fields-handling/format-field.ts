export const formatField = (
  name: string,
  value: unknown,
  isFunctionArg: boolean,
  isNull: boolean,
): string => {
  return `${name}${isNull ? '?' : ''}: ${value}${isFunctionArg ? '' : '; '}`;
};
