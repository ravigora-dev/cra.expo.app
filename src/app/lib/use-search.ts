import { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { fetcherPost } from './fetcher';

export const getVariantLink = async (barcode: string): Promise<any> => {
  return fetcherPost(`https://bff.carl-ras.dk/api/Search/GetVariantLink?barcode=${barcode}`);
};
