import { getMutationResultTypes } from './get-mutation-result-types';
import { graphqlMutationObjectMockedData } from '../../../../tests-related/mocked-data/graphql-schema/graphql-mutation-object.mock-data';
import { generatedTypesMockedData } from '../../../../tests-related/mocked-data/types/generated-types-mock-data';
import { GqlFieldType } from '../../../../types/introspection-query-response.type';

describe('getMutationResultTypes function', () => {
  it('should handle object results', () => {
    const result = getMutationResultTypes(
      graphqlMutationObjectMockedData.fields?.at(2)?.type as GqlFieldType,
      generatedTypesMockedData,
    );

    expect(result).toStrictEqual({
      documentResultFields: `id
email
lastName
firstName
joinDate
role
token`,
      resultType: 'GqlAuthOutput',
    });
  });

  it('should handle scalar results', () => {
    const result = getMutationResultTypes(
      graphqlMutationObjectMockedData.fields?.at(0)?.type as GqlFieldType,
      generatedTypesMockedData,
    );

    expect(result).toStrictEqual({
      documentResultFields: `String`,
      resultType: 'string',
    });
  });

  it('should handle list results', () => {
    const result = getMutationResultTypes(
      graphqlMutationObjectMockedData.fields?.at(6)?.type as GqlFieldType,
      generatedTypesMockedData,
    );

    expect(result).toStrictEqual({
      documentResultFields: `id
name`,
      resultType: 'Array<GqlCategory>',
    });
  });

  it('should handle nullable list results', () => {
    const result = getMutationResultTypes(
      graphqlMutationObjectMockedData.fields?.at(7)?.type as GqlFieldType,
      generatedTypesMockedData,
    );

    expect(result).toStrictEqual({
      documentResultFields: `id
name`,
      resultType: 'Array<GqlCategory> | undefined',
    });
  });
});
