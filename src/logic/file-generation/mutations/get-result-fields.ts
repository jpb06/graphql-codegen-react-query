import { displayWarning } from '../../cli/console/console.messages';
import { getAllMatchingGroups } from '../../util/get-all-matching-groups';

export const getResultFields = (type: string, types: string): string => {
  const fields = new RegExp(`^export interface ${type} { (.*) }$`, 'm').exec(
    types,
  )?.[1];

  if (!fields) {
    displayWarning(`Type ${type} missing in generated types`);
    return '';
  }

  return getAllMatchingGroups(/ ?(.*?):.*?;/g, fields).join('\n');
};
