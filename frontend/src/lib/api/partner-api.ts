
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import {
   getPartnerCompanies,
   getPartnerCompanySelections,
} from '@/lib/api/services/partner-company-service';

export const usePartnerCompaniesQuery = (
   filter: {} = {},
   enabled?: boolean
) => {
   return useAppQuery(
      ['partnerCompanies', filter],
      (token) => getPartnerCompanies(token, filter),
      enabled
   );
};

export const usePartnerCompaniesSelectionQuery = (
   filter: {} = {},
   enabled?: boolean
) => {
   return useAppQuery(
      ['partnerCompanies', filter],
      (token) => getPartnerCompanySelections(token, filter),
      enabled
   );
};
