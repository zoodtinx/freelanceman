import {
   getPaymentData,
   getPaymentStats,
} from '@/lib/api/services/payment-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';

export const usePaymentDataQuery = (filter: any) => {
   return useAppQuery(['paymentData', filter], (token) =>
      getPaymentData(token, filter)
   );
};

export const usePaymentStatsQuery = () => {
   return useAppQuery(['paymentStats'], (token) => getPaymentStats(token));
};
