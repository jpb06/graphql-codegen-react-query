import {
  graphqlEnumMockedData,
  graphqlGqlAddresstMockedData,
  graphqlMetadataTypeMockedData,
  graphqlQueryObjectMockedData,
} from '../../../tests-related/mocked-data/graphql-schema';
import { translateTypesToTs } from './translate-types-to-ts';

describe('translateTypesToTs function', () => {
  it('should add eslint/tslint ignore at the beginning of the output', () => {
    const result = translateTypesToTs([]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\n\n`,
      count: 0,
      rootObjectsName: [],
    });
  });

  it('should return nothing if all types begin with "__"', () => {
    const result = translateTypesToTs([graphqlMetadataTypeMockedData]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\n\n`,
      count: 0,
      rootObjectsName: [],
    });
  });

  it('should return enum types', () => {
    const result = translateTypesToTs([graphqlEnumMockedData]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\nexport type NumberCondition = 'gte' | 'lte';\n\n`,
      count: 1,
      rootObjectsName: [],
    });
  });

  it('should return object types', () => {
    const result = translateTypesToTs([graphqlGqlAddresstMockedData]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\nexport interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }\n\n`,
      count: 1,
      rootObjectsName: ['GqlAddress'],
    });
  });

  it('should return a complex object containing functions', () => {
    const result = translateTypesToTs([graphqlQueryObjectMockedData]);

    expect(result).toStrictEqual({
      types: `/* eslint-disable */\n/* tslint:disable */\n\nexport interface Query { products: Array<GqlProduct>; productsByPage: (pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; productsWithIds: (ids: Array<number>) => Array<GqlProduct>; product: (id: number) => GqlProduct; categories: Array<GqlCategory>; category: (id: number) => GqlCategory; me: GqlLoggedUser; getOrder: (id: number) => GqlUserOrder; myOrders: Array<GqlOrder>; myAddresses: Array<GqlAddress>; }

export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput };
export type ProductsWithIdsQueryArgs = { ids: Array<number> };
export type ProductQueryArgs = { id: number };
export type CategoryQueryArgs = { id: number };
export type GetOrderQueryArgs = { id: number };\n`,
      count: 6,
      rootObjectsName: ['Query'],
    });
  });

  it('should return several types', () => {
    const result = translateTypesToTs([
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
      count: 8,
      rootObjectsName: ['GqlAddress', 'Query'],
    });
  });
});
