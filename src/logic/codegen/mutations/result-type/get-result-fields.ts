import { displayWarning } from '../../../../cli/console/console.messages';
import { ParsedType } from '../../../parsing/graphql-types/translate-graphql-types-to-typescript';

export const getResultFields = (
  name: string,
  type: string,
  types: Array<ParsedType>,
): string => {
  const maybeType = types.find((t) => t.name === type);

  if (!maybeType) {
    return type;
  }

  const fields = new RegExp(`^export interface ${type} { (.*) }$`, 'm').exec(
    maybeType.data,
  )?.[1];
  if (!fields) {
    displayWarning(`Type ${type} missing in generated types`);
    return '';
  }

  return fields
    .split(';')
    .slice(0, -1)
    .map((field) => {
      const [varName, type] = field.split(':').map((el) => el.trim());

      const withoutQuestionMark = varName.endsWith('?')
        ? varName.slice(0, -1)
        : varName;

      if (types.some((t) => t.name === type && t.type === 'type')) {
        return `${withoutQuestionMark} { ${getResultFields(
          name,
          type,
          types,
        )} }`;
      }

      return withoutQuestionMark;
    })
    .join('\n');
};
