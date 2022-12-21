import { ArgResult } from './handle-arg';

export const stringifyArgs = (tsArgs: Array<ArgResult>): string =>
  tsArgs
    .map((el) => {
      let value = `$\{stringify(${el.name})}`;
      if (el.type === 'string') {
        value = `'${value}'`;
      }

      return `${el.name}: ${value}`;
    })
    .join(', ');
