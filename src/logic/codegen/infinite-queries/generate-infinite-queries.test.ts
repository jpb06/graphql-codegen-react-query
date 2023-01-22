import { writeFile } from 'fs-extra';

import { generareInfiniteQueries } from './generate-infinite-queries';
import { FetcherConfig } from '../../../cli/args/options-validation';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';

jest.mock('fs-extra');

describe('generareInfiniteQueries function', () => {
  const outputPath = './output-path';
  const fetcherConfig: FetcherConfig = {
    path: './fetcher-path',
    functionName: 'useFetcher',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing if no infinite queries were provided', async () => {
    await generareInfiniteQueries(
      graphqlQueryObjectMockedData.fields,
      [],
      fetcherConfig,
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(0);
  });

  it('should generate one infinite query', async () => {
    const result = await generareInfiniteQueries(
      graphqlQueryObjectMockedData.fields,
      ['products'],
      fetcherConfig,
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
    const [path, data] = jest.mocked(writeFile).mock.calls[0];
    expect(path).toBe('./output-path/queries/useProductsInfiniteQuery.ts');
    expect(data).toContain(`import { useFetcher } from './fetcher-path';`);
    expect(data).toContain(`type ProductsSelectorResult = Pick<
  QuerySelectorResult,
  'products'
>['products'];`);
    expect(data).toContain(`export type ProductsInfiniteResult<Selector> = {
  products: DeepReplace<Selector, ProductsSelectorResult>;
};`);
    expect(data).toContain(`export const useProductsInfiniteQuery = <
  Selector extends Pick<QuerySelector, 'products'>['products'],
>(
  selector: Selector,
  variables: ProductsQueryArgs,
  options?: Omit<
    UseInfiniteQueryOptions<
      ProductsInfiniteResult<Selector>,
      unknown,
      ProductsInfiniteResult<Selector>
    >,
    'queryFn' | 'queryKey'
  >,
): UseInfiniteQueryResult<ProductsInfiniteResult<Selector>> => {`);
    expect(data)
      .toContain(`const initialDocument = namedQuerySelectorToDocument(
    'products',
    selector,
    variables,
  );`);
    expect(data).toContain(
      `const queryKey = ['productsInfiniteQuery', ...Object.values(variables)];`,
    );
    expect(data).toContain(`const fetchFn =
    useFetchData<ProductsInfiniteResult<Selector>>(initialDocument);`);
    expect(data).toContain(`return useInfiniteQuery<
    ProductsInfiniteResult<Selector>,
    unknown,
    ProductsInfiniteResult<Selector>
  >(
    queryKey,
    (metaData) => {
      const updatedVariables = deepMerge(variables, metaData.pageParam ?? {});
      const document = namedQuerySelectorToDocument(
        'productsByPage',
        selector,
        updatedVariables
      );

      return fetchFn(updatedVariables, document);
    },
    options,
  );`);

    expect(result).toStrictEqual(['useProductsInfiniteQuery']);
  });

  it('should generate an infinite query using variables', async () => {
    const result = await generareInfiniteQueries(
      graphqlQueryObjectMockedData.fields,
      ['productsByPage'],
      fetcherConfig,
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
    const [path, data] = jest.mocked(writeFile).mock.calls[0];
    expect(path).toBe(
      './output-path/queries/useProductsByPageInfiniteQuery.ts',
    );
    expect(data).toContain(`import { useFetcher } from './fetcher-path';`);
    expect(data).toContain(
      `import { ProductsByPageQueryArgs } from '../types/api-types';`,
    );
    expect(data).toContain(`type ProductsByPageSelectorResult = Pick<
  QuerySelectorResult,
  'productsByPage'
>['productsByPage'];`);
    expect(data)
      .toContain(`export type ProductsByPageInfiniteResult<Selector> = {
  productsByPage: DeepReplace<Selector, ProductsByPageSelectorResult>;
};`);
    expect(data).toContain(`export const useProductsByPageInfiniteQuery = <
  Selector extends Pick<QuerySelector, 'productsByPage'>['productsByPage'],
>(
  selector: Selector,
  variables: ProductsByPageQueryArgs,
  options?: Omit<
    UseInfiniteQueryOptions<
      ProductsByPageInfiniteResult<Selector>,
      unknown,
      ProductsByPageInfiniteResult<Selector>
    >,
    'queryFn' | 'queryKey'
  >,
): UseInfiniteQueryResult<ProductsByPageInfiniteResult<Selector>> => {`);
    expect(data)
      .toContain(`const initialDocument = namedQuerySelectorToDocument(
    'productsByPage',
    selector,
    variables,
  );`);
    expect(data).toContain(
      `const queryKey = ['productsByPageInfiniteQuery', ...Object.values(variables)];`,
    );
    expect(data).toContain(`const fetchFn =
    useFetchData<ProductsByPageInfiniteResult<Selector>>(initialDocument);`);
    expect(data).toContain(`return useInfiniteQuery<
    ProductsByPageInfiniteResult<Selector>,
    unknown,
    ProductsByPageInfiniteResult<Selector>
  >(
    queryKey,
    (metaData) => {
      const updatedVariables = deepMerge(variables, metaData.pageParam ?? {});
      const document = namedQuerySelectorToDocument(
        'productsByPage',
        selector,
        updatedVariables
      );

      return fetchFn(updatedVariables, document);
    },
    options,
  );`);

    expect(result).toStrictEqual(['useProductsByPageInfiniteQuery']);
  });

  it('should generate two infinite queries', async () => {
    const result = await generareInfiniteQueries(
      graphqlQueryObjectMockedData.fields,
      ['products', 'productsByPage'],
      fetcherConfig,
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(2);
    expect(result).toStrictEqual([
      'useProductsInfiniteQuery',
      'useProductsByPageInfiniteQuery',
    ]);
  });
});
