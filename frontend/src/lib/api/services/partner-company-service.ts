import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import {
   PartnerCompanyFilterDto,
} from 'freelanceman-common';

export async function getPartnerCompanies(accessToken: string, filter: PartnerCompanyFilterDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'partner-companies/search',
      method: 'POST',
      model: 'client',
      requestPayload: filter,
   });
}

export async function getPartnerCompanySelections(accessToken: string, filter: PartnerCompanyFilterDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'partner-companies/selections',
      method: 'POST',
      model: 'client',
      requestPayload: filter,
   });
}
