import { displayWarning } from '../../cli/console/console.messages';

const objectPropertiesRegex = (
  name: string,
  output: string,
): string | undefined =>
  new RegExp(`${name} ({[\\s\\S]*?})`, 'gm')
    .exec(output)?.[1]
    .replace(/\s/g, '')
    .slice(1, -1);

const propertyTypeRegex = /:.*/g;
const stripArrayRegex = /Array<(.*)>/;

export const booleanizeTypes = (
  name: string,
  types: string,
  objectsName: Array<string>,
  booleanize: boolean,
  depth = 0,
): string => {
  const properties = objectPropertiesRegex(name, types)
    ?.split(';')
    .filter((el) => el.length > 0);

  if (!properties) {
    return '';
  }

  const output = properties.reduce((acc, property) => {
    const [name, type] = property.split(':');
    const rawType = stripArrayRegex.exec(type)?.[1] ?? type;
    if (objectsName.includes(rawType)) {
      if (depth < 9) {
        return (
          acc +
          (`${name}${booleanize && !name.endsWith('?') ? '?' : ''}: ` +
            booleanizeTypes(rawType, types, objectsName, booleanize, ++depth) +
            ';')
        );
      }
      displayWarning(
        'Deeply nested type detected. Depth is limited to 9; falling back to type unknown',
      );
      return `${name}: unknown`;
    }

    return (
      acc +
      property.replace(
        propertyTypeRegex,
        booleanize ? '?: boolean; ' : `: ${type}; `,
      )
    );
  }, '');

  return `{ ${output} }`;
};
