import { ParsedType } from '../../../parsing/graphql-types/translate-graphql-types-to-typescript';

export const getTypesImports = (
  query: string,
  mutationArgsType: string,
  types: Array<ParsedType>,
  resultType: string,
): string => {
  const isScalar = types.find((t) => t.name === resultType) === undefined;

  const argsTypeImport =
    mutationArgsType === 'unknown'
      ? ''
      : `import { ${mutationArgsType} as Args } from './../types/mutations/${query}/${mutationArgsType}.type';`;

  const resultTypeImport = isScalar
    ? ''
    : `import { ${resultType} } from './../types/api-types';`;

  return `${argsTypeImport}\n${resultTypeImport}\n`;
};
