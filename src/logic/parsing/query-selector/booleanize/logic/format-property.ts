const propertyTypeRegex = /:.*/g;

export const format = (
  acc: string,
  property: string,
  booleanize: boolean,
  type: string,
  maybeArrayAnnotation: '' | '[]',
): string =>
  acc +
  property.replace(
    propertyTypeRegex,
    booleanize ? '?: boolean; ' : `: ${type}${maybeArrayAnnotation}; `,
  );
