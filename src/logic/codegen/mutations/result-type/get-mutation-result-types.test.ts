import { getMutationResultTypes } from './get-mutation-result-types';
import { parsedTypesMockData } from '../../../../tests-related/mocked-data/generated-code/parsed-types.mock-data';
import { graphqlMutationObjectMockedData } from '../../../../tests-related/mocked-data/graphql-schema/graphql-mutation-object.mock-data';
import { GqlFieldType } from '../../../../types/introspection-query-response.type';

describe('getMutationResultTypes function', () => {
  it('should handle object results', () => {
    const result = getMutationResultTypes(
      'signup',
      graphqlMutationObjectMockedData.fields?.at(2)?.type as GqlFieldType,
      parsedTypesMockData,
    );

    expect(result).toStrictEqual({
      documentResultFields:
        'email\n' +
        'personalEmail\n' +
        'phone\n' +
        'lastName\n' +
        'firstName\n' +
        'status\n' +
        'address { id\n' +
        'recipientFirstName\n' +
        'recipientLastName\n' +
        'recipientPhone\n' +
        'address\n' +
        'zip\n' +
        'city\n' +
        'country\n' +
        'comment\n' +
        'createdAt\n' +
        'companyAddress { id\n' +
        'name\n' +
        'country\n' +
        'address\n' +
        'zip\n' +
        'city\n' +
        'recipientFirstName\n' +
        'recipientLastName\n' +
        'contactEmail\n' +
        'recipientPhone\n' +
        'isDefault } }\n' +
        'permissions { idUser\n' +
        'admin\n' +
        'ops }\n' +
        'companyGroup { id\n' +
        'name\n' +
        'description\n' +
        'isDefault\n' +
        'color }',
      resultType: 'GqlAuthOutput',
      resultKind: 'object',
    });
  });

  it('should handle scalar results', () => {
    const result = getMutationResultTypes(
      'withScalarResult',
      graphqlMutationObjectMockedData.fields?.at(0)?.type as GqlFieldType,
      parsedTypesMockData,
    );

    expect(result).toStrictEqual({
      documentResultFields: `String`,
      resultKind: 'scalar',
      resultType: 'string',
    });
  });

  it('should handle list results', () => {
    const result = getMutationResultTypes(
      'withListResult',
      graphqlMutationObjectMockedData.fields?.at(6)?.type as GqlFieldType,
      parsedTypesMockData,
    );

    expect(result).toStrictEqual({
      documentResultFields: 'GqlCategory',
      resultKind: 'object',
      resultType: 'Array<GqlCategory>',
    });
  });

  it('should handle nullable list results', () => {
    const result = getMutationResultTypes(
      'withNullableListResult',
      graphqlMutationObjectMockedData.fields?.at(7)?.type as GqlFieldType,
      parsedTypesMockData,
    );

    expect(result).toStrictEqual({
      documentResultFields: 'GqlCategory',
      resultKind: 'object',
      resultType: 'Array<GqlCategory> | undefined',
    });
  });
});
