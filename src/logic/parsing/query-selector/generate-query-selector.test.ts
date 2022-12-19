import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import {
  circularTypesMockedData,
  graphqlQueryObjectWithCircularDependencyMockedData,
} from '../../../tests-related/mocked-data/graphql-schema/graphql-query-object-with-circular-dep.mock-data';
import { generatedTypesMockedData } from '../../../tests-related/mocked-data/types/generated-types-mock-data';
import { rootObjectsNameMockData } from '../../../tests-related/mocked-data/types/root-objects-name.mock-data';
import { displayWarning } from '../../cli/console/console.messages';
import { generateQuerySelector } from './generate-query-selector';

jest.mock('../../cli/console/console.messages');

describe('generateQuerySelector function', () => {
  it('should generate selectors for objects containing scalars', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectMockedData,
      generatedTypesMockedData,
      rootObjectsNameMockData,
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
      true,
    );

    expect(result).toContain(
      `getOrder?: { createdAt?: boolean; creditCard?: { number?: boolean; expires?: boolean;  };items?: { id?: boolean; quantity?: boolean; name?: boolean; price?: boolean;  }; }`,
    );
  });

  it('should stop to 9 levels deeps when there is a circular dependencies in result sets', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectWithCircularDependencyMockedData,
      circularTypesMockedData,
      ['GqlCategory', 'GqlProduct'],
      false,
    );

    expect(displayWarning).toHaveBeenCalledTimes(1);
    expect(displayWarning).toHaveBeenCalledWith(
      'Deeply nested type detected. Depth is limited to 9; falling back to type unknown',
    );

    expect(result).toContain(
      `export type QuerySelectorResult = {
categories: { idCategory: string; product: { idProduct: string; category: { idCategory: string; product: { idProduct: string; category: { idCategory: string; product: { idProduct: string; category: { idCategory: string; product: { idProduct: string; category: { idCategory: string; product: { category: unknown }; }; }; }; }; }; }; }; }; }
}`,
    );
  });
});
