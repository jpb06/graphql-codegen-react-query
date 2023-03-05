import { generateQuerySelector } from './generate-query-selector';
import { displayWarning } from '../../../cli/console/console.messages';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import {
  circularTypesMockedData,
  graphqlQueryObjectWithCircularDependencyMockedData,
} from '../../../tests-related/mocked-data/graphql-schema/graphql-query-object-with-circular-dep.mock-data';
import { enumsMockData } from '../../../tests-related/mocked-data/types/enums.mock-data';
import { generatedTypesMockedData } from '../../../tests-related/mocked-data/types/generated-types-mock-data';
import { rootObjectsNameMockData } from '../../../tests-related/mocked-data/types/root-objects-name.mock-data';

jest.mock('../../../cli/console/console.messages');

describe('generateQuerySelector function', () => {
  it('should generate selectors for objects containing scalars', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectMockedData,
      generatedTypesMockedData,
      rootObjectsNameMockData,
      enumsMockData,
      true,
    );

    expect(result).toContain(
      `products?: { id?: boolean; idCategory?: boolean; name?: boolean; description?: boolean; image?: boolean; price?: boolean; stock?: boolean;  }`,
    );
  });

  it('should generate selector results for objects containing scalars', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectMockedData,
      generatedTypesMockedData,
      rootObjectsNameMockData,
      enumsMockData,
      false,
    );

    expect(result).toContain(
      `products: { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number;  }`,
    );
  });

  it('should generate selectors for objects containing objects', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectMockedData,
      generatedTypesMockedData,
      rootObjectsNameMockData,
      enumsMockData,
      true,
    );

    expect(result).toContain(
      `getOrder?: { createdAt?: boolean; creditCard?: { number?: boolean; expires?: boolean;  };items?: { id?: boolean; quantity?: boolean; name?: boolean; price?: boolean;  }; }`,
    );
  });

  it('should ignore properties already parsed (circular referency)', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectWithCircularDependencyMockedData,
      circularTypesMockedData,
      ['GqlCategory', 'GqlProduct'],
      enumsMockData,
      true,
    );

    expect(displayWarning).toHaveBeenCalledTimes(1);

    expect(result).toContain(
      `export type QuerySelector = {
categories?: { idCategory?: boolean; product?: { idProduct?: boolean; category?: { idCategory?: boolean;  }; }; }
}`,
    );
  });
});
