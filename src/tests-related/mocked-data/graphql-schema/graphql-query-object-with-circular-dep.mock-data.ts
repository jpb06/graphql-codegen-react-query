import { GqlType } from '../../../types/introspection-query-response.type';

export const graphqlQueryObjectWithCircularDependencyMockedData: GqlType = {
  kind: 'OBJECT',
  name: 'Query',
  description: null,
  fields: [
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
  ],
  inputFields: null,
  interfaces: [],
  enumValues: null,
  possibleTypes: null,
};

export const circularTypesMockedData = `export interface GqlCategory { idCategory: string; product: GqlProduct }
export interface GqlProduct { idProduct: string; category: GqlCategory }`;
