import axios from 'axios';

import { introspectionQuery } from './graphql/introspection.gql';
import {
  GqlType,
  IntrospectQuery,
} from '../../types/introspection-query-response.type';

export const fetchGraphqlSchema = async (
  schemaUrl: string,
): Promise<Array<GqlType>> => {
  const response = await axios.post<IntrospectQuery>(schemaUrl, {
    query: introspectionQuery,
  });

  return response.data.data.__schema.types;
};
