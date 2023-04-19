import { writeFile } from 'fs-extra';

import { generateMutations } from './generate-mutations';
import { FetcherConfig } from '../../../cli/generate-from-url/args-validation/options-validation';
import { parsedTypesMockData } from '../../../tests-related/mocked-data/generated-code/parsed-types.mock-data';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { graphqlMutationObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema/graphql-mutation-object.mock-data';
import { GqlField } from '../../../types/introspection-query-response.type';

jest.mock('fs-extra');

describe('generateMutations function', () => {
  const outputPath = './cool';
  const fetcher: FetcherConfig = {
    path: './../../useFetchData',
    functionName: 'useFetchData',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing when there is no fields', async () => {
    await generateMutations([], parsedTypesMockData, fetcher, outputPath);

    expect(writeFile).toHaveBeenCalledTimes(0);
  });

  it('should create files in a mutations folder and import the fetcher', async () => {
    await generateMutations(
      graphqlQueryObjectMockedData.fields,
      parsedTypesMockData,
      fetcher,
      outputPath,
    );

    expect(writeFile).toHaveBeenCalledTimes(15);
    for (let i = 0; i < 5; i++) {
      const [path, content] = jest.mocked(writeFile).mock.calls[i];

      expect(path).toMatch(/\.\/cool\/mutations\/use.*Mutation\.ts/);

      expect(content).toContain(
        `import { ${fetcher.functionName} } from '${fetcher.path}';`,
      );
    }
  });

  it('should handle mutations with arguments', async () => {
    const mutation = graphqlMutationObjectMockedData.fields?.at(2) as GqlField;

    await generateMutations(
      [mutation],
      parsedTypesMockData,
      fetcher,
      outputPath,
    );

    const [, content] = jest.mocked(writeFile).mock.calls[0];

    expect(content).toContain(
      `import { SignupMutationArgs as Args } from './../types/mutations/signup/SignupMutationArgs.type';`,
    );
    expect(content).toContain(`export type SignupMutationResult = {
  signup: GqlAuthOutput;
};`);
    expect(content).toContain(
      `UseMutationOptions<SignupMutationResult, unknown, SignupMutationArgs>`,
    );
    expect(content).toContain(`export const useSignupMutation`);

    expect(content)
      .toContain(`const mutation = \`mutation Signup($email: String!, $lastName: String!, $firstName: String!, $password: String!) {
    signup(email: $email, lastName: $lastName, firstName: $firstName, password: $password) { email
personalEmail
phone
lastName
firstName
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
color } }
  }\`;`);
  });

  it('should handle mutations with no arguments', async () => {
    const mutation = graphqlMutationObjectMockedData.fields?.at(1) as GqlField;

    await generateMutations(
      [mutation],
      parsedTypesMockData,
      fetcher,
      outputPath,
    );

    const [, content] = jest.mocked(writeFile).mock.calls[0];

    expect(content).toContain(
      `import { GqlAddress } from './../types/api-types';`,
    );
    expect(content).toContain(`export type WithoutArgsMutationResult = {
  withoutArgs: GqlAddress;
};`);
    expect(content).toContain(
      `UseMutationOptions<WithoutArgsMutationResult, unknown, unknown>`,
    );
    expect(content).toContain(`export const useWithoutArgsMutation`);

    expect(content).toContain(`const mutation = \`mutation WithoutArgs() {
    withoutArgs() { id
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
  }\`;`);
  });
});
