import { parseGraphqlObject } from './parse-graphql-object';
import {
  functionFieldMockData,
  objectListFieldMockData,
  scalarListFieldMockData,
  fieldWithDefaultValueMockData,
  enumFieldMockData,
  listFieldMockData,
  objectFieldMockData,
  basicFieldMockData,
} from '../../../../tests-related/mocked-data/graphql-fields';
import { invalidListFieldMockData } from '../../../../tests-related/mocked-data/graphql-fields/invalid-list-field.mock-data';

describe('parseGraphqlObject function', () => {
  global.console = { info: jest.fn() } as unknown as Console;

  it('should return nothing if passed null', () => {
    const result = parseGraphqlObject('', null);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      argsTypesObject: {},
      output: '',
      typesObject: {},
    });
  });

  it('should handle function fields', () => {
    const result = parseGraphqlObject('Query', [functionFieldMockData]);

    expect(result).toStrictEqual({
      output:
        'export interface Query { productsByPage: (pagination: GqlPaginationArgs, nullable?: GqlNullable, array: Array<GqlProductWithCategory>, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; }\n',
      argsTypes:
        'export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, nullable?: GqlNullable, array: Array<GqlProductWithCategory>, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput };\n',
      argsCount: 1,
      typesObject: {},
      argsTypesObject: {
        ProductsByPageQueryArgs: {
          pagination: 'GqlPaginationArgs',
          nullable: 'GqlNullable',
          array: 'Array<GqlProductWithCategory>',
          filters: 'GqlPaginatedProductsFiltersInput',
          sort: 'GqlPaginatedProductsSortingInput',
        },
      },
    });
  });

  it('should handle object lists fields', () => {
    const result = parseGraphqlObject('GqlProduct', [objectListFieldMockData]);

    expect(result).toStrictEqual({
      output: 'export interface GqlProduct { products: Array<GqlProduct>; }\n',
      argsTypes: '',
      argsCount: 0,
      typesObject: { products: 'Array<GqlProduct>' },
      argsTypesObject: {},
    });
  });

  it('should handle scalar lists fields', () => {
    const result = parseGraphqlObject('Products', [scalarListFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      argsTypesObject: {},
      output: 'export interface Products { ids: Array<number>; }\n',
      typesObject: {
        ids: 'Array<number>',
      },
    });
  });

  it('should display a warning if list is neither of objects nor of scalars', () => {
    const result = parseGraphqlObject('Yolo', [invalidListFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      argsTypesObject: {},
      output: 'export interface Yolo { }\n',
      typesObject: {
        products: '',
      },
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
      argsTypesObject: {},
      output: 'export interface PageResult { offset: 0; }\n',
      typesObject: {
        offset: '',
      },
    });
  });

  it('should handle enum fields', () => {
    const result = parseGraphqlObject('Object', [enumFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      argsTypesObject: {},
      output: 'export interface Object { priceCondition?: NumberCondition; }\n',
      typesObject: {
        priceCondition: 'NumberCondition',
      },
    });
  });

  it('should handle list fields', () => {
    const result = parseGraphqlObject('Categories', [listFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      argsTypesObject: {},
      output:
        'export interface Categories { categoriesIds?: Array<number>; }\n',
      typesObject: {
        categoriesIds: 'Array<number>',
      },
    });
  });

  it('should handle objects fields', () => {
    const result = parseGraphqlObject('MyType', [objectFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      argsTypesObject: {},
      output: 'export interface MyType { role: string; }\n',
      typesObject: {
        role: 'string',
      },
    });
  });

  it('should handle basic fields', () => {
    const result = parseGraphqlObject('MyObject', [basicFieldMockData]);

    expect(result).toStrictEqual({
      argsCount: 0,
      argsTypes: '',
      argsTypesObject: {},
      output: 'export interface MyObject { availableStock?: boolean; }\n',
      typesObject: {
        availableStock: 'boolean',
      },
    });
  });
});
