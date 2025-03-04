import { getProjectPayment } from '@/lib/api/mock/mock-project-payment-service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useProjectPaymentDataQuery = () => {
   return useQuery({
      queryKey: ['projectPaymentData'],
      queryFn: () => getProjectPayment(),
   });
};