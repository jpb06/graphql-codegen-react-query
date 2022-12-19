import { GqlType } from '../../../types/introspection-query-response.type';

export const graphqlQueryObjectMockedData: GqlType = {
  kind: 'OBJECT',
  name: 'Query',
  description: null,
  fields: [
    {
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
              kind: 'OBJECT',
              name: 'GqlProduct',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
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
    },
    {
      name: 'productsWithIds',
      description: null,
      args: [
        {
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
        },
      ],
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
              kind: 'OBJECT',
              name: 'GqlProduct',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'product',
      description: null,
      args: [
        {
          name: 'id',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: { kind: 'SCALAR', name: 'Int', ofType: null },
          },
          defaultValue: null,
        },
      ],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'OBJECT', name: 'GqlProduct', ofType: null },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'categories',
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
              kind: 'OBJECT',
              name: 'GqlCategory',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'category',
      description: null,
      args: [
        {
          name: 'id',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: { kind: 'SCALAR', name: 'Int', ofType: null },
          },
          defaultValue: null,
        },
      ],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'OBJECT', name: 'GqlCategory', ofType: null },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'me',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'OBJECT',
          name: 'GqlLoggedUser',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'getOrder',
      description: null,
      args: [
        {
          name: 'id',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: { kind: 'SCALAR', name: 'Int', ofType: null },
          },
          defaultValue: null,
        },
      ],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'OBJECT', name: 'GqlUserOrder', ofType: null },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'myOrders',
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
            ofType: { kind: 'OBJECT', name: 'GqlOrder', ofType: null },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'myAddresses',
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
              kind: 'OBJECT',
              name: 'GqlAddress',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
  ],
  inputFields: null,
  interfaces: [],
  enumValues: null,
  possibleTypes: null,
};
