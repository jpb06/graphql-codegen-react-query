import { getResultFields } from './get-result-fields';
import { displayWarning } from '../../../../cli/console/console.messages';
import { generatedTypesMockedData } from '../../../../tests-related/mocked-data/types/generated-types-mock-data';

jest.mock('../../../../cli/console/console.messages');

describe('getResultFields function', () => {
  it('should return object fields', () => {
    const result = getResultFields('GqlAuthOutput', generatedTypesMockedData);

    expect(result).toBe(`id
email
lastName
firstName
joinDate
role
token`);
  });

  it('should warn when type is not found', () => {
    const result = getResultFields('Yolo', generatedTypesMockedData);

    expect(result).toBe(``);

    expect(displayWarning).toHaveBeenCalled();
  });
});
