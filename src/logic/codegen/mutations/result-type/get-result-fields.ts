import { displayWarning } from '../../../../cli/console/console.messages';

export const getResultFields = (type: string, types: string): string => {
  const fields = new RegExp(`^export interface ${type} { (.*) }$`, 'm').exec(
    types,
  )?.[1];

  if (!fields) {
    displayWarning(`Type ${type} missing in generated types`);
    return '';
  }

  return fields
    .split(';')
    .slice(0, -1)
    .map((field) => field.split(':')[0].trim())
    .join('\n');
};
