import { displayError } from '../../../cli/console/console.messages';
import { GqlType } from '../../../types/introspection-query-response.type';

type EndpointObjects = {
  queryObject: GqlType;
  mutationObject: GqlType;
};

export const getEndpointsObjects = (
  schemaTypes: Array<GqlType>,
): EndpointObjects => {
  const queryObject = schemaTypes.find(
    (el) => el.name === 'Query' && el.kind === 'OBJECT' && el.fields !== null,
  );
  if (!queryObject) {
    displayError('Missing Query object in schema');
    process.exit(1);
  }

  const mutationObject = schemaTypes.find(
    (el) =>
      el.name === 'Mutation' && el.kind === 'OBJECT' && el.fields !== null,
  );
  if (!mutationObject) {
    displayError('Missing Mutation object in schema');
    process.exit(1);
  }

  return { queryObject, mutationObject };
};
