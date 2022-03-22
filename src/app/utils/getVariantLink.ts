import config from '~/app/config';

export const getVariantLink = async (barcode: string) => {
  try {
    const url = new URL('Search/GetVariantLink', config.API_URL);
    url.searchParams.append('barcode', barcode);

    const response = await fetch(url.href, {
      method: 'POST',
    });

    if (!response.ok) {
      const error: ResponseError = new Error('fetcher.ts: An error occurred while fetching the data.');
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }

    const result = await response.json();

    return result;
  } catch (e: any) {
    throw new Error(e);
  }
};
