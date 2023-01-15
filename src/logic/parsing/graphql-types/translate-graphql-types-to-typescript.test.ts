import { translateGraphqlTypesToTypescript } from './translate-graphql-types-to-typescript';
import {
  graphqlEnumMockedData,
  graphqlGqlAddresstMockedData,
  graphqlMetadataTypeMockedData,
  graphqlQueryObjectMockedData,
} from '../../../tests-related/mocked-data/graphql-schema';

describe('translateGraphqlTypesToTypescript function', () => {
  it('should add eslint/tslint ignore at the beginning of the output', () => {
    const result = translateGraphqlTypesToTypescript([]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\n\n`,
      typesObject: {},
      count: 0,
      rootObjectsName: [],
      enums: [],
    });
  });

  it('should return nothing if all types begin with "__"', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlMetadataTypeMockedData,
    ]);

    expect(result).toStrictEqual({
      types: '/* eslint-disable */\n/* tslint:disable */\n\n\n',
      typesObject: {},
      count: 0,
      rootObjectsName: [],
      enums: [],
    });
  });

  it('should return enum types', () => {
    const result = translateGraphqlTypesToTypescript([graphqlEnumMockedData]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\nexport type NumberCondition = 'gte' | 'lte';\n\n`,
      typesObject: {},
      count: 1,
      rootObjectsName: [],
      enums: ['NumberCondition'],
    });
  });

  it('should return object types', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlGqlAddresstMockedData,
    ]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\nexport interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }\n\n`,
      typesObject: {
        GqlAddress: {
          id: 'string',
          street: 'string',
          zipCode: 'string',
          city: 'string',
          country: 'string',
        },
      },
      count: 1,
      rootObjectsName: ['GqlAddress'],
      enums: [],
    });
  });

  it('should return a complex object containing functions', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlQueryObjectMockedData,
    ]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\nexport interface Query { products: Array<GqlProduct>; productsByPage: (pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; productsWithIds: (ids: Array<number>) => Array<GqlProduct>; product: (id: number) => GqlProduct; categories: Array<GqlCategory>; category: (id: number) => GqlCategory; me: GqlLoggedUser; getOrder: (id: number) => GqlUserOrder; myOrders: Array<GqlOrder>; myAddresses: Array<GqlAddress>; }

export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput };
export type ProductsWithIdsQueryArgs = { ids: Array<number> };
export type ProductQueryArgs = { id: number };
export type CategoryQueryArgs = { id: number };
export type GetOrderQueryArgs = { id: number };\n`,
      typesObject: {
        ProductsByPageQueryArgs: {
          pagination: 'GqlPaginationArgs',
          filters: 'GqlPaginatedProductsFiltersInput',
          sort: 'GqlPaginatedProductsSortingInput',
        },
        ProductsWithIdsQueryArgs: { ids: 'Array<number>' },
        ProductQueryArgs: { id: 'number' },
        CategoryQueryArgs: { id: 'number' },
        GetOrderQueryArgs: { id: 'number' },
      },
      count: 6,
      rootObjectsName: ['Query'],
      enums: [],
    });
  });

  it('should return several types', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlGqlAddresstMockedData,
      graphqlQueryObjectMockedData,
      graphqlEnumMockedData,
      graphqlMetadataTypeMockedData,
    ]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */

export interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }
export interface Query { products: Array<GqlProduct>; productsByPage: (pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; productsWithIds: (ids: Array<number>) => Array<GqlProduct>; product: (id: number) => GqlProduct; categories: Array<GqlCategory>; category: (id: number) => GqlCategory; me: GqlLoggedUser; getOrder: (id: number) => GqlUserOrder; myOrders: Array<GqlOrder>; myAddresses: Array<GqlAddress>; }
export type NumberCondition = 'gte' | 'lte';

export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput };
export type ProductsWithIdsQueryArgs = { ids: Array<number> };
export type ProductQueryArgs = { id: number };
export type CategoryQueryArgs = { id: number };
export type GetOrderQueryArgs = { id: number };\n`,
      typesObject: {
        GqlAddress: {
          id: 'string',
          street: 'string',
          zipCode: 'string',
          city: 'string',
          country: 'string',
        },
        ProductsByPageQueryArgs: {
          pagination: 'GqlPaginationArgs',
          filters: 'GqlPaginatedProductsFiltersInput',
          sort: 'GqlPaginatedProductsSortingInput',
        },
        ProductsWithIdsQueryArgs: { ids: 'Array<number>' },
        ProductQueryArgs: { id: 'number' },
        CategoryQueryArgs: { id: 'number' },
        GetOrderQueryArgs: { id: 'number' },
      },
      count: 8,
      rootObjectsName: ['GqlAddress', 'Query'],
      enums: ['NumberCondition'],
    });
  });
});
