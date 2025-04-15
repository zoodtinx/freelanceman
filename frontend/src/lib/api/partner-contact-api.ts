import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editPartnerContact,
   getPartnerContact,
   getAllPartnerContacts,
   createPartnerContact,
   deletePartnerContact,
} from './mock/mock-partner-contact-service';
import useAuthStore from '@/lib/zustand/auth-store';
import { getPartnerContacts } from '@/lib/api/services/partner-contact-service';


export const usePartnerContactApi = () => {
   return {
      createPartnerContact: useCreatePartnerContact(),
      deletePartnerContact: useDeletePartnerContact(),
      editPartnerContact: useEditPartnerContact()
   }
}


export const useAllPartnerContactsQuery = (searchOptions: PartnerContactSearchOption = {}) => {
   return useQuery({
      queryKey: ['partnerContacts', searchOptions],
      queryFn: () => getAllPartnerContacts(searchOptions),
   });
};


export const usePartnerContactsQuery = (searchOptions: PartnerContactSearchOption = {}) => {
   const { accessToken } = useAuthStore();
   
   return useQuery({
      queryKey: ['partnerContacts', searchOptions],
      queryFn: () => getPartnerContacts(accessToken, searchOptions),
   });
};


export const usePartnerContactQuery = (partnerContactId: string) => {
   return useQuery<PartnerContact, Error, PartnerContact>({
      queryKey: ['partnerContacts', partnerContactId],
      queryFn: () => getPartnerContact(partnerContactId),
   });
};


export const useCreatePartnerContact = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createPartnerContact'],
      mutationFn: async (newPartnerContact: CreatePartnerContactDto) => await createPartnerContact(newPartnerContact),
      onMutate: async (newPartnerContact: CreatePartnerContactDto) => {
         await queryClient.cancelQueries({ queryKey: ['partnerContacts'] });
         const previousPartnerContacts = queryClient.getQueryData(['partnerContacts']);

         queryClient.setQueryData(['partnerContacts'], (old: PartnerContact[]) => [
            ...(old || []),
            { ...newPartnerContact, id: 'temp-id' },
         ]);

         return { previousPartnerContacts };
      },
      onError: (err, newPartnerContact, context) => {
         console.log('New partner contact ', newPartnerContact);
         console.log(err);
         if (context?.previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], context.previousPartnerContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['partnerContacts'] });
      },
   });
};


interface EditPartnerContactMutationPayload {
   partnerContactId: string;
   partnerContactPayload: EditPartnerContactDto;
}

export const useEditPartnerContact = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editPartnerContact'],
      mutationFn: async ({ partnerContactId, partnerContactPayload }: EditPartnerContactMutationPayload) => {
         await editPartnerContact(partnerContactId, partnerContactPayload);
      },
      onMutate: async ({ partnerContactId, partnerContactPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['partnerContacts'] });
         const previousPartnerContacts = queryClient.getQueryData(['partnerContacts']);

         if (previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], (old: PartnerContact[]) =>
               old?.map((partnerContact) => (partnerContact.id === partnerContactId ? partnerContactPayload : partnerContact))
            );
         }

         return { previousPartnerContacts };
      },
      onError: (err, newPartnerContactPayload, context) => {
         console.log('New partner contact ', newPartnerContactPayload);
         console.log(err);
         if (context?.previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], context.previousPartnerContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['partnerContacts'] });
      },
   });
};


export const useDeletePartnerContact = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deletePartnerContact'],
      mutationFn: async (partnerContactId: string) => {
         await deletePartnerContact(partnerContactId);
      },
      onMutate: async (partnerContactId: string) => {
         await queryClient.cancelQueries({ queryKey: ['partnerContacts'] });
         const previousPartnerContacts = queryClient.getQueryData(['partnerContacts']);

         if (previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], (old: PartnerContact[]) =>
               old?.filter((partnerContact) => partnerContact.id !== partnerContactId)
            );
         }

         return { previousPartnerContacts };
      },
      onError: (err, partnerContactIds, context) => {
         console.log('Partner contact deleting ', partnerContactIds);
         console.log(err);
         if (context?.previousPartnerContacts) {
            queryClient.setQueryData(['partnerContacts'], context.previousPartnerContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['partnerContacts'] });
      },
   });
};
