import { GqlType } from '../../../types/introspection-query-response.type';
import { capitalize } from '../../util/capitalize';
import { getReplacerFunctionParams } from './get-replacer-function-params';
import { handleArg } from './handle-arg';
import { stringifyArgs } from './stringify-args';

const getArgsTypesImports = (queryObject: GqlType): Array<string> | undefined =>
  queryObject.fields
    ?.filter((el) => el.args && el.args.length > 0)
    .map((el) => `${capitalize(el.name)}QueryArgs`);

export const generateQueryReplacer = (queryObject: GqlType): string => {
  const argsImports = getArgsTypesImports(queryObject);

  const declaration = `${
    argsImports && argsImports?.length > 0
      ? `import { ${argsImports.join(
          ', ',
        )} } from './../types/api-types';\nimport { stringify} from './stringify-object'\n\n`
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

      const tsArgs = args.map(handleArg);
      const functionParams = getReplacerFunctionParams(name, tsArgs);
      const stringifiedArgs = stringifyArgs(tsArgs);

      return `${out}  ${name}: ${functionParams} => [new RegExp('^ {2}${name} {$', 'gm'), \`  ${name}(${stringifiedArgs}) {\`],\n`;
    }, declaration) || '';

  return `${output}\n};`;
};
