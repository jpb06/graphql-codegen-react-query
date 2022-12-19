import { GqlType } from '../../../types/introspection-query-response.type';
import { parseGraphqlObject } from './parse-graphql-object';

type ParseTypesResult = {
  types: string;
  count: number;
  rootObjectsName: Array<string>;
};

export const translateTypesToTs = (input: Array<GqlType>): ParseTypesResult => {
  let count = 0;
  const rootObjectsName: Array<string> = [];

  let argsTypesOutput = '';
  const output = input.reduce(
    (acc, { kind, name, fields, inputFields, enumValues }) => {
      if (name.startsWith('__')) {
        return acc;
      }

      if (kind === 'OBJECT' || kind === 'INPUT_OBJECT') {
        rootObjectsName.push(name);
        const target = kind === 'OBJECT' ? fields : inputFields;
        const { argsTypes, output, argsCount } = parseGraphqlObject(
          name,
          target,
        );
        acc += output;
        argsTypesOutput += argsTypes;
        count += argsCount + 1;
      } else if (kind === 'ENUM') {
        const typeOutput = `export type ${name} = ${enumValues
          ?.map((v) => `'${v.name}'`)
          .join(' | ')}`;

        acc += `${typeOutput};\n`;
        count++;
      }

      return acc;
    },
    '',
  );

  return {
    types: `/* eslint-disable */\n/* tslint:disable */\n\n${output}\n${argsTypesOutput}`,
    count,
    rootObjectsName,
  };
};
