import { GqlField } from '../../types/introspection-query-response.type';
import { getField } from './fields-handling/get-field';

export const getObjectFields = (fields: GqlField[] | null): string => {
  if (!fields) {
    return '';
  }

  return fields.reduce((out, field): string => {
    if (field.args && field.args.length > 0) {
      const outputType = getField(field, true);

      const functionDefinition = `${field.name}: (${field.args
        .map((arg) => `${arg.name}: ${getField(arg, true)}`)
        .join(', ')}) => ${outputType}`;

      out += `${functionDefinition}; `;
    } else {
      out += getField(field, false);
    }

    return out;
  }, '');
};
