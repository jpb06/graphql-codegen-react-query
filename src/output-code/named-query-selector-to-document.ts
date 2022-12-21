import { queryReplacer } from './query-replacer';

const variablesRegex = /"(.*)"(:?)( {|)|( true,?)(\n)/g;

export const namedQuerySelectorToDocument = (
  queryName: string,
  selector: unknown,
  variables?: unknown,
): string => {
  const queryContent = JSON.stringify(selector, null, 2).replace(
    variablesRegex,
    '$1$3$5',
  );

  const replaceArgs = queryReplacer[queryName](variables);

  const rawQuery = `query {\n ${
    replaceArgs ? replaceArgs[1].slice(0, -1) : queryName
  } ${queryContent} \n}`;

  return rawQuery;
};
