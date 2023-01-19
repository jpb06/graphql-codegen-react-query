import { getEndpointsObjects } from './get-endpoints-objects';
import { displayError } from '../../../cli/console/console.messages';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { graphqlMutationObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema/graphql-mutation-object.mock-data';

jest.mock('../../../cli/console/console.messages');

describe('getEndpointsObjects function', () => {
  const mockExit = jest
    .spyOn(process, 'exit')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementation((() => {}) as (code?: number | undefined) => never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fail when query object is missing in input', () => {
    const input = [graphqlMutationObjectMockedData];
    getEndpointsObjects(input);

    expect(displayError).toHaveBeenCalledWith('Missing Query object in schema');
    expect(mockExit).toHaveBeenCalledTimes(1);
  });

  it('should fail when mutation object is missing in input', () => {
    const input = [graphqlQueryObjectMockedData];
    getEndpointsObjects(input);

    expect(displayError).toHaveBeenCalledWith(
      'Missing Mutation object in schema',
    );
    expect(mockExit).toHaveBeenCalledTimes(1);
  });

  it('should return the query and mutation object', () => {
    const input = [
      graphqlQueryObjectMockedData,
      graphqlMutationObjectMockedData,
    ];
    const result = getEndpointsObjects(input);

    expect(result.queryObject).toBeDefined();
    expect(result.mutationObject).toBeDefined();
  });
});
