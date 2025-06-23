import {
   getUser,
   editUser,
   deleteUser,
   setVisited,
} from '@/lib/api/services/user-service';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';

export const useUserQuery = (enable?: boolean) => {
   return useAppQuery(['user'], (token) => getUser(token), enable);
};

export const useEditUser = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: any) => editUser(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['user'],
      }),
   });
};

export const useDeleteUser = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (_: void) => deleteUser(accessToken),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['user'],
      }),
   });
};

export const useSetVisited = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (page: string) => setVisited(accessToken, page),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['user'],
      }),
   });
};
