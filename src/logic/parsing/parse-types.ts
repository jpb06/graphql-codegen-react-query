import { GqlType } from '../../types/introspection-query-response.type';
import { handleObjectFields } from './handle-object-field';

type ParseTypesResult = {
  output: string;
  typesCount: number;
};

export const parseTypes = (types: Array<GqlType>): ParseTypesResult => {
  let count = 0;

  const output = types.reduce(
    (out, { kind, name, fields, inputFields, enumValues }) => {
      if (name.startsWith('__')) {
        return out;
      }

      if (kind === 'OBJECT' || kind === 'INPUT_OBJECT') {
        let typeOutput = `export interface ${name} { `;

        typeOutput += handleObjectFields(fields);
        typeOutput += handleObjectFields(inputFields);

        out += `${typeOutput} }\n`;
        count++;
      } else if (kind === 'ENUM') {
        const typeOutput = `export type ${name} = ${enumValues
          ?.map((v) => `'${v.name}'`)
          .join(' | ')}`;

        out += `${typeOutput};\n`;
        count++;
      }

      return out;
    },
    '',
  );

  return {
    output: `/* eslint-disable */\n/* tslint:disable */\n\n${output}`,
    typesCount: count,
  };
};
