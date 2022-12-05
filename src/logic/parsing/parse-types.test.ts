import {
  graphqlProductsByPageMockedData,
  graphqlGqlAddresstMockedData,
  graphqlMetadataTypeMockedData,
  graphqlEnumMockedData,
} from '../../tests-related/mocked-data/graphql-schema';
import { parseTypes } from './parse-types';

describe('parseTypes function', () => {
  it('should add eslint/tslint ignore at the beginning of the output', () => {
    const result = parseTypes([]);

    expect(result).toStrictEqual({
      output: `/* eslint-disable */\n/* tslint:disable */\n\n`,
      typesCount: 0,
    });
  });

  it('should return nothing if all types begin with "__"', () => {
    const result = parseTypes([graphqlMetadataTypeMockedData]);

    expect(result).toStrictEqual({
      output: `/* eslint-disable */\n/* tslint:disable */\n\n`,
      typesCount: 0,
    });
  });

  it('should return enum types', () => {
    const result = parseTypes([graphqlEnumMockedData]);

    expect(result).toStrictEqual({
      output: `/* eslint-disable */\n/* tslint:disable */\n\nexport type NumberCondition = 'gte' | 'lte';\n`,
      typesCount: 1,
    });
  });

  it('should return object types', () => {
    const result = parseTypes([graphqlGqlAddresstMockedData]);

    expect(result).toStrictEqual({
      output: `/* eslint-disable */\n/* tslint:disable */\n\nexport interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }\n`,
      typesCount: 1,
    });
  });

  it('should return a complex object containing functions', () => {
    const result = parseTypes([graphqlProductsByPageMockedData]);

    expect(result).toStrictEqual({
      output: `/* eslint-disable */\n/* tslint:disable */\n\nexport interface Query { products: Array<GqlProduct>; productsByPage: (pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; productsWithIds: (ids: Array<number>) => Array<GqlProduct>; product: (id: number) => GqlProduct; categories: Array<GqlCategory>; category: (id: number) => GqlCategory; me: GqlLoggedUser; getOrder: (id: number) => GqlUserOrder; myOrders: Array<GqlOrder>; myAddresses: Array<GqlAddress>; }\n`,
      typesCount: 1,
    });
  });

  it('should return several types', () => {
    const result = parseTypes([
      graphqlGqlAddresstMockedData,
      graphqlProductsByPageMockedData,
      graphqlEnumMockedData,
      graphqlMetadataTypeMockedData,
    ]);

    expect(result).toStrictEqual({
      output: `/* eslint-disable */\n/* tslint:disable */

export interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }
export interface Query { products: Array<GqlProduct>; productsByPage: (pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; productsWithIds: (ids: Array<number>) => Array<GqlProduct>; product: (id: number) => GqlProduct; categories: Array<GqlCategory>; category: (id: number) => GqlCategory; me: GqlLoggedUser; getOrder: (id: number) => GqlUserOrder; myOrders: Array<GqlOrder>; myAddresses: Array<GqlAddress>; }
export type NumberCondition = 'gte' | 'lte';
`,
      typesCount: 3,
    });
  });
});
