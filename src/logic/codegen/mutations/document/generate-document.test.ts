import { generateDocument } from './generate-document';
import { functionFieldMockData } from '../../../../tests-related/mocked-data/graphql-fields';

describe('generateDocument function', () => {
  it('should generate a document for a mutation with no arguments', () => {
    const result = generateDocument(
      'products',
      [],
      `id
      name`,
    );

    expect(result).toBe(`mutation Products() {
    products() {
      id
      name
    }
  }`);
  });

  it('should generate a document for a mutation with arguments', () => {
    const result = generateDocument(
      'productsByPage',
      functionFieldMockData.args,
      `id
      name`,
    );

    expect(result)
      .toBe(`mutation ProductsByPage($pagination: GqlPaginationArgs!, $nullable: GqlNullable, $array: [GqlProductWithCategory!]!, $filters: GqlPaginatedProductsFiltersInput!, $sort: GqlPaginatedProductsSortingInput!) {
    productsByPage(pagination: $pagination, nullable: $nullable, array: $array, filters: $filters, sort: $sort) {
      id
      name
    }
  }`);
  });
});
