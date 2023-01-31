import {
  getMaybeArrayAnnotation,
  getRawType,
  getTypeProperties,
  format,
} from './logic';
import { displayWarning } from '../../../../cli/console/console.messages';

export const booleanizeTypes = (
  name: string,
  types: string,
  objectsName: Array<string>,
  booleanize: boolean,
  depth = 0,
): string => {
  const properties = getTypeProperties(name, types);
  if (!properties) {
    return '';
  }

  const output = properties.reduce((acc, property) => {
    const [name, type] = property.split(':');
    const maybeArrayAnnotation = getMaybeArrayAnnotation(booleanize, type);
    const rawType = getRawType(type);
    if (objectsName.includes(rawType)) {
      if (depth < 9) {
        return (
          acc +
          (`${name}${booleanize && !name.endsWith('?') ? '?' : ''}: ` +
            booleanizeTypes(rawType, types, objectsName, booleanize, ++depth) +
            maybeArrayAnnotation +
            ';')
        );
      }
      displayWarning(
        'Deeply nested type detected. Depth is limited to 9; falling back to type unknown',
      );
      return `${name}: unknown`;
    }

    return format(acc, property, booleanize, type, maybeArrayAnnotation);
  }, '');

  return `{ ${output} }`;
};
