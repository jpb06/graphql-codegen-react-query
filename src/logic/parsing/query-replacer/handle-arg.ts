import { GqlField } from '../../../types/introspection-query-response.type';
import { displayWarning } from '../../cli/console/console.messages';
import { translatedType } from '../types/fields-handling/translate-type';

export type ArgResult = {
  name: string;
  type: string | null;
  import?: string;
};

export const handleArg = ({ type, name }: GqlField): ArgResult => {
  switch (type.ofType?.kind) {
    case 'INPUT_OBJECT':
      return {
        name,
        type: type.ofType.name,
        import: type.ofType.name ?? undefined,
      };
    case 'SCALAR':
      return {
        name,
        type: translatedType(type.ofType.name),
      };
    case 'LIST': {
      const ofType = type.ofType?.ofType?.ofType;
      if (ofType?.kind === 'SCALAR') {
        return {
          name,
          type: `Array<${translatedType(ofType.name)}>`,
        };
      }

      return {
        name: name,
        type: `Array<${ofType?.name}>`,
        import: type.ofType.name ?? undefined,
      };
    }
    default:
      displayWarning(
        `Query replacer: unhandled arg type ${type.ofType?.kind} for query ${name}`,
      );

      return {
        name,
        type: 'unknown',
      };
  }
};
