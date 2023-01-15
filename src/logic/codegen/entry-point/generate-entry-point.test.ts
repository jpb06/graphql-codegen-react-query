import { writeFile } from 'fs-extra';

import { generateEntryPoint } from './generate-entry-point';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { graphqlMutationObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema/graphql-mutation-object.mock-data';

jest.mock('fs-extra');

describe('generateEntryPoint function', () => {
  const outputPath = './cool';

  it('should create a barrel file', () => {
    generateEntryPoint(
      outputPath,
      graphqlQueryObjectMockedData,
      graphqlMutationObjectMockedData,
      [],
    );

    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledWith(
      `${outputPath}/index.ts`,
      `export * from './types/api-types';

export * from './queries/useProductsQuery';
export * from './queries/useProductsByPageQuery';
export * from './queries/useProductsWithIdsQuery';
export * from './queries/useProductQuery';
export * from './queries/useCategoriesQuery';
export * from './queries/useCategoryQuery';
export * from './queries/useMeQuery';
export * from './queries/useGetOrderQuery';
export * from './queries/useMyOrdersQuery';
export * from './queries/useMyAddressesQuery';
export * from './queries/useGqlQuery';

export * from './mutations/useWithScalarResultMutation';
export * from './mutations/useWithoutArgsMutation';
export * from './mutations/useSignupMutation';
export * from './mutations/useLoginMutation';
export * from './mutations/usePlaceOrderMutation';
export * from './mutations/useCreateAddressMutation';
export * from './mutations/useWithListResultMutation';
export * from './mutations/useWithNullableListResultMutation';
export * from './mutations/useWithNullableScalarResultMutation';
export * from './mutations/useWithNullableObjectResultMutation';

`,
    );
  });
});
