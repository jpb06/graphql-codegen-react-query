import { getTypesWithEnumsObject } from './get-types-with-enums-object';
import { parsedTypesMockData } from '../../../../tests-related/mocked-data/generated-code/parsed-types.mock-data';
import { typesObjectMockData } from '../../../../tests-related/mocked-data/types/types-object.mock-data';

describe('getTypesWithEnumsObject function', () => {
  it('should return enum fields', () => {
    const result = getTypesWithEnumsObject(
      typesObjectMockData,
      parsedTypesMockData,
    );
    expect(result).toStrictEqual({
      GqlAsset: { type: 'GqlAssetType', status: 'GqlAssetStatus' },
      GqlBaseUser: { status: 'GqlUserState' },
      GqlAuthOutput: { status: 'GqlUserState' },
      GqlLoggedUser: { status: 'GqlUserState' },
      GqlOrderStatusGroup: { status: 'GqlOrderedProductStatus' },
      GqlOpsOrder: { status: 'GqlOrderedProductStatus' },
      GqlOrderProductsStatusFrequency: { status: 'GqlOrderedProductStatus' },
      GqlUserOrder: { status: 'GqlOrderStatus' },
    });
  });
});
