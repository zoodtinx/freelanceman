import useAuthStore from '@/lib/zustand/auth-store';
import { useQuery } from '@tanstack/react-query';
import {
   getPaymentData,
   getPaymentStats,
} from '@/lib/api/services/payment-service';

export const usePaymentDataQuery = (filter: any) => {
   const { accessToken } = useAuthStore();

   return useQuery({
      queryKey: ['paymentData'],
      queryFn: () => getPaymentData(accessToken, filter),
   });
};

export const usePaymentStatsQuery = () => {
   const { accessToken } = useAuthStore();

   return useQuery({
      queryKey: ['paymentStats'],
      queryFn: () => getPaymentStats(accessToken),
   });
};
