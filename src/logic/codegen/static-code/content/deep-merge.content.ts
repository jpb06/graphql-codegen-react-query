export const deepMergeContent = `import { isObject } from './is-object';

type O = Record<string, unknown>;

export const deepMerge = (target: O, ...sources: Array<O>): O => {
  if (!isObject(target) || !sources.length || sources.length === 0) {
    return target;
  }

  const source = sources.shift();
  if (!isObject(source)) {
    return deepMerge(target, ...sources);
  }

  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) {
        Object.assign(target, { [key]: {} });
      }

      deepMerge(target[key] as O, source[key] as O);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }

  return deepMerge(target, ...sources);
};`;
