import { displayWarning } from '../../../../cli/console/console.messages';
import { GqlField } from '../../../../types/introspection-query-response.type';
import { translateGraphqlTypeToTypescript } from '../../typescript/translate-graphql-type-to-typescript';

export type FunctionArgParsingResult = {
  name: string;
  type: string | null;
  import?: string;
};

export const parseFunctionArg = ({
  type,
  name,
}: GqlField): FunctionArgParsingResult => {
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
        type: translateGraphqlTypeToTypescript(type.ofType.name),
      };
    case 'LIST': {
      const ofType = type.ofType?.ofType?.ofType;
      if (ofType?.kind === 'SCALAR') {
        return {
          name,
          type: translateGraphqlTypeToTypescript(ofType.name),
          // type: `Array<${translateGraphqlTypeToTypescript(ofType.name)}>`,
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
