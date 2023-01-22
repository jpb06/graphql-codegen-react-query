export const stringifyObjectContent = `/* eslint-disable @typescript-eslint/no-explicit-any */
import { typesWithEnumsObject } from './types-with-enums-object';
import { isObject } from './is-object';

const repeatTabs = (count: number): string =>
  count === 0 ? '' : '  '.repeat(count - 1);

const stringifyObject = (input: any, typeName: string, level = 2): string => {
  const tabs = repeatTabs(level);

  const r = Object.entries(input).reduce((acc, [key, value], index, o) => {
    const trailing = index < o.length - 1 ? '\\n' : '';

    const t = (typesWithEnumsObject as Record<string, Record<string, string>>)[
      typeName
    ];
    if (t && key in t) {
      acc += \`\${tabs}\${key}: \${value}\${trailing}\`;
    } else if (typeof value === 'string') {
      acc += \`\${tabs}\${key}: "\${value}"\${trailing}\`;
    } else if (value !== undefined) {
      acc += \`\${tabs}\${key}: \${value}\${trailing}\`;
    }

    return acc;
  }, '');

  return \`{
\${r}
}\`;
};

export const stringify = (input: any, typeName: string, level = 2): string => {
  if (Array.isArray(input)) {
    return \`[\${input.map((el) =>
      isObject(el) ? stringifyObject(el, typeName) : el
    )}]\`;
  } else if (isObject(input)) {
    return stringifyObject(input, typeName, level);
  } 

  return input;
};
`;
