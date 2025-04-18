import useAuthStore from '@/lib/zustand/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface MutationHandler {
   mutationKey: string;
   invalidationKeys: string[];
   mutationFn: (token: string, payload: any) => Promise<any>;
}

interface MutationCallbacks {
   errorCallback?: (err: Error) => void;
   successCallback?: () => void;
}

export const useAppMutation = <T>(
   { mutationKey, invalidationKey, mutationFn }: MutationHandler,
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
      onError: (err: Error) => {
         if (err.message === 'Unauthorized') {
            navigate('/login');
         } else {
            errorCallback && errorCallback(err);
         }
      },
      onSettled: () => {
         invalidationKey.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: [key] });
         });
      },
   });
};
