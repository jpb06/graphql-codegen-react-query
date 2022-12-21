import { writeFile } from 'fs-extra';

import { graphqlQueryObjectMockedData } from '../../tests-related/mocked-data/graphql-schema';
import { generateSelectors } from './generate-selectors';

jest.mock('fs-extra');

describe('generateSelectors function', () => {
  const outputPath = './cool';

  it('should write two files', async () => {
    await generateSelectors(
      graphqlQueryObjectMockedData,
      'yolo',
      [],
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(2);
  });
});
