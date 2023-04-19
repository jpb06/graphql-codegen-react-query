import { writeFile } from 'fs-extra';

import { generateQueries } from './generate-queries';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import { parsedArgsMockData } from '../../../tests-related/mocked-data/generated-code/parsed-args.mock-data';
import { querySelectorResultMockData } from '../../../tests-related/mocked-data/generated-code/query-selector-result.mock-data';
import { querySelectorMockData } from '../../../tests-related/mocked-data/generated-code/query-selector.mock-data';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { GqlField } from '../../../types/introspection-query-response.type';

jest.mock('fs-extra');

describe('generateQueries function', () => {
  const outputPath = './cool';
  const fetcher: FetcherConfig = {
    path: './../../useFetchData',
    functionName: 'useFetchData',
  };
  const selectors = {
    querySelector: querySelectorMockData,
    querySelectorResult: querySelectorResultMockData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should only write the useGqlQuery hook if there is no queries', async () => {
    await generateQueries(
      [],
      fetcher,
      outputPath,
      selectors,
      parsedArgsMockData,
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
  });

  it('should create files in a queries folder and import the fetcher', async () => {
    await generateQueries(
      graphqlQueryObjectMockedData.fields,
      fetcher,
      outputPath,
      selectors,
      parsedArgsMockData,
    );

    const gqlQueryWriteFile = jest.mocked(writeFile).mock.calls[0];
    expect(gqlQueryWriteFile[0]).toBe('./cool/queries/useGqlQuery.ts');
    expect(gqlQueryWriteFile[1]).toContain(
      `import { ${fetcher.functionName} } from '${fetcher.path}';`,
    );

    expect(writeFile).toHaveBeenCalledTimes(16);
    for (let i = 1; i < 16; i++) {
      const [path, content] = jest.mocked(writeFile).mock.calls[i];

      expect(path).toMatch(/\.\/cool\/queries\/use.*Query\.ts/);

      expect(content).toContain(
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      );
    }
  });

  it('should handle queries with arguments', async () => {
    const query = graphqlQueryObjectMockedData.fields?.find(
      (el) => el.name === 'productsByPage',
    ) as GqlField;

    await generateQueries(
      [query],
      fetcher,
      outputPath,
      selectors,
      parsedArgsMockData,
    );

    const [, content] = jest.mocked(writeFile).mock.calls[1];

    expect(content).toContain(
      `import { ProductsByPageQueryArgs as Args } from '../types/queries/productsByPage/ProductsByPageQueryArgs.type';`,
    );
    expect(content).toContain(
      `selector: Selector, variables: ProductsByPageQueryArgs,`,
    );
    expect(content).toContain(
      `const document = namedQuerySelectorToDocument('productsByPage', selector,'$pagination: GqlPaginationArgs!,$filters: GqlPaginatedProductsFiltersInput!','pagination: $pagination,filters: $filters');`,
    );
    expect(content).toContain(
      `queryFn: useFetchData<ProductsByPageQueryResultSelect<Selector>>(document).bind(null, variables, undefined),`,
    );
  });

  it('should handle queires with no arguments', async () => {
    const query = graphqlQueryObjectMockedData.fields?.at(1) as GqlField;

    await generateQueries(
      [query],
      fetcher,
      outputPath,
      selectors,
      parsedArgsMockData,
    );

    const [, content] = jest.mocked(writeFile).mock.calls[1];

    expect(content).toContain(`selector: Selector, \n`);
    expect(content).toContain(
      `const document = namedQuerySelectorToDocument('me', selector);`,
    );
    expect(content).toContain(
      `queryFn: useFetchData<MeQueryResultSelect<Selector>>(document),`,
    );
  });
});
