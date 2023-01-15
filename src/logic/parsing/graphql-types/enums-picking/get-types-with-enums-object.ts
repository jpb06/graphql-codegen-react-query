import { SchemaType } from '../../../../types/schema-type.type';
import { SchemaTypesRoot } from '../../../../types/schema-types-root.type';

export const getTypesWithEnumsObject = (
  types: SchemaTypesRoot,
  enums: Array<string>,
): SchemaTypesRoot =>
  Object.entries(types).reduce((acc, [key, value]) => {
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
