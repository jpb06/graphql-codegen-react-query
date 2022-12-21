import { writeFile } from 'fs-extra';

import { GqlType } from '../../types/introspection-query-response.type';
import { capitalize } from '../util/capitalize';

export const generateIndexFile = async (
  outputPath: string,
  queryObject: GqlType,
  mutationObject: GqlType,
): Promise<void> => {
  const content = `export * from './types/api-types';
\n${queryObject.fields
    ?.map((el) => `export * from './queries/use${capitalize(el.name)}Query';`)
    .join('\n')}\nexport * from './queries/useGqlQuery';
\n${mutationObject.fields
    ?.map(
      (el) => `export * from './mutations/use${capitalize(el.name)}Mutation';`,
    )
    .join('\n')}`;

  await writeFile(`${outputPath}/index.ts`, content);
};
