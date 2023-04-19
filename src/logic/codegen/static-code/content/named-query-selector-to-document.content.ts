export const namedQuerySelectorToDocumentContent = `const variablesRegex = /"(.*)"(:?)( {|)|( true,?)(\\n)/g;

const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const namedQuerySelectorToDocument = (
  queryName: string,
  selector: unknown,
  queryParams?: string,
  queryArgs?: string
): string => {
  const queryBody = JSON.stringify(selector, null, 2).replace(
    variablesRegex,
    '$1$3$5',
  );

  const params = queryParams ? \`(\${queryParams})\` : '';
  const args = queryArgs ? \`(\${queryArgs})\` : '';

  const rawQuery = \`query \${capitalize(queryName)}\${params} {
  \${queryName}\${args} \${queryBody} \\n}\`

  return rawQuery;
};
`;
