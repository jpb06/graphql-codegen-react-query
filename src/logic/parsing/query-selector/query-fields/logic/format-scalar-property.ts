import { setOptional } from './set-optional';

const propertyTypeRegex = /:.*/g;

export const formatScalar = (
  acc: string,
  property: string,
  booleanize: boolean,
  type: string,
  maybeArrayAnnotation: '' | '[]',
): string =>
  acc +
  property.replace(
    propertyTypeRegex,
    booleanize
      ? `${setOptional(property.includes('?:'))}: boolean; `
      : `: ${type}${maybeArrayAnnotation}; `,
  );
