import {
  basicFieldMockData,
  emptyFieldsMockData,
  enumFieldMockData,
  fieldWithDefaultValueMockData,
  functionFieldMockData,
  listFieldMockData,
  objectFieldMockData,
  objectListFieldMockData,
  scalarListFieldMockData,
} from '../../tests-related/mocked-data/graphql-fields';
import { invalidListFieldMockData } from '../../tests-related/mocked-data/graphql-fields/invalid-list-field.mock-data';
import { getObjectFields } from './get-object-fields';

describe('getObjectFields function', () => {
  global.console = { info: jest.fn() } as unknown as Console;

  it('should return nothing if passed null', () => {
    const result = getObjectFields(null);

    expect(result).toBe('');
  });

  it('should return nothing if there is no field', () => {
    const result = getObjectFields(emptyFieldsMockData);

    expect(result).toBe('');
  });

  it('should handle function fields', () => {
    const result = getObjectFields([functionFieldMockData]);

    expect(result).toBe(
      'productsByPage: (pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) => GqlPaginatedProductsOutput; ',
    );
  });

  it('should handle object lists fields', () => {
    const result = getObjectFields([objectListFieldMockData]);

    expect(result).toBe('products: Array<GqlProduct>; ');
  });

  it('should handle scalar lists fields', () => {
    const result = getObjectFields([scalarListFieldMockData]);

    expect(result).toBe('ids: Array<number>; ');
  });

  it('should display a warning if list is neither of objects nor of scalars', () => {
    const result = getObjectFields([invalidListFieldMockData]);

    expect(result).toBe('');
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it('should handle fields with default values', () => {
    const result = getObjectFields([fieldWithDefaultValueMockData]);

    expect(result).toBe('offset: 0; ');
  });

  it('should handle enum fields', () => {
    const result = getObjectFields([enumFieldMockData]);

    expect(result).toBe('priceCondition: NumberCondition; ');
  });

  it('should handle list fields', () => {
    const result = getObjectFields([listFieldMockData]);

    expect(result).toBe('categoriesIds: Array<number>; ');
  });

  it('should handle objects fields', () => {
    const result = getObjectFields([objectFieldMockData]);

    expect(result).toBe('role: string; ');
  });

  it('should handle basic fields', () => {
    const result = getObjectFields([basicFieldMockData]);

    expect(result).toBe('availableStock: boolean; ');
  });
});
