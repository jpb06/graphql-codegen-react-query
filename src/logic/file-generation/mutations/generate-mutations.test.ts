import { writeFile } from 'fs-extra';

import { graphqlMutationObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema/graphql-mutation-object.mock-data';
import { generatedTypesMockedData } from '../../../tests-related/mocked-data/types/generated-types-mock-data';
import { GqlField } from '../../../types/introspection-query-response.type';
import { generateMutations } from './generate-mutations';

jest.mock('fs-extra');

describe('generateMutations function', () => {
  const outputPath = './cool';
  const fetcher = './../../useFetchData#useFetchData';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing when there is no fields', async () => {
    await generateMutations(
      generatedTypesMockedData,
      null,
      fetcher,
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(0);
  });

  it('should create files in a mutations folder and import the fetcher', async () => {
    await generateMutations(
      generatedTypesMockedData,
      graphqlMutationObjectMockedData.fields,
      fetcher,
      outputPath,
    );

    const [fetcherPath, fetcherFn] = fetcher.split('#');

    expect(writeFile).toHaveBeenCalledTimes(10);
    for (let i = 0; i < 5; i++) {
      const [path, content] = jest.mocked(writeFile).mock.calls[i];

      expect(path).toMatch(/\.\/cool\/mutations\/use.*Mutation\.ts/);

      expect(content).toContain(
        `import { ${fetcherFn} } from '${fetcherPath}';`,
      );
    }
  });

  it('should handle mutations with arguments', async () => {
    const mutation = graphqlMutationObjectMockedData.fields?.at(2) as GqlField;

    await generateMutations(
      generatedTypesMockedData,
      [mutation],
      fetcher,
      outputPath,
    );

    const [, content] = jest.mocked(writeFile).mock.calls[0];

    expect(content).toContain(
      `import { SignupMutationArgs,  GqlAuthOutput } from '../types/api-types';`,
    );
    expect(content).toContain(
      `UseMutationOptions<GqlAuthOutput, unknown, SignupMutationArgs>`,
    );
    expect(content).toContain(`export const useSignupMutation`);

    expect(content)
      .toContain(`const query = \`mutation Signup($email: String!, $lastName: String!, $firstName: String!, $password: String!) {
    signup(email: $email, lastName: $lastName, firstName: $firstName, password: $password) {
      id
email
lastName
firstName
joinDate
role
token
    }
  }\`;`);
  });

  it('should handle mutations with no arguments', async () => {
    const mutation = graphqlMutationObjectMockedData.fields?.at(1) as GqlField;

    await generateMutations(
      generatedTypesMockedData,
      [mutation],
      fetcher,
      outputPath,
    );

    const [, content] = jest.mocked(writeFile).mock.calls[0];

    expect(content).toContain(
      `import { GqlAddress } from '../types/api-types';`,
    );
    expect(content).toContain(`UseMutationOptions<GqlAddress, unknown, never>`);
    expect(content).toContain(`export const useWithoutArgsMutation`);

    expect(content).toContain(`const query = \`mutation WithoutArgs() {
    withoutArgs() {
      id
street
zipCode
city
country
    }
  }\`;`);
  });
});
