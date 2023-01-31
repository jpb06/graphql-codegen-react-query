import axios from 'axios';

import schema from './../../tests-related/specs/types.json';
import { fetchGraphqlSchema } from './fetch-graphql-schema';

jest.mock('axios');

describe('fetchGraphqlSchema function', () => {
  it('should return schema types', async () => {
    const url = 'https://yolo.cool';
    jest.mocked(axios.post).mockResolvedValueOnce({
      data: schema,
    });

    const result = await fetchGraphqlSchema(url);

    expect(result).toHaveLength(39);
    expect(axios.post).toHaveBeenCalledWith(url, expect.any(Object));
  });

  it('should use post fix env var name when it does not exist', async () => {
    const url = 'API_URL';

    jest.mocked(axios.post).mockResolvedValueOnce({
      data: schema,
    });

    const result = await fetchGraphqlSchema(url);

    expect(result).toHaveLength(39);
    expect(axios.post).toHaveBeenCalledWith(
      'API_URL-not-set',
      expect.any(Object),
    );
  });

  it('should use environment variables value', async () => {
    const url = 'https://yolo.cool';
    process.env.API_URL = url;
    const input = 'API_URL';

    jest.mocked(axios.post).mockResolvedValueOnce({
      data: schema,
    });

    const result = await fetchGraphqlSchema(input);

    expect(result).toHaveLength(39);
    expect(axios.post).toHaveBeenCalledWith(url, expect.any(Object));
  });
});
