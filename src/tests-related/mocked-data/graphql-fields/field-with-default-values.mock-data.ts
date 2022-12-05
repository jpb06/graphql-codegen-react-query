import { GqlField } from '../../../types/introspection-query-response.type';

export const fieldWithDefaultValueMockData: GqlField = {
  name: 'offset',
  description: null,
  type: { kind: 'SCALAR', name: 'Int', ofType: null },
  defaultValue: '0',
};
