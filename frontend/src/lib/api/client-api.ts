import {
   createClient,
   deleteClient,
   editClient,
   getClient,
   getClients,
   getClientSelections,
} from './services/client-service';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { ClientFilterDto } from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   CreateClientDto,
   EditClientDto,
} from 'freelanceman-common/src/schemas';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';

export const useClientSelectionQuery = (filter: ClientFilterDto = {}) => {
   return useAppQuery(['clientSelections', filter], (token) =>
      getClientSelections(token, filter)
   );
};

export const useClientsQuery = (filter: ClientFilterDto = {}) => {
   return useAppQuery(['clients', filter], (token) =>
      getClients(token, filter)
   );
};

export const useClientQuery = (clientId: string) => {
   return useAppQuery(['client', clientId], (token) =>
      getClient(token, clientId)
   );
};

export const useCreateClient = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreateClientDto) =>
         createClient(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['clients', 'client'],
      }),
   });
};

export const useEditClient = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditClientDto) => editClient(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['client'],
      }),
   });
};

export const useDeleteClient = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (deletedClientId: string) =>
         deleteClient(accessToken, deletedClientId),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['clients'],
      }),
   });
};
