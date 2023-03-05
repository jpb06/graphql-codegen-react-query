export const getTypesImports = (
  mutationArgsType: string,
  rootObjectsName: Array<string>,
  resultType: string,
): string => {
  const argsTypeImport =
    mutationArgsType !== 'unknown' ? ` ${mutationArgsType} ` : '';
  const resultTypeImport = rootObjectsName.includes(resultType)
    ? `, ${resultType}`
    : '';
  const typesImports =
    mutationArgsType === 'unknown' && !rootObjectsName.includes(resultType)
      ? ''
      : `import {${argsTypeImport} ${resultTypeImport} } from '../types/api-types';`;

  return typesImports;
};
