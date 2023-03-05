const stripArrayRegex = /Array<(.*)>/;

export const getRawType = (type: string): string =>
  stripArrayRegex.exec(type)?.[1] ?? type;
