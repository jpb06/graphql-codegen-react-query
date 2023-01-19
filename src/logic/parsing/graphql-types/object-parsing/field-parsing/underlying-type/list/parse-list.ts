import { displayWarning } from '../../../../../../../cli/console/console.messages';
import { GqlKind } from '../../../../../../../types/introspection-query-response.type';
import { translateGraphqlTypeToTypescript } from '../../../../../typescript/translate-graphql-type-to-typescript';
import { formatField } from '../../format/format-field';
import { FieldResult } from '../../types/field-result.type';

export const parseList = (
  kind: GqlKind | undefined,
  name: string,
  type: string | null | undefined,
  isFunction: boolean,
  isNull: boolean,
): FieldResult => {
  if (kind === 'OBJECT' || kind === 'INPUT_OBJECT') {
    return {
      output: formatField(name, `Array<${type}>`, isFunction, isNull),
      type: `Array<${type}>`,
    };
  } else if (kind === 'SCALAR') {
    return {
      output: formatField(
        name,
        `Array<${translateGraphqlTypeToTypescript(type)}>`,
        isFunction,
        isNull,
      ),
      type: `Array<${translateGraphqlTypeToTypescript(type)}>`,
    };
  }

  displayWarning(
    `List parsing: unhandled field 'name' for kind ${kind} and type ${type}`,
  );
  return { output: '', type: '' };
};
