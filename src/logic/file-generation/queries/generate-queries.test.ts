import { readFile, writeFile } from 'fs-extra';

import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { GqlField } from '../../../types/introspection-query-response.type';
import { generateQueries } from './generate-queries';

jest.mock('fs-extra');

describe('generateQueries function', () => {
  const outputPath = './cool';
  const fetcher = './../../useFetchData#useFetchData';

  beforeAll(() => {
    jest.mocked(readFile).mockResolvedValue(
      `import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';

    //fetcher-hook-import
    import { selectorToDocument } from '../logic/selector-to-document';
    import { DeepReplace } from '../types/deep-replace.type';
    import { QuerySelector } from '../types/query-selector';
    import { QuerySelectorResult } from '../types/query-selector-result';
    
    type GqlQueryResultType<Selector> = DeepReplace<Selector, QuerySelectorResult>;
    
    export const useGqlQuery = <Selector extends QuerySelector>(
      key: QueryKey,
      selector: Selector,
      variables?: unknown,
    ): UseQueryResult<GqlQueryResultType<Selector>> => {
      const document = selectorToDocument(selector, variables);
    
      return useQuery<
        GqlQueryResultType<Selector>,
        unknown,
        GqlQueryResultType<Selector>
      >({
        queryKey: key,
        queryFn: #fetcher#<GqlQueryResultType<Selector>>(document).bind(
          null,
          variables,
        ),
      });
    };
    ` as never,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should only write the useGqlQuery hook if there is no queries', async () => {
    await generateQueries(null, fetcher, outputPath);

    expect(writeFile).toHaveBeenCalledTimes(1);
  });

  it('should create files in a queries folder and import the fetcher', async () => {
    await generateQueries(
      graphqlQueryObjectMockedData.fields,
      fetcher,
      outputPath,
    );

    const [fetcherPath, fetcherFn] = fetcher.split('#');

    const gqlQueryWriteFile = jest.mocked(writeFile).mock.calls[0];
    expect(gqlQueryWriteFile[0]).toBe('./cool/queries/useGqlQuery.ts');
    expect(gqlQueryWriteFile[1]).toContain(
      `import { ${fetcherFn} } from '${fetcherPath}';`,
    );

    expect(writeFile).toHaveBeenCalledTimes(11);
    for (let i = 1; i < 11; i++) {
      const [path, content] = jest.mocked(writeFile).mock.calls[i];

      expect(path).toMatch(/\.\/cool\/queries\/use.*Query\.ts/);

      expect(content).toContain(
        `import { ${fetcherFn} } from '${fetcherPath}';`,
      );
    }
  });

  it('should handle queries with arguments', async () => {
    const query = graphqlQueryObjectMockedData.fields?.at(1) as GqlField;

    await generateQueries([query], fetcher, outputPath);

    const [, content] = jest.mocked(writeFile).mock.calls[1];

    expect(content).toContain(
      `import { ProductsByPageQueryArgs } from '../types/api-types';`,
    );
    expect(content).toContain(
      `selector: Selector, variables: ProductsByPageQueryArgs,`,
    );
    expect(content).toContain(
      `const document = querySelectorToDocument('productsByPage', selector, variables);`,
    );
    expect(content).toContain(
      `queryFn: useFetchData<ProductsByPageResult<Selector>>(document).bind(null, variables),`,
    );
  });

  it('should handle queires with no arguments', async () => {
    const query = graphqlQueryObjectMockedData.fields?.at(0) as GqlField;

    await generateQueries([query], fetcher, outputPath);

    const [, content] = jest.mocked(writeFile).mock.calls[1];

    expect(content).toContain(`selector: Selector, \n`);
    expect(content).toContain(
      `const document = querySelectorToDocument('products', selector);`,
    );
    expect(content).toContain(
      `queryFn: useFetchData<ProductsResult<Selector>>(document),`,
    );
  });
});
