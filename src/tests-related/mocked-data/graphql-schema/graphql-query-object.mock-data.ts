import { GqlType } from '../../../types/introspection-query-response.type';

export const graphqlQueryObjectMockedData: GqlType = {
  kind: 'OBJECT',
  name: 'Query',
  description: null,
  fields: [
    {
      name: 'catalog',
      description: null,
      args: [
        {
          name: 'slug',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null,
          },
          defaultValue: null,
        },
      ],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'OBJECT',
          name: 'GqlCatalogResult',
          ofType: null,
        },
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
      name: 'userInformations',
      description: null,
      args: [
        {
          name: 'idUser',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
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
          name: 'GqlBaseUser',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'users',
      description: null,
      args: [
        {
          name: 'searchText',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null,
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
              name: 'GqlBaseUser',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'getRegistrationStatus',
      description: null,
      args: [
        {
          name: 'token',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
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
          name: 'GqlInvitedUserStatus',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'companyInformations',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'OBJECT',
          name: 'GqlCompanyInformations',
          ofType: null,
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
          name: 'idProduct',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
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
          name: 'GqlProductResult',
          ofType: null,
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
              name: 'GqlProductByPageResult',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'countProductPages',
      description: null,
      args: [
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
          name: 'pagination',
          description: null,
          type: {
            kind: 'INPUT_OBJECT',
            name: 'GqlPaginationArgs',
            ofType: null,
          },
          defaultValue: null,
        },
      ],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'OBJECT',
          name: 'GqlProductCount',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'productVariantSummaries',
      description: null,
      args: [
        {
          name: 'input',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'GqlProductVariantSummaryInput',
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
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'GqlProductVariantSummary',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'companyAddresses',
      description: null,
      args: [
        {
          name: 'type',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'ENUM',
              name: 'GqlAddressType',
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
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'GqlCompanyAddress',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'ordersDetails',
      description: null,
      args: [
        {
          name: 'commandNb',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'Int',
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
          name: 'GqlOrderDetails',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'orders',
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
              name: 'GqlUserOrder',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'opsOrders',
      description: null,
      args: [
        {
          name: 'filters',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'GqlOpsOrderFiltersInput',
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
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'GqlOpsOrder',
              ofType: null,
            },
          },
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'assets',
      description: null,
      args: [
        {
          name: 'statuses',
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
                ofType: {
                  kind: 'ENUM',
                  name: 'GqlAssetStatus',
                  ofType: null,
                },
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
              name: 'GqlAsset',
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
