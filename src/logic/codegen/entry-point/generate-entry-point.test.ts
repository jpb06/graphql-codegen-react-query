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

export * from './queries/useCatalogQuery';
export * from './queries/useMeQuery';
export * from './queries/useUserInformationsQuery';
export * from './queries/useUsersQuery';
export * from './queries/useGetRegistrationStatusQuery';
export * from './queries/useCompanyInformationsQuery';
export * from './queries/useProductQuery';
export * from './queries/useProductsByPageQuery';
export * from './queries/useCountProductPagesQuery';
export * from './queries/useProductVariantSummariesQuery';
export * from './queries/useCompanyAddressesQuery';
export * from './queries/useOrdersDetailsQuery';
export * from './queries/useOrdersQuery';
export * from './queries/useOpsOrdersQuery';
export * from './queries/useAssetsQuery';
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
