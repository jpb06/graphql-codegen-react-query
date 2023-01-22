import { writeFile } from 'fs-extra';

import { writeStaticCode } from './write-static-code';

jest.mock('fs-extra');

describe('writeStaticCode function', () => {
  const outputPath = './cool';

  it('should write four files', async () => {
    await writeStaticCode(outputPath);

    expect(writeFile).toHaveBeenCalledTimes(6);
  });
});
