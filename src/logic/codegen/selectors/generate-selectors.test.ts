import { writeFile } from 'fs-extra';

import { generateSelectors } from './generate-selectors';
import { parsedTypesMockData } from '../../../tests-related/mocked-data/generated-code/parsed-types.mock-data';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';

jest.mock('fs-extra');

describe('generateSelectors function', () => {
  const outputPath = './cool';

  it('should write two files', async () => {
    await generateSelectors(
      graphqlQueryObjectMockedData,
      parsedTypesMockData,
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(17);
  });
});
