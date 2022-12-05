import { GqlField } from '../../../types/introspection-query-response.type';

export const scalarListFieldMockData: GqlField = {
  name: 'ids',
  description: null,
  type: {
    kind: 'NON_NULL',
    name: null,
    ofType: {
      kind: 'LIST',
      name: null,
      ofType: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'SCALAR', name: 'Int', ofType: null },
      },
    },
  },
  defaultValue: null,
};
