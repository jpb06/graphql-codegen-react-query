import { getResultFields } from './get-result-fields';
import { displayWarning } from '../../../../cli/console/console.messages';
import { GqlFieldType } from '../../../../types/introspection-query-response.type';
import { translateGraphqlTypeToTypescript } from '../../../parsing/typescript/translate-graphql-type-to-typescript';

type MutationResult = {
  documentResultFields: string;
  resultType: string;
};

export const getMutationResultTypes = (
  type: GqlFieldType,
  types: string,
): MutationResult => {
  if (type.kind === 'NON_NULL') {
    if (type.ofType?.kind === 'LIST') {
      const typeName = type.ofType?.ofType?.ofType?.name;
      if (!typeName) {
        displayWarning(`Missing`);
        return {
          documentResultFields: '',
          resultType: 'Array<never>',
        };
      }

      return {
        documentResultFields: getResultFields(typeName, types),
        resultType: `Array<${typeName}>`,
      };
    } else if (type.ofType?.kind === 'SCALAR') {
      const typeName = type.ofType?.name as string;
      return {
        documentResultFields: typeName,
        resultType: translateGraphqlTypeToTypescript(typeName),
      };
    }

    const typeName = type.ofType?.name as string;

    return {
      documentResultFields: getResultFields(typeName, types),
      resultType: typeName,
    };
  }

  if (type.kind === 'LIST') {
    const typeName = type.ofType?.ofType?.name as string;

    return {
      documentResultFields: getResultFields(typeName, types),
      resultType: `Array<${typeName}> | undefined`,
    };
  } else if (type.kind === 'SCALAR') {
    const typeName = type.name as string;

    return {
      documentResultFields: typeName,
      resultType: `${translateGraphqlTypeToTypescript(typeName)} | undefined`,
    };
  }

  const typeName = type.name as string;
  return {
    documentResultFields: getResultFields(typeName, types),
    resultType: `${typeName} | undefined`,
  };
};
