import { generateQueryReplacer } from './generate-query-replacer';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { GqlType } from '../../../types/introspection-query-response.type';

describe('generateQueryReplacer function', () => {
  it('should import nothing from api types if there is no queries with args', () => {
    const result = generateQueryReplacer({
      fields: [graphqlQueryObjectMockedData?.fields?.[0]],
    } as GqlType);

    expect(result).not.toContain(`from './../types/api-types';`);
  });

  it('should import query args types', () => {
    const result = generateQueryReplacer(graphqlQueryObjectMockedData);

    expect(result).toContain(
      `import { ProductsByPageQueryArgs, ProductsWithIdsQueryArgs, ProductQueryArgs, CategoryQueryArgs, GetOrderQueryArgs } from './../types/api-types';`,
    );
  });

  it('should create functions returning undefined for queries with no args', () => {
    const result = generateQueryReplacer(graphqlQueryObjectMockedData);

    expect(result).toContain(`products: () => undefined`);
    expect(result).toContain(`categories: () => undefined`);
    expect(result).toContain(`me: () => undefined`);
    expect(result).toContain(`myOrders: () => undefined`);
    expect(result).toContain(`myAddresses: () => undefined`);
  });

  it('should create functions returning an array of regex/string for queries with args', () => {
    const result = generateQueryReplacer(graphqlQueryObjectMockedData);

    expect(result).toContain(
      `productsByPage: ({pagination, filters, sort}: ProductsByPageQueryArgs) => [new RegExp('^ {2}productsByPage {$', 'gm'), \`  productsByPage(pagination: \${stringify(pagination, "GqlPaginationArgs")}, filters: \${stringify(filters, "GqlPaginatedProductsFiltersInput")}, sort: \${stringify(sort, "GqlPaginatedProductsSortingInput")}) {\`],`,
    );
    expect(result).toContain(
      "productsWithIds: ({ids}: ProductsWithIdsQueryArgs) => [new RegExp('^ {2}productsWithIds {$', 'gm'), `  productsWithIds(ids: ${stringify(ids, \"number\")}) {`],",
    );
    expect(result).toContain(
      `product: ({id}: ProductQueryArgs) => [new RegExp('^ {2}product {$', 'gm'), \`  product(id: \${stringify(id, "number")}) {\`]`,
    );
    expect(result).toContain(
      `category: ({id}: CategoryQueryArgs) => [new RegExp('^ {2}category {$', 'gm'), \`  category(id: \${stringify(id, "number")}) {\`]`,
    );
    expect(result).toContain(
      `getOrder: ({id}: GetOrderQueryArgs) => [new RegExp('^ {2}getOrder {$', 'gm'), \`  getOrder(id: \${stringify(id, "number")}) {\`],`,
    );
  });
});
