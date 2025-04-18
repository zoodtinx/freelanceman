import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { PartnerContactFilterDto } from 'freelanceman-common';

export async function getPartnerContacts(
   accessToken: string,
   filter: PartnerContactFilterDto
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
   partnerContactId: string
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `partner-contacts/${partnerContactId}`,
      method: 'GET',
      model: 'client',
   });
}
