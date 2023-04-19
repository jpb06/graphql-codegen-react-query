import { SchemaType } from '../../../../types/schema-type.type';
import { SchemaTypesRoot } from '../../../../types/schema-types-root.type';
import { ParsedType } from '../translate-graphql-types-to-typescript';

export const getTypesWithEnumsObject = (
  typesObject: SchemaTypesRoot,
  types: Array<ParsedType>,
): SchemaTypesRoot => {
  const enums = types.filter((t) => t.type === 'enum').map((t) => t.name);

  return Object.entries(typesObject).reduce((acc, [key, value]) => {
    const onlyEnums = Object.entries(value).reduce((a, [k, v]) => {
      if (enums.includes(v)) {
        a[k] = v;
      }

      return a;
    }, {} as SchemaType);

    if (Object.keys(onlyEnums).length === 0) {
      return acc;
    }

    acc[key] = onlyEnums;
    return acc;
  }, {} as SchemaTypesRoot);
};
