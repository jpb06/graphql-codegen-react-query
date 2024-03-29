import { writeFile } from 'fs-extra';

import { generareInfiniteQueries } from './generate-infinite-queries';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import { querySelectorMockData } from '../../../tests-related/mocked-data/generated-code/query-selector.mock-data';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { SelectorsGenerationResult } from '../selectors/generate-selectors';

jest.mock('fs-extra');

describe('generareInfiniteQueries function', () => {
  const outputPath = './output-path';
  const fetcherConfig: FetcherConfig = {
    path: './fetcher-path',
    functionName: 'useFetcher',
  };
  const querySelectorResult: SelectorsGenerationResult = {
    querySelector: querySelectorMockData,
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
      querySelectorResult,
    );

    expect(writeFile).toHaveBeenCalledTimes(0);
  });

  it('should generate one infinite query', async () => {
    const result = await generareInfiniteQueries(
      graphqlQueryObjectMockedData.fields,
      ['productsByPage'],
      fetcherConfig,
      outputPath,
      querySelectorResult,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
    const [path, data] = jest.mocked(writeFile).mock.calls[0];
    expect(path).toBe(
      './output-path/queries/useProductsByPageInfiniteQuery.ts',
    );
    expect(data).toContain(`import { useFetcher } from './fetcher-path';`);
    expect(data).toContain(`type ProductsByPageSelectorResult = Pick<
  QuerySelectorResult,
  'productsByPage'
>['productsByPage'];`);
    expect(data)
      .toContain(`export type ProductsByPageInfiniteResult<Selector> = {
  productsByPage: DeepReplace<Selector, ProductsByPageSelectorResult>;
};`);
    expect(data)
      .toContain(`export const useProductsByPageInfinitePartialQuery = <
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

  it('should generate an infinite query using variables', async () => {
    const result = await generareInfiniteQueries(
      graphqlQueryObjectMockedData.fields,
      ['productsByPage'],
      fetcherConfig,
      outputPath,
      querySelectorResult,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
    const [path, data] = jest.mocked(writeFile).mock.calls[0];
    expect(path).toBe(
      './output-path/queries/useProductsByPageInfiniteQuery.ts',
    );
    expect(data).toContain(`import { useFetcher } from './fetcher-path';`);
    expect(data).toContain(`type ProductsByPageSelectorResult = Pick<
  QuerySelectorResult,
  'productsByPage'
>['productsByPage'];`);
    expect(data)
      .toContain(`export type ProductsByPageInfiniteResult<Selector> = {
  productsByPage: DeepReplace<Selector, ProductsByPageSelectorResult>;
};`);
    expect(data)
      .toContain(`export const useProductsByPageInfinitePartialQuery = <
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
      querySelectorResult,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(['useProductsByPageInfiniteQuery']);
  });

  it('should generate a full query using the partial one', async () => {
    const result = await generareInfiniteQueries(
      graphqlQueryObjectMockedData.fields,
      ['productsByPage'],
      fetcherConfig,
      outputPath,
      querySelectorResult,
    );

    const [, data] = jest.mocked(writeFile).mock.calls[0];
    expect(data).toContain(
      `type ProductsByPageSelector = {
   id: boolean; data: { id: boolean; idCategory: boolean; name: boolean; description: boolean; image: boolean; price: boolean; stock: boolean; category: { id: boolean; name: boolean;  }; };hasMoreData: boolean;  
};`,
    );

    expect(data).toContain(`export const useProductsByPageInfiniteQuery = (
  variables: ProductsByPageQueryArgs,
  options?: Omit<
    UseInfiniteQueryOptions<
      ProductsByPageInfiniteResult<ProductsByPageSelector>,
      unknown,
      ProductsByPageInfiniteResult<ProductsByPageSelector>
    >,
    'queryFn' | 'queryKey'
  >
): UseInfiniteQueryResult<ProductsByPageInfiniteResult<ProductsByPageSelector>> =>
  useProductsByPageInfinitePartialQuery(
    {
       id: true, data: { id: true, idCategory: true, name: true, description: true, image: true, price: true, stock: true, category: { id: true, name: true,  }, },hasMoreData: true,  
    }, variables
    ,options
  );`);

    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(['useProductsByPageInfiniteQuery']);
  });
});
