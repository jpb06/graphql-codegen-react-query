export const decapitalize = (
  [first, ...rest]: string,
  upperRest = false,
): string =>
  first.toLowerCase() +
  (upperRest ? rest.join('').toUpperCase() : rest.join(''));
