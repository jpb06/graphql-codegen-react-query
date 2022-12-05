import { GqlField } from '../../../types/introspection-query-response.type';

export const functionFieldMockData: GqlField = {
  name: 'productsByPage',
  description: null,
  args: [
    {
      name: 'pagination',
      description: null,
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'INPUT_OBJECT',
          name: 'GqlPaginationArgs',
          ofType: null,
        },
      },
      defaultValue: null,
    },
    {
      name: 'filters',
      description: null,
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'INPUT_OBJECT',
          name: 'GqlPaginatedProductsFiltersInput',
          ofType: null,
        },
      },
      defaultValue: null,
    },
    {
      name: 'sort',
      description: null,
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'INPUT_OBJECT',
          name: 'GqlPaginatedProductsSortingInput',
          ofType: null,
        },
      },
      defaultValue: null,
    },
  ],
  type: {
    kind: 'NON_NULL',
    name: null,
    ofType: {
      kind: 'OBJECT',
      name: 'GqlPaginatedProductsOutput',
      ofType: null,
    },
  },
  isDeprecated: false,
  deprecationReason: null,
};
