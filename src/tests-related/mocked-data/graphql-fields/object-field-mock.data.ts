import { GqlField } from '../../../types/introspection-query-response.type';

export const objectFieldMockData: GqlField = {
  name: 'role',
  description: null,
  args: [],
  type: {
    kind: 'NON_NULL',
    name: null,
    ofType: { kind: 'SCALAR', name: 'String', ofType: null },
  },
  isDeprecated: false,
  deprecationReason: null,
};
