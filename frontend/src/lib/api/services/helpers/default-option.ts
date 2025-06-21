import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { toast } from 'sonner';

export const defaultApiOptions: UseApiOptions = {
   enableOptimisticUpdate: true,
   successCallbacks() {
      toast.dismiss() 
   },
   errorCallbacks() {
      toast.dismiss()
      toast.error('Something went wrong. Please try again.');
   },
};
