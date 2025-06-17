import {
   MutationCallbacks,
   MutationHandler,
} from '@/lib/api/services/helpers/api.type';
import useAuthStore from '@/lib/zustand/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const optimisticUpdaters = {
   create: (old: any = [], payload: any) => [
      ...old,
      { ...payload, id: 'temp-id' },
   ],

   edit: (old: any[] = [], payload: any) =>
      old.map((item: any) => (item.id === payload.id ? payload : item)),

   delete: (old: any = [], id: any) =>
      old.filter((item: any) => item.id !== id),
};

export const useAppMutation = <T>(
   { mutationKey, invalidationKeys, mutationFn }: MutationHandler,
   { successCallback, errorCallback, optimisticUpdate }: MutationCallbacks = {}
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: [mutationKey],
      mutationFn: (payload: T) => mutationFn(accessToken, payload),

      onMutate: async (payload: any) => {
         if (!optimisticUpdate?.enable) return;

         await queryClient.cancelQueries({ queryKey: optimisticUpdate.key });

         const previousData = queryClient.getQueryData(optimisticUpdate.key);

         queryClient.setQueryData([optimisticUpdate.key], (old: any) =>
            optimisticUpdaters[optimisticUpdate.type](old, payload)
         );

         return { previousData };
      },
      onSuccess: () => {
         successCallback && successCallback();
      },
      onError: (err: Error, _payload, context: any) => {
         if (optimisticUpdate?.enable && context?.previousData) {
            queryClient.setQueryData([mutationKey], context.previousData);
         }
         if (err.message === 'Unauthorized') {
            navigate('/welcome');
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
