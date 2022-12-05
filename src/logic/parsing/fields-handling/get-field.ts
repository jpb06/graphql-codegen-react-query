import { GqlField } from '../../../types/introspection-query-response.type';
import { typesMapping } from '../../constants/types-mapping';
import { formatField } from './format-field';
import { getList } from './get-list';
import { translatedType } from './translate-type';

export const getField = (
  field: GqlField,
  isFunction: boolean,
): string | undefined => {
  if (field.defaultValue) {
    return formatField(field.name, field.defaultValue, isFunction);
  }

  if (field.name) {
    if (field.type.ofType?.kind === 'LIST') {
      const underlying = field.type.ofType.ofType?.ofType;
      return getList(
        underlying?.kind,
        field.name,
        underlying?.name,
        isFunction,
      );
    } else if (field.type.ofType?.kind === 'OBJECT') {
      return formatField(field.name, field.type.ofType?.name, isFunction);
    } else if (field.type.ofType?.kind === 'INPUT_OBJECT') {
      return formatField(field.name, field.type.ofType?.name, isFunction);
    }

    if (field.type.ofType?.name) {
      return formatField(
        field.name,
        typesMapping[field.type.ofType.name],
        isFunction,
      );
    }

    if (field.type.kind === 'LIST') {
      const underlying = field.type.ofType?.ofType;
      return getList(
        underlying?.kind,
        field.name,
        underlying?.name,
        isFunction,
      );
    } else if (field.type.kind === 'ENUM') {
      return formatField(field.name, field.type.name, isFunction);
    }

    return formatField(field.name, translatedType(field.type.name), isFunction);
  }
};
