import {
  GqlField,
  GqlFieldType,
} from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';

const getGqlType = (type: GqlFieldType, required: '!' | ''): string => {
  if (type.kind === 'LIST') {
    return `[${type.ofType?.ofType?.name}]${required}`;
  }

  return `${type.name}${required}`;
};

export const generateDocument = (
  name: string,
  args: Array<GqlField> | null | undefined,
  resultType: string,
): string => {
  return `mutation ${capitalize(name)}(${
    args &&
    args
      .map((el) => {
        let type = '';
        if (el.type.kind === 'NON_NULL') {
          type = getGqlType(el.type.ofType as GqlFieldType, '!');
        } else {
          type = getGqlType(el.type, '');
        }

        return `$${el.name}: ${type}`;
      })
      .join(', ')
  }) {
    ${name}(${args && args.map((el) => `${el.name}: $${el.name}`).join(', ')}) {
      ${resultType}
    }
  }`;
};
