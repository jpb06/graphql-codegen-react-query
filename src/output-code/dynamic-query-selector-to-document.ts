import { QuerySelector } from './../types/query-selector';
import { queryReplacer } from './query-replacer';

const variablesRegex = /"(.*)"(:?)( {|)|( true,?)(\n)/g;
const queriesNameRegex = /^ {2}(\b.*) {$/gm;

const getAllCaptureGroups = (target: string, regex: RegExp): Array<string> => {
  const matches = target.matchAll(regex);

  const captured: Array<string> = [];
  for (const m of matches) {
    captured.push(m[1]);
  }

  return captured;
};

export const dynamicQuerySelectorToDocument = <TVariables = unknown>(
  selector: QuerySelector,
  variables?: TVariables,
): string => {
  let queryContent = JSON.stringify(selector, null, 2).replace(
    variablesRegex,
    '$1$3$5',
  );

  const queries = getAllCaptureGroups(queryContent, queriesNameRegex);

  queries.forEach((query) => {
    const replaceArgs = queryReplacer[query](variables);
    if (replaceArgs) {
      queryContent = queryContent.replace(...replaceArgs);
    }
  });

  return `query ${queryContent}`;
};
