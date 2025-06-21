import { refreshAccess } from '@/lib/api/auth-api';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { QueryClient } from '@tanstack/react-query';
import { NavigateFunction } from 'react-router-dom';

interface Config {
   queryClient: QueryClient;
   navigate: NavigateFunction;
   options?: UseApiOptions;
   queryKey: string[];
}

export const getBaseMutationOptions = ({
   queryClient,
   navigate,
   options,
   queryKey,
}: Config) => ({
   onSuccess: () => {
      options && options.successCallbacks && options.successCallbacks();
   },
   onError: async (
      err: Error,
      _: unknown,
      context: Record<string, unknown> | undefined
   ) => {
      if (options && options.enableOptimisticUpdate && context) {
         Object.entries(context).forEach(([queryKey, previousEvents]) => {
            queryClient.setQueryData(JSON.parse(queryKey), previousEvents);
         });
      }

      if (err.message === 'Unauthorized') {
         const result = await refreshAccess();
         if (!result.success) {
            navigate('/welcome');
            return;
         }
         return;
      } else {
         options && options.errorCallbacks && options.errorCallbacks();
      }
   },
   onSettled: () => {
      queryKey.forEach((key) => {
         queryClient.invalidateQueries({ queryKey: [key] });
      })
   },
});
