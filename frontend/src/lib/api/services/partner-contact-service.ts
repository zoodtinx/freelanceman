import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { ClientSearchOption } from '@types';

export async function getPartnerContacts(
   accessToken: string,
   filter: ClientSearchOption
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'partner-contacts/search',
      method: 'POST',
      model: 'partner contact',
      requestPayload: filter,
   });
}

export async function getPartnerContact(
   accessToken: string,
   partnerContactId: ClientSearchOption
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `partner-contacts/${partnerContactId}`,
      method: 'GET',
      model: 'client',
   });
}
