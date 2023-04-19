import { displayWarning } from '../../../../../cli/console/console.messages';
import {
  GqlFieldType,
  GqlField,
} from '../../../../../types/introspection-query-response.type';
import { translateGraphqlTypeToTypescript } from '../../../../parsing/typescript/translate-graphql-type-to-typescript';

export type FunctionArgParsingResult = {
  name: string;
  type: string | null;
  imports?: string;
};

const getType = (
  queryName: string,
  name: string,
  fieldType: GqlFieldType,
): FunctionArgParsingResult => {
  switch (fieldType.kind) {
    case 'ENUM':
    case 'INPUT_OBJECT':
      return {
        name,
        type: fieldType.name,
        imports: fieldType.name ?? undefined,
      };
    case 'SCALAR':
      return {
        name,
        type: translateGraphqlTypeToTypescript(fieldType.name),
      };
    case 'LIST': {
      const ofType = fieldType?.ofType?.ofType;
      if (ofType?.kind === 'SCALAR') {
        return {
          name,
          type: translateGraphqlTypeToTypescript(ofType.name),
        };
      }

      return {
        name: name,
        type: `Array<${ofType?.name}>`,
        imports: fieldType.name ?? undefined,
      };
    }
    default: {
      displayWarning(
        `Query replacer: unhandled arg ${name} for query ${queryName}`,
      );

      return {
        name,
        type: 'unknown',
      };
    }
  }
};

export const parseFunctionArg = ({
  queryName,
  type,
  name,
}: GqlField & {
  queryName: string;
}): FunctionArgParsingResult => {
  if (type.kind === 'NON_NULL') {
    return getType(queryName, name, type.ofType as GqlFieldType);
  }

  return getType(queryName, name, type);
};
