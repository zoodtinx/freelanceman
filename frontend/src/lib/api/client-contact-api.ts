import {
   createClientContact,
   deleteClientContact,
   editClientContact,
   getClientContact,
   getClientContacts,
} from './services/client-contact-service';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { ClientContactFilterDto } from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   CreateClientContactDto,
   EditClientContactDto,
} from 'freelanceman-common/src/schemas';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';

export const useClientContactsQuery = (
   filter: ClientContactFilterDto = {},
   enable?: boolean
) => {
   return useAppQuery(
      ['clientContacts', filter],
      (token) => getClientContacts(token, filter),
      enable
   );
};

export const useClientContactQuery = (
   clientContactId: string,
   enable?: boolean
) => {
   return useAppQuery(
      ['clientContact', clientContactId],
      (token) => getClientContact(token, clientContactId),
      enable
   );
};

export const useCreateClientContact = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreateClientContactDto) =>
         createClientContact(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['clientContacts'],
      }),
   });
};

export const useEditClientContact = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditClientContactDto) =>
         editClientContact(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['clientContacts', 'clientContact'],
      }),
   });
};

export const useDeleteClientContact = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (deletedClientContactId: string) =>
         deleteClientContact(accessToken, deletedClientContactId),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['clientContacts'],
      }),
   });
};
