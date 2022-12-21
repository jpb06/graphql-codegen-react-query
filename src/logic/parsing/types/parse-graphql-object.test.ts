import {
  basicFieldMockData,
  enumFieldMockData,
  fieldWithDefaultValueMockData,
  functionFieldMockData,
  listFieldMockData,
  objectFieldMockData,
  objectListFieldMockData,
  scalarListFieldMockData,
} from '../../../tests-related/mocked-data/graphql-fields';
import { invalidListFieldMockData } from '../../../tests-related/mocked-data/graphql-fields/invalid-list-field.mock-data';
import { parseGraphqlObject } from './parse-graphql-object';

describe('parseGraphqlObject function', () => {
  global.console = { info: jest.fn() } as unknown as Console;

  it('should return nothing if passed null', () => {
    const result = parseGraphqlObject('', null);

    expect(result).toStrictEqual({ argsCount: 0, argsTypes: '', output: '' });
  });

  it('should handle function fields', () => {
    const result = parseGraphqlObject('Query', [functionFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 1,
      output:
        'export interface Query { productsByPage: (pagination: GqlPaginationArgs, nullable?: GqlNullable, array: Array<GqlProductWithCategory>, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; }\n',
      argsTypes:
        'export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, nullable?: GqlNullable, array: Array<GqlProductWithCategory>, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput };\n',
    });
  });

  it('should handle object lists fields', () => {
    const result = parseGraphqlObject('GqlProduct', [objectListFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output: 'export interface GqlProduct { products: Array<GqlProduct>; }\n',
    });
  });

  it('should handle scalar lists fields', () => {
    const result = parseGraphqlObject('Products', [scalarListFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output: 'export interface Products { ids: Array<number>; }\n',
    });
  });

  it('should display a warning if list is neither of objects nor of scalars', () => {
    const result = parseGraphqlObject('Yolo', [invalidListFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output: 'export interface Yolo { }\n',
    });
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should handle fields with default values', () => {
    const result = parseGraphqlObject('PageResult', [
      fieldWithDefaultValueMockData,
    ]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output: 'export interface PageResult { offset: 0; }\n',
    });
  });

  it('should handle enum fields', () => {
    const result = parseGraphqlObject('Object', [enumFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output: 'export interface Object { priceCondition?: NumberCondition; }\n',
    });
  });

  it('should handle list fields', () => {
    const result = parseGraphqlObject('Categories', [listFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output:
        'export interface Categories { categoriesIds?: Array<number>; }\n',
    });
  });

  it('should handle objects fields', () => {
    const result = parseGraphqlObject('MyType', [objectFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output: 'export interface MyType { role: string; }\n',
    });
  });

  it('should handle basic fields', () => {
    const result = parseGraphqlObject('MyObject', [basicFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      output: 'export interface MyObject { availableStock?: boolean; }\n',
    });
  });
});
