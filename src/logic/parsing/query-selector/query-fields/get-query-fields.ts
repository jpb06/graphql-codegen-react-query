import chalk from 'chalk';

import {
  getMaybeArrayAnnotation,
  getRawType,
  getTypeProperties,
  formatScalar,
  setOptional,
} from './logic';
import { displayWarning } from '../../../../cli/console/console.messages';

type QueryFieldsResult = {
  queryOutput: string;
  queryImports: Array<string>;
};

export const getQueryFields = (
  queryName: string,
  name: string,
  types: string,
  objectsName: Array<string>,
  enums: Array<string>,
  booleanize: boolean,
  past: Array<{ propertyName: string; rawType: string }> = [],
): QueryFieldsResult => {
  const properties = getTypeProperties(name, types);
  if (!properties) {
    return { queryImports: [], queryOutput: '' };
  }

  const { imports, output } = properties.reduce(
    (acc, property) => {
      const [propertyName, type] = property.split(':');

      const maybeArrayAnnotation = getMaybeArrayAnnotation(booleanize, type);
      const rawType = getRawType(type);

      if (
        past.some(
          (p) => p.propertyName === propertyName && p.rawType === rawType,
        )
      ) {
        if (booleanize) {
          displayWarning(
            `Circular reference detected in ${chalk.whiteBright(
              `${queryName} query`,
            )}: ignoring property ${chalk.whiteBright(
              propertyName,
            )} of type ${chalk.whiteBright(rawType)}`,
          );
        }
        return acc;
      }

      const isTypeScalar = !objectsName.includes(rawType);
      if (isTypeScalar) {
        return {
          imports: enums.includes(rawType)
            ? [...acc.imports, rawType]
            : acc.imports,
          output: formatScalar(
            acc.output,
            property,
            booleanize,
            type,
            maybeArrayAnnotation,
          ),
        };
      }

      past.push({ propertyName, rawType });

      const deep = getQueryFields(
        queryName,
        rawType,
        types,
        objectsName,
        enums,
        booleanize,
        past,
      );

      const member =
        `${propertyName}${
          booleanize ? setOptional(name.endsWith('?')) : ''
        }: ` +
        deep.queryOutput +
        maybeArrayAnnotation +
        ';';

      return {
        output: acc.output + member,
        imports: [...acc.imports, ...deep.queryImports],
      };
    },
    { imports: [] as Array<string>, output: '' },
  );

  return { queryOutput: `{ ${output} }`, queryImports: imports };
};
