import { copyFile } from 'fs-extra';

import { generateOutputCodeChunks } from './generate-output-code-chunks';

jest.mock('fs-extra');

describe('generateOutputCodeChunks function', () => {
  const outputPath = './cool';

  it('should write four files', async () => {
    await generateOutputCodeChunks(outputPath);

    expect(copyFile).toHaveBeenCalledTimes(4);
  });
});
