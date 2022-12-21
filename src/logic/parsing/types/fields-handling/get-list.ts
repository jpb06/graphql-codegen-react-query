import { GqlKind } from '../../../../types/introspection-query-response.type';
import { displayWarning } from '../../../cli/console/console.messages';
import { formatField } from './format-field';
import { translatedType } from './translate-type';

export const getList = (
  kind: GqlKind | undefined,
  name: string,
  type: string | null | undefined,
  isFunction: boolean,
  isNull: boolean,
): string => {
  if (kind === 'OBJECT' || kind === 'INPUT_OBJECT') {
    return formatField(name, `Array<${type}>`, isFunction, isNull);
  } else if (kind === 'SCALAR') {
    return formatField(
      name,
      `Array<${translatedType(type)}>`,
      isFunction,
      isNull,
    );
  }

  displayWarning(
    `List parsing: unhandled field 'name' for kind ${kind} and type ${type}`,
  );
  return '';
};
