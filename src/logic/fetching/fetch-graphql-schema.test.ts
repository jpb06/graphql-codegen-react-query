import axios from 'axios';

import schema from './../../tests-related/specs/types.json';
import { fetchGraphqlSchema } from './fetch-graphql-schema';

jest.mock('axios');

describe('fetchGraphqlSchema function', () => {
  it('should return schema types', async () => {
    jest.mocked(axios.post).mockResolvedValueOnce({
      data: schema,
    });

    const result = await fetchGraphqlSchema('https://yolo.cool');

    expect(result).toHaveLength(39);
  });
});
