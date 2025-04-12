import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { ClientSearchOption } from '@types';

export async function getPaymentData(
   accessToken: string,
   filter: ClientSearchOption
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'payment/search',
      method: 'POST',
      model: 'project payment data',
      requestPayload: filter,
   });
}

export async function getPaymentStats(
   accessToken: string,
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'payment/stats',
      method: 'GET',
      model: 'project payment data',
   });
}
