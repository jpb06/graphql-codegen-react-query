import { GqlType } from '../../../types/introspection-query-response.type';

export const graphqlGqlAddresstMockedData: GqlType = {
  kind: 'OBJECT',
  name: 'GqlAddress',
  description: null,
  fields: [
    {
      name: 'id',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'SCALAR', name: 'ID', ofType: null },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'street',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'SCALAR', name: 'String', ofType: null },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'zipCode',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'SCALAR', name: 'String', ofType: null },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'city',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'SCALAR', name: 'String', ofType: null },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'country',
      description: null,
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'SCALAR', name: 'String', ofType: null },
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
