import { displayWarning } from '../../cli/console/console.messages';
import { typesMapping } from '../../constants/types-mapping';

export const translatedType = (name: string | null | undefined): string => {
  if (name === null || name === undefined) {
    displayWarning(`Missing type for ${name}`);
  }

  return typesMapping[name ?? 'unknown'];
};
