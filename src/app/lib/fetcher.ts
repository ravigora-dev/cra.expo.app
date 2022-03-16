interface IFetcher {
  (url: string | URL | any, args?: object | any): Promise<any>;
}

const fetcher: IFetcher = async (url, args = {}) => {
  try {
    const { method, headers, body, ...rest } = args;
    const response: Response = await fetch(url, {
      ...(method && { method }),
      headers: {
        ...(headers && { ...headers }),
      },
      ...(body && { body }),
      ...rest,
    });

    if (!response.ok) {
      const error: ResponseError = new Error('fetcher.ts: An error occurred while fetching the data.');
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }

    const result = await response.json();

    return result;
  } catch (e) {
    throw e;
  }
};

export const fetcherPost: IFetcher = (url, args = {}) =>
  fetcher(url, {
    method: 'POST',
    ...args,
  });

export const fetcherPut: IFetcher = (url, args = {}) =>
  fetcher(url, {
    method: 'PUT',
    ...args,
  });

export const fetcherDelete: IFetcher = (url, args = {}) =>
  fetcher(url, {
    method: 'DELETE',
    ...args,
  });

export default fetcher;
