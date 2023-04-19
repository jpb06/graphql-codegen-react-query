import { getReplacerFunctionParams } from './args/get-replacer-function-params';
import { parseFunctionArg } from './args/parse-function-arg';
import { stringifyArgs } from './args/stringify-args';
import { GqlType } from '../../../../types/introspection-query-response.type';
import { capitalize } from '../../../util/capitalize';

const getArgsTypesImports = (queryObject: GqlType): Array<string> | undefined =>
  queryObject.fields
    ?.filter((el) => el.args && el.args.length > 0)
    .map((el) => {
      const operation = capitalize(el.name);
      const type = `${operation}QueryArgs`;

      return `import { ${type} } from './../types/queries/${el.name}/${type}.type'`;
    });

export const generateQueryReplacer = (queryObject: GqlType): string => {
  const argsImports = getArgsTypesImports(queryObject);

  const declaration = `${
    argsImports && argsImports?.length > 0
      ? `${argsImports.join(
          ';\n',
        )};\nimport { stringify } from './stringify-object'\n\n`
      : ''
  }export const queryReplacer: Record<
string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(variables: any) => [RegExp, string] | undefined
> = {\n`;

  const output =
    queryObject.fields?.reduce((out, { name, args }) => {
      if (args?.length === 0 || !args) {
        return `${out}  ${name}: () => undefined,\n`;
      }

      const tsArgs = args.map((el) =>
        parseFunctionArg({ ...el, queryName: name }),
      );
      const functionParams = getReplacerFunctionParams(name);
      const stringifiedArgs = stringifyArgs(tsArgs);

      return `${out}  ${name}: ${functionParams} => [new RegExp('^ {2}${name} {$', 'gm'), \`  ${name}(${stringifiedArgs}) {\`],\n`;
    }, declaration) || '';

  return `${output}\n};`;
};
