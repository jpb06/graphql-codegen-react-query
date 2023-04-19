import {
  getMaybeArrayAnnotation,
  getRawType,
  getTypeProperties,
  formatScalar,
  setOptional,
} from './logic';
import { ParsedType } from '../../graphql-types/translate-graphql-types-to-typescript';

type QueryFieldsResult = {
  queryOutput: string;
  queryImports: Array<string>;
  circularDependencies: Array<string>;
};

const emptyResult = {
  queryImports: [],
  queryOutput: '',
  circularDependencies: [],
};

export const getQueryFields = (
  queryName: string,
  name: string,
  types: Array<ParsedType>,
  booleanize: boolean,
  past: Array<{ propertyName: string; rawType: string }> = [],
): QueryFieldsResult => {
  const typeInfos = types.find((t) => t.name === name);
  if (!typeInfos) {
    return emptyResult;
  }
  const properties = getTypeProperties(name, typeInfos.data);
  if (!properties) {
    return emptyResult;
  }

  const { imports, output, circularDependencies } = properties.reduce(
    (acc, property) => {
      const circularDependencies: Array<string> = [];
      const [propertyName, type] = property.split(':');

      const maybeArrayAnnotation = getMaybeArrayAnnotation(booleanize, type);
      const rawType = getRawType(type);

      const hasCircularDependency = past.some(
        (p) => p.propertyName === propertyName && p.rawType === rawType,
      );
      if (hasCircularDependency) {
        return {
          ...acc,
          circularDependencies: [
            `- property ${propertyName} in ${name} <-> ${rawType}`,
          ],
        };
      }

      const propertyTypeInfos = types.find((t) => t.name === rawType);

      const isScalar = !propertyTypeInfos || propertyTypeInfos.type === 'enum';
      if (isScalar) {
        const isEnum = propertyTypeInfos?.type === 'enum';

        return {
          imports: isEnum ? [...acc.imports, type] : acc.imports,
          output: formatScalar(
            acc.output,
            property,
            booleanize,
            type,
            maybeArrayAnnotation,
          ),
          circularDependencies: [
            ...acc.circularDependencies,
            ...circularDependencies,
          ],
        };
      }

      past.push({ propertyName, rawType });

      const deep = getQueryFields(queryName, rawType, types, booleanize, past);

      const member =
        `${propertyName}${
          booleanize ? setOptional(propertyName.endsWith('?')) : ''
        }: ` +
        deep.queryOutput +
        maybeArrayAnnotation +
        ';';

      return {
        output: acc.output + member,
        imports: [...acc.imports, ...deep.queryImports],
        circularDependencies: [
          ...acc.circularDependencies,
          ...deep.circularDependencies,
        ],
      };
    },
    {
      imports: [] as Array<string>,
      output: '',
      circularDependencies: [] as Array<string>,
    },
  );

  return {
    queryOutput: `{ ${output} }`,
    queryImports: imports,
    circularDependencies,
  };
};
