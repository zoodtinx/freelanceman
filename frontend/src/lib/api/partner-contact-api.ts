import {
   createPartnerContact,
   deletePartnerContact,
   editPartnerContact,
   getPartnerContact,
   getPartnerContacts,
} from './services/partner-contact-service';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { PartnerContactFilterDto } from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   CreatePartnerContactDto,
   EditPartnerContactDto,
} from 'freelanceman-common/src/schemas';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';

export const usePartnerContactsQuery = (
   filter: PartnerContactFilterDto = {},
   enable?: boolean
) => {
   return useAppQuery(
      ['partnerContacts', filter],
      (token) => getPartnerContacts(token, filter),
      enable
   );
};

export const usePartnerContactQuery = (
   partnerContactId: string,
   enable?: boolean
) => {
   return useAppQuery(
      ['partnerContact', partnerContactId],
      (token) => getPartnerContact(token, partnerContactId),
      enable
   );
};

export const useCreatePartnerContact = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreatePartnerContactDto) =>
         createPartnerContact(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['partnerContacts'],
      }),
   });
};

export const useEditPartnerContact = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditPartnerContactDto) =>
         editPartnerContact(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['partnerContacts', 'partnerContact'],
      }),
   });
};

export const useDeletePartnerContact = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (deletedPartnerContactId: string) =>
         deletePartnerContact(accessToken, deletedPartnerContactId),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['partnerContacts'],
      }),
   });
};
