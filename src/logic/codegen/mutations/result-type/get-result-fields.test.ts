import { getResultFields } from './get-result-fields';
import { parsedTypesMockData } from '../../../../tests-related/mocked-data/generated-code/parsed-types.mock-data';

describe('getResultFields function', () => {
  it('should return object fields', () => {
    const result = getResultFields('me', 'GqlLoggedUser', parsedTypesMockData);

    expect(result).toBe(`id
email
personalEmail
phone
lastName
firstName
createdAt
status
address { id
recipientFirstName
recipientLastName
recipientPhone
address
zip
city
country
comment
createdAt
companyAddress { id
name
country
address
zip
city
recipientFirstName
recipientLastName
contactEmail
recipientPhone
isDefault } }
permissions { idUser
admin
ops }
companyGroup { id
name
description
isDefault
color }
companyName
companyId
companyEngagementDuration`);
  });
});
