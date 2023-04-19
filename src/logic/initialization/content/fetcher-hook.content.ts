export const fetcherHookContent = (
  apiUrl: string,
): string => `const endpointUrl = ${
  apiUrl.startsWith('http')
    ? `'${apiUrl}'`
    : `process.env.${apiUrl} || '${apiUrl}_NOT_SET'`
};

export const useFetchData = <TData>(
  initialQuery: string,
  options?: RequestInit['headers'],
): ((variables?: unknown, query?: string) => Promise<TData>) => {
  return async (variables?: unknown, query?: string) => {
    const result = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options,
        // <- Set your custom headers here
      },
      body: JSON.stringify({
        query: query ? query : initialQuery,
        variables,
      }),
    });

    const json = await result.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || 'Error ...');
    }

    return json.data;
  };
};
`;
