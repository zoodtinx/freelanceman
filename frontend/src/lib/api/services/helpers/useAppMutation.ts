import useAuthStore from '@/lib/zustand/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface MutationHandler {
   mutationKey: string;
   invalidationKeys: string[];
   mutationFn: (token: string, payload: any) => Promise<any>;
   optimisticUpdate?: {
      enable: boolean;
      key: string[];
      updater: (oldData: any, payload: any) => any;
   };
}

interface MutationCallbacks {
   errorCallback?: (err: Error) => void;
   successCallback?: () => void;
}

export const useAppMutation = <T>(
   {
      mutationKey,
      invalidationKeys,
      mutationFn,
      optimisticUpdate,
   }: MutationHandler,
   { successCallback, errorCallback }: MutationCallbacks = {}
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: [mutationKey],
      mutationFn: (payload: T) => mutationFn(accessToken, payload),

      onSuccess: () => {
         successCallback && successCallback();
      },
      onMutate: async (payload: T) => {
         if (!optimisticUpdate?.enable) return;

         await queryClient.cancelQueries({ queryKey: [optimisticUpdate.key] });

         const previousData = queryClient.getQueryData(optimisticUpdate.key);

         queryClient.setQueryData(optimisticUpdate.key, (old: any) =>
            optimisticUpdate.updater(old, payload)
         );

         return { previousData };
      },
      onError: (err: Error, _payload, context: any) => {
         if (optimisticUpdate?.enable && context?.previousData) {
            queryClient.setQueryData(
               optimisticUpdate.key,
               context.previousData
            );
         }
         if (err.message === 'Unauthorized') {
            navigate('/login');
         } else {
            errorCallback && errorCallback(err);
         }
      },
      onSettled: () => {
         invalidationKeys.forEach((key: string) => {
            queryClient.invalidateQueries({ queryKey: [key] });
         });
      },
   });
};
