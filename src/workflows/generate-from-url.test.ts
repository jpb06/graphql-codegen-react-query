import axios from 'axios';
import { ensureDir, writeFile } from 'fs-extra';

import schema from './../tests-related/specs/types.json';
import { generateFromUrl } from './generate-from-url';
import { FetcherConfig } from '../cli/generate-from-url/args-validation/options-validation';

jest.mock('fs-extra');
jest.mock('axios');

describe('generateFromUrl', () => {
  const schemaUrl = 'http://localhost:3333/graphql';
  const outputPath = './api';
  const fetcherConfig: FetcherConfig = {
    functionName: 'useFetcher',
    path: './../useFetcher',
  };
  const infiniteQueries = ['productsByPage'];

  it('should generate types', async () => {
    jest.mocked(axios.post).mockResolvedValueOnce({
      data: schema,
    });

    const result = await generateFromUrl({
      schemaUrl,
      outputPath,
      fetcher: fetcherConfig,
      infiniteQueries,
    });

    expect(ensureDir).toHaveBeenCalledTimes(4);
    expect(ensureDir).toHaveBeenNthCalledWith(1, `${outputPath}/types`);
    expect(ensureDir).toHaveBeenNthCalledWith(2, `${outputPath}/logic`);
    expect(ensureDir).toHaveBeenNthCalledWith(3, `${outputPath}/queries`);
    expect(ensureDir).toHaveBeenNthCalledWith(4, `${outputPath}/mutations`);

    expect(writeFile).toHaveBeenCalledTimes(28);

    expect(result).toStrictEqual({ typesCount: 34 });
  });
});
