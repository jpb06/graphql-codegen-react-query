import { parseList } from './list/parse-list';
import { displayWarning } from '../../../../../../cli/console/console.messages';
import { GqlFieldType } from '../../../../../../types/introspection-query-response.type';
import { translateGraphqlTypeToTypescript } from '../../../../typescript/translate-graphql-type-to-typescript';
import { formatField } from '../format/format-field';
import { FieldResult } from '../types/field-result.type';

export const parseUnderlyingType = (
  fieldName: string,
  type: GqlFieldType,
  isFunction: boolean,
  isNull: boolean,
): FieldResult => {
  if (type.kind === 'LIST') {
    const underlying = type.ofType?.ofType;
    return parseList(
      underlying?.kind,
      fieldName,
      underlying?.name,
      isFunction,
      isNull,
    );
  } else if (type.kind === 'OBJECT' || type.kind === 'INPUT_OBJECT') {
    return {
      output: formatField(fieldName, type.name, isFunction, isNull),
      type: type.name as string,
    };
  } else if (type.kind === 'SCALAR') {
    return {
      output: formatField(
        fieldName,
        translateGraphqlTypeToTypescript(type.name),
        isFunction,
        isNull,
      ),
      type: translateGraphqlTypeToTypescript(type.name),
    };
  } else if (type.kind === 'ENUM') {
    return {
      output: formatField(fieldName, type.name, isFunction, isNull),
      type: type.name as string,
    };
  }

  displayWarning(`Unhandled field ${fieldName} of type ${type}`);
  return { output: '', type: '' };
};
