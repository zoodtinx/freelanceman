import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { toast } from 'sonner';

export const defaultApiOptions: UseApiOptions = {
   enableOptimisticUpdate: true,
   errorCallbacks() {
      toast.error('Something went wrong. Please try again.');
   },
};
