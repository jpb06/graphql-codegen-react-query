export const getAllMatchingGroups = (
  regex: RegExp,
  input: string,
): Array<string> => {
  const results = [];

  let match: RegExpExecArray | null;
  while ((match = regex.exec(input))) {
    results.push(match[1]);
  }

  return results;
};
