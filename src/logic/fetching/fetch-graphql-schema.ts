import axios from 'axios';
import dotenv from 'dotenv-flow';

dotenv.config();

import { introspectionQuery } from './graphql/introspection.gql';
import {
  GqlType,
  IntrospectQuery,
} from '../../types/introspection-query-response.type';

export const fetchGraphqlSchema = async (
  schemaUrl: string,
): Promise<Array<GqlType>> => {
  const url = schemaUrl.startsWith('http')
    ? schemaUrl
    : process.env[schemaUrl] || `${schemaUrl}-not-set`;

  const response = await axios.post<IntrospectQuery>(url, {
    query: introspectionQuery,
  });

  return response.data.data.__schema.types;
};
