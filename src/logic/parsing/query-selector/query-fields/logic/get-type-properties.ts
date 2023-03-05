const objectPropertiesRegex = (
  name: string,
  output: string,
): string | undefined =>
  new RegExp(`${name} ({[\\s\\S]*?})`, 'gm')
    .exec(output)?.[1]
    .replace(/\s/g, '')
    .slice(1, -1);

export const getTypeProperties = (
  name: string,
  types: string,
): Array<string> | undefined =>
  objectPropertiesRegex(name, types)
    ?.split(';')
    .filter((el) => el.length > 0);
