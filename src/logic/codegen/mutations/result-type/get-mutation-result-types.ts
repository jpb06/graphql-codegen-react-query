import { getResultFields } from './get-result-fields';
import { displayWarning } from '../../../../cli/console/console.messages';
import { GqlFieldType } from '../../../../types/introspection-query-response.type';
import { ParsedType } from '../../../parsing/graphql-types/translate-graphql-types-to-typescript';
import { translateGraphqlTypeToTypescript } from '../../../parsing/typescript/translate-graphql-type-to-typescript';

type MutationResult = {
  resultKind: 'scalar' | 'object';
  documentResultFields: string;
  resultType: string;
};

export const getMutationResultTypes = (
  name: string,
  type: GqlFieldType,
  types: Array<ParsedType>,
): MutationResult => {
  if (type.kind === 'NON_NULL') {
    if (type.ofType?.kind === 'LIST') {
      const typeName = type.ofType?.ofType?.ofType?.name;
      if (!typeName) {
        displayWarning(`Missing`);
        return {
          documentResultFields: '',
          resultType: 'Array<never>',
          resultKind: 'object',
        };
      }

      return {
        documentResultFields: getResultFields(name, typeName, types),
        resultType: `Array<${typeName}>`,
        resultKind: 'object',
      };
    } else if (type.ofType?.kind === 'SCALAR') {
      const typeName = type.ofType?.name as string;
      return {
        documentResultFields: typeName,
        resultType: translateGraphqlTypeToTypescript(typeName),
        resultKind: 'scalar',
      };
    }

    const typeName = type.ofType?.name as string;

    return {
      documentResultFields: getResultFields(name, typeName, types),
      resultType: typeName,
      resultKind: 'object',
    };
  }

  if (type.kind === 'LIST') {
    const typeName = type.ofType?.ofType?.name as string;

    return {
      documentResultFields: getResultFields(name, typeName, types),
      resultType: `Array<${typeName}> | undefined`,
      resultKind: 'object',
    };
  } else if (type.kind === 'SCALAR') {
    const typeName = type.name as string;

    return {
      documentResultFields: typeName,
      resultType: `${translateGraphqlTypeToTypescript(typeName)} | undefined`,
      resultKind: 'scalar',
    };
  }

  const typeName = type.name as string;
  return {
    documentResultFields: getResultFields(name, typeName, types),
    resultType: `${typeName} | undefined`,
    resultKind: 'object',
  };
};
