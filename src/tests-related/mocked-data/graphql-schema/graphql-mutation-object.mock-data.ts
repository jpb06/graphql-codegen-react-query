import { GqlType } from '../../../types/introspection-query-response.type';

export const graphqlMutationObjectMockedData: GqlType = {
  kind: 'OBJECT',
  name: 'Mutation',
  description: null,
  fields: [
    {
      name: 'withScalarResult',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'withoutArgs',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'OBJECT',
          name: 'GqlAddress',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'signup',
      description: null,
      args: [
        {
          name: 'email',
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
        {
          name: 'lastName',
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
        {
          name: 'firstName',
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
        {
          name: 'password',
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
          name: 'GqlAuthOutput',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'login',
      description: null,
      args: [
        {
          name: 'username',
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
        {
          name: 'password',
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
          name: 'GqlAuthOutput',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'placeOrder',
      description: null,
      args: [
        {
          name: 'creditCard',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'GqlPlaceOrderInput',
              ofType: null,
            },
          },
          defaultValue: null,
        },
        {
          name: 'orderedItems',
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
                  kind: 'INPUT_OBJECT',
                  name: 'GqlNewOrderedItem',
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
          kind: 'OBJECT',
          name: 'GqlPlaceOrderOutput',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'createAddress',
      description: null,
      args: [
        {
          name: 'street',
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
        {
          name: 'zipCode',
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
        {
          name: 'city',
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
        {
          name: 'country',
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
          name: 'GqlNewAddressOutput',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'withListResult',
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
      name: 'withNullableListResult',
      description: null,
      args: [],
      type: {
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
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'withNullableScalarResult',
      description: null,
      args: [],
      type: {
        kind: 'SCALAR',
        name: 'String',
        ofType: null,
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'withNullableObjectResult',
      description: null,
      args: [],
      type: {
        kind: 'OBJECT',
        name: 'GqlCategory',
        ofType: null,
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
