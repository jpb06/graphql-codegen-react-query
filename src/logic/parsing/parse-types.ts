import { GqlType } from '../../types/introspection-query-response.type';
import { handleObjectFields } from './handle-object-field';

export const parseTypes = (types: Array<GqlType>): string => {
  let output = '';

  for (const type of types) {
    if (type.name.startsWith('__')) {
      continue;
    }

    if (type.kind === 'OBJECT' || type.kind === 'INPUT_OBJECT') {
      let typeOutput = `export interface ${type.name} { `;

      typeOutput += handleObjectFields(type.fields);
      typeOutput += handleObjectFields(type.inputFields);

      output += `${typeOutput} }\n`;
    } else if (type.kind === 'ENUM') {
      const typeOutput = `export type ${type.name} = ${type.enumValues
        ?.map((v) => `'${v.name}'`)
        .join(' | ')}`;

      output += `${typeOutput};\n`;
    }
  }

  return output;
};
