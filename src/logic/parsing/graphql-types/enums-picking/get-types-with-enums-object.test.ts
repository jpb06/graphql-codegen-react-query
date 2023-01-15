import { getTypesWithEnumsObject } from './get-types-with-enums-object';
import { typesObjectMockData } from '../../../../tests-related/mocked-data/types/types-object.mock-data';

describe('getTypesWithEnumsObject function', () => {
  it('should return enum fields', () => {
    const enums = ['enumOne', 'enumTwo', 'enumThree'];

    const result = getTypesWithEnumsObject(typesObjectMockData, enums);

    expect(result).toStrictEqual({
      bro: {
        enumOne: 'enumOne',
      },
      cool: {
        enumTwo: 'enumTwo',
      },
      yolo: {
        enumThree: 'enumThree',
      },
    });
  });

  it('should return by pass enum check if no enums were provided', () => {
    const enums: Array<string> = [];

    const result = getTypesWithEnumsObject(typesObjectMockData, enums);

    expect(result).toStrictEqual({});
  });
});
