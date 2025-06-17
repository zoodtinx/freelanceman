import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { ClientFilterDto } from 'freelanceman-common';

export async function getPaymentData(
   accessToken: string,
   filter: ClientFilterDto
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
