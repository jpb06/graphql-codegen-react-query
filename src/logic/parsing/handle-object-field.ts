import {
  GqlField,
  GqlKind,
} from '../../types/introspection-query-response.type';
import { typesMapping } from '../constants/types-mapping';

const formatField = (
  name: string,
  value: unknown,
  includeFieldName: boolean,
): string => (includeFieldName ? `${value}` : `${name}: ${value}; `);

const handleList = (
  kind: GqlKind | undefined,
  name: string,
  type: string | null | undefined,
  isFunction: boolean,
): string => {
  if (kind === 'OBJECT' || kind === 'INPUT_OBJECT') {
    return formatField(name, `Array<${type}>`, isFunction);
  } else if (kind === 'SCALAR') {
    return formatField(name, `Array<${typesMapping[type || '']}>`, isFunction);
  }

  throw new Error(`Unhandled field 'name' (Kind=${kind}, type=${type})`);
};

const getField = (field: GqlField, isFunction: boolean): string | undefined => {
  if (field.defaultValue) {
    return formatField(field.name, field.defaultValue, isFunction);
  }

  if (field.name) {
    if (field.type.ofType?.kind === 'LIST') {
      const underlying = field.type.ofType.ofType?.ofType;
      return handleList(
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
        typesMapping[field.type.ofType.name] ?? 'unknown',
        isFunction,
      );
    }

    if (field.type.kind === 'LIST') {
      const underlying = field.type.ofType?.ofType;
      return handleList(
        underlying?.kind,
        field.name,
        underlying?.name,
        isFunction,
      );
    } else if (field.type.kind === 'ENUM') {
      return formatField(field.name, field.type.name, isFunction);
    }

    return formatField(
      field.name,
      typesMapping[field.type.name || ''],
      isFunction,
    );
  }
};

export const handleObjectFields = (fields: GqlField[] | null): string => {
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
