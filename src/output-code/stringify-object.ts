const regex = /^ *"(.*?)"(: .*?)$/gm;

export const stringify = (object: unknown): string => {
  const json = JSON.stringify(object, null, 2);

  return json.replace(regex, (_, name, rest) => `${name}${rest}`);
};
