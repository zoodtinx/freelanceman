import { getAmountDue, getProjectPayment } from '@/lib/api/mock/mock-project-payment-service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectPaymentDataFilter } from '@types';

export const useProjectPaymentDataQuery = (filter: ProjectPaymentDataFilter) => {
   return useQuery({
      queryKey: ['projectPaymentData'],
      queryFn: () => getProjectPayment(filter),
   });
};

export const useAmountDueQuery = () => {
   return useQuery({
      queryKey: ['amountDue'],
      queryFn: () => getAmountDue(),
   });
}