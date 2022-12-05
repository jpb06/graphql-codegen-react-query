import { GqlField } from '../../../types/introspection-query-response.type';

export const listFieldMockData: GqlField = {
  name: 'categoriesIds',
  description: null,
  type: {
    kind: 'LIST',
    name: null,
    ofType: {
      kind: 'NON_NULL',
      name: null,
      ofType: { kind: 'SCALAR', name: 'Int', ofType: null },
    },
  },
  defaultValue: null,
};
