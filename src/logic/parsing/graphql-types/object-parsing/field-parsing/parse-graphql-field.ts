import { formatField } from './format/format-field';
import { FieldResult } from './types/field-result.type';
import { parseUnderlyingType } from './underlying-type/parse-underlying-type';
import { displayWarning } from '../../../../../cli/console/console.messages';
import {
  GqlField,
  GqlFieldType,
} from '../../../../../types/introspection-query-response.type';

export const parseGraphqlField = (
  field: GqlField,
  isFunction: boolean,
): FieldResult => {
  if (field.defaultValue) {
    return {
      output: formatField(field.name, field.defaultValue, isFunction, false),
      type: '',
    };
  }

  if (!field.name) {
    displayWarning(
      `getField: missing 'name' for field ${JSON.stringify(field, null, 2)}`,
    );
    return { output: '', type: '' };
  }

  if (field.type.kind === 'NON_NULL') {
    return parseUnderlyingType(
      field.name,
      field.type.ofType as GqlFieldType,
      isFunction,
      false,
    );
  }

  return parseUnderlyingType(field.name, field.type, isFunction, true);
};
