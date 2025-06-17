import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';

export async function getPartnerCompanies(accessToken: string, filter: {}) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'partner-companies/search',
      method: 'POST',
      model: 'client',
      requestPayload: filter,
   });
}

export async function getPartnerCompanySelections(accessToken: string, filter: {}) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'partner-companies/selections',
      method: 'POST',
      model: 'client',
      requestPayload: filter,
   });
}
