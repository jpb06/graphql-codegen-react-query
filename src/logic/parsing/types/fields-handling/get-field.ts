import {
  GqlField,
  GqlFieldType,
} from '../../../../types/introspection-query-response.type';
import { displayWarning } from '../../../cli/console/console.messages';
import { formatField } from './format-field';
import { getList } from './get-list';
import { translatedType } from './translate-type';

const handleType = (
  fieldName: string,
  type: GqlFieldType,
  isFunction: boolean,
  isNull: boolean,
): string => {
  if (type.kind === 'LIST') {
    const underlying = type.ofType?.ofType;
    return getList(
      underlying?.kind,
      fieldName,
      underlying?.name,
      isFunction,
      isNull,
    );
  } else if (type.kind === 'OBJECT' || type.kind === 'INPUT_OBJECT') {
    return formatField(fieldName, type.name, isFunction, isNull);
  } else if (type.kind === 'SCALAR') {
    return formatField(
      fieldName,
      translatedType(type.name),
      isFunction,
      isNull,
    );
  } else if (type.kind === 'ENUM') {
    return formatField(fieldName, type.name, isFunction, isNull);
  }

  displayWarning(`Unhandled field ${fieldName} of type ${type}`);
  return '';
};

export const getField = (
  field: GqlField,
  isFunction: boolean,
): string | undefined => {
  if (field.defaultValue) {
    return formatField(field.name, field.defaultValue, isFunction, false);
  }

  if (field.name) {
    if (field.type.kind === 'NON_NULL') {
      return handleType(
        field.name,
        field.type.ofType as GqlFieldType,
        isFunction,
        false,
      );
    }

    return handleType(field.name, field.type, isFunction, true);
  }
};
