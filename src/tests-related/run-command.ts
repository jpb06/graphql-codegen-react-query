export const runCommand = async (
  validationFilePath: string,
  ...args: Array<string>
): Promise<unknown> => {
  process.argv = [
    'node', // Not used but a value is required at this index in the array
    'cli.js', // Not used but a value is required at this index in the array
    ...args,
  ];

  return require(validationFilePath).validateArguments();
};
