import { GqlField } from '../../../types/introspection-query-response.type';

export const invalidListFieldMockData: GqlField = {
  name: 'products',
  description: null,
  args: [],
  type: {
    kind: 'NON_NULL',
    name: null,
    ofType: {
      kind: 'LIST',
      name: null,
      ofType: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'NON_NULL',
          name: 'Cool',
          ofType: null,
        },
      },
    },
  },
  isDeprecated: false,
  deprecationReason: null,
};
