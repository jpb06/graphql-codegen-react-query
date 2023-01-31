export const getMaybeArrayAnnotation = (
  booleanize: boolean,
  type: string,
): '' | '[]' => (!booleanize && type.startsWith('Array<') ? '[]' : '');
