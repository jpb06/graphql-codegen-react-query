import { ensureDir, writeFile } from 'fs-extra';

import { GqlType } from '../../../types/introspection-query-response.type';
import { ParsedType } from '../../parsing/graphql-types/translate-graphql-types-to-typescript';
import { generateQuerySelector } from '../../parsing/query-selector/generate-query-selector';
import { generateQuerySelectorResult } from '../../parsing/query-selector/generate-query-selector-result';
import { decapitalize } from '../../util/decapitalize';

export type SelectorsGenerationResult = {
  querySelector: string;
};

export const generateSelectors = async (
  queryObject: GqlType,
  types: Array<ParsedType>,
  outputPath: string,
): Promise<SelectorsGenerationResult> => {
  const querySelector = generateQuerySelector(queryObject, types);
  await writeFile(`${outputPath}/types/query-selector.ts`, querySelector);

  const result = generateQuerySelectorResult(queryObject, types);

  for (const { name, content, imports } of result) {
    let importString = '';
    if (imports !== undefined && imports.length > 0) {
      importString = `import { ${imports.join(
        ', ',
      )} } from '../../api-types';\n\n`;
    }

    const type = decapitalize(name);
    await ensureDir(`${outputPath}/types/queries/${type}`);
    await writeFile(
      `${outputPath}/types/queries/${type}/${name}QueryResult.type.ts`,
      `${importString}export type ${name}QueryResult = ${content}`,
    );
  }

  const querySelectorResult = generateQuerySelector(queryObject, types, false);
  await writeFile(
    `${outputPath}/types/query-selector-result.ts`,
    querySelectorResult,
  );

  return {
    querySelector,
  };
};
