import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editPartnerContact,
   getPartnerContact,
   getAllPartnerContacts,
   createPartnerContact,
   deletePartnerContact,
} from './mock/mock-partner-contact-service';
import type { PartnerContact, PartnerContactSearchOption, NewPartnerContactPayload } from '@types';

export const useAllPartnerContactsQuery = (searchTerm: PartnerContactSearchOption) => {
   return useQuery({
      queryKey: ['partnerContacts', searchTerm],
      queryFn: () => getAllPartnerContacts(searchTerm),
   });
};

export const usePartnerContactQuery = (partnerContactId: string) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['partnerContacts', partnerContactId],
      queryFn: () => {
         const cachedPartnerContacts = queryClient.getQueryData<PartnerContact[]>(['partnerContacts']);
         const cachedPartnerContact = cachedPartnerContacts?.find(
            (partnerContact) => partnerContact.id === partnerContactId
         );
         return cachedPartnerContact ?? getPartnerContact(partnerContactId);
      },
   });
};

export const useCreatePartnerContact = () => {
   const queryClient = useQueryClient();

   return useMutation<PartnerContact, Error, NewPartnerContactPayload>({
      mutationKey: ['createPartnerContact'],
      mutationFn: async (newPartnerContact: NewPartnerContactPayload) =>
         await createPartnerContact(newPartnerContact),
      onMutate: async (newPartnerContact: NewPartnerContactPayload) => {
         await queryClient.cancelQueries(['partnerContacts']);

         const previousPartnerContacts = queryClient.getQueryData<PartnerContact[]>(['partnerContacts']);

         queryClient.setQueryData<PartnerContact[]>(['partnerContacts'], (old) => [
            ...(old || []),
            { ...newPartnerContact, id: 'temp-id' },
         ]);

         return { previousPartnerContacts };
      },
      onError: (err, newPartnerContact, context: any) => {
         if (context?.previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], context.previousPartnerContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['partnerContacts'] });
      },
   });
};

export const useEditPartnerContact = (partnerContactId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      PartnerContact,
      Error,
      { key: keyof PartnerContact; value: PartnerContact[keyof PartnerContact] }
   >({
      mutationKey: ['editPartnerContact'],
      mutationFn: async (partnerContactPayload: { key: keyof PartnerContact; value: PartnerContact[keyof PartnerContact] }) => {
         await editPartnerContact(partnerContactId, partnerContactPayload);
      },
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['partnerContacts']);

         const previousPartnerContacts = queryClient.getQueryData<PartnerContact[]>(['partnerContacts']);

         if (previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], (old) =>
               old?.map((partnerContact) =>
                  partnerContact.id === partnerContactId ? { ...partnerContact, [key]: value } : partnerContact
               )
            );
         }

         return { previousPartnerContacts };
      },
      onError: (err, variables, context) => {
         if (context?.previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], context.previousPartnerContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['partnerContacts']);
      },
   });
};

export const useDeletePartnerContact = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string>({
      mutationKey: ['deletePartnerContact'],
      mutationFn: async (partnerContactId: string) => {
         await deletePartnerContact(partnerContactId);
      },
      onMutate: async (partnerContactId: string) => {
         await queryClient.cancelQueries(['partnerContacts']);

         const previousPartnerContacts = queryClient.getQueryData<PartnerContact[]>(['partnerContacts']);

         if (previousPartnerContacts) {
            queryClient.setQueryData<PartnerContact[]>(['partnerContacts'], (old) =>
               old?.filter((partnerContact) => partnerContact.id !== partnerContactId)
            );
         }

         return { previousPartnerContacts };
      },
      onError: (err, partnerContactId, context: any) => {
         if (context?.previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], context.previousPartnerContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['partnerContacts']);
      },
   });
};
