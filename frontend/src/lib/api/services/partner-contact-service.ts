import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import {
   CreatePartnerContactDto,
   EditPartnerContactDto,
   PartnerContactFilterDto,
} from 'freelanceman-common';

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

export async function createPartnerContact(
   accessToken: string,
   payload: CreatePartnerContactDto
) {}

export async function editPartnerContact(
   accessToken: string,
   payload: EditPartnerContactDto
) {}

export async function deletePartnerContact(
   accessToken: string,
   contactId: string
) {}
