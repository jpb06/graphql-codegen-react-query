import { displayWarning } from '../../../cli/console/console.messages';

const typesMapping: Record<string, string> = {
  ID: 'string',
  String: 'string',
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
};

export const translateGraphqlTypeToTypescript = (
  name: string | null | undefined,
): string => {
  if (name === null || name === undefined) {
    displayWarning(`Missing type for ${name}`);
  }

  return typesMapping[name ?? 'unknown'];
};
