export const formatField = (
  name: string,
  value: unknown,
  includeFieldName: boolean,
): string => (includeFieldName ? `${value}` : `${name}: ${value}; `);
