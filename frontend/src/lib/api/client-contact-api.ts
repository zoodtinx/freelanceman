import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   createContact as createClientContact,
   deleteContact as deleteClientClientContact,
   editContact as editClientContact,
   getAllContacts as getAllClientContact,
} from './mock/mock-contact-service';
import {
   ClientContact,
   ClientContactSearchOption,
   CreateClientContactDto,
   EditClientContactDto,
} from '@types';
import useAuthStore from '@/lib/zustand/auth-store';
import { getClientContacts, getClientContact } from '@/lib/api/services/client-contact-service';


export const useClientContactApi = () => {
   return {
      createClientContact: useCreateClientContact(),
      deleteClientContact: useDeleteClientContact(),
      editClientContact: useEditClientContact()
   }
}


export const useAllClientContactsQuery = (searchOptions: ClientContactSearchOption = {}) => {
   return useQuery({
      queryKey: ['clientContacts', searchOptions],
      queryFn: () => getAllClientContact(searchOptions),
   });
};


export const useClientContactsQuery = (searchOptions: ClientContactSearchOption = {}) => {
   const { accessToken } = useAuthStore();

   return useQuery({
      queryKey: ['clientContacts', searchOptions],
      queryFn: () => getClientContacts(accessToken, searchOptions),
   });
};

export const useClientContactQuery = (clientContactId: string) => {
   const { accessToken } = useAuthStore();

   return useQuery({
      queryKey: ['clientContacts', clientContactId],
      queryFn: () => getClientContact(accessToken, clientContactId),
   });
};


export const useCreateClientContact = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createClientContact'],
      mutationFn: async (newClientContact: CreateClientContactDto) => await createClientContact(newClientContact),
      onMutate: async (newClientContact: CreateClientContactDto) => {
         await queryClient.cancelQueries({ queryKey: ['clientContacts'] });
         const previousClientContacts = queryClient.getQueryData(['clientContacts']);

         queryClient.setQueryData(['clientContacts'], (old: ClientContact[]) => [
            ...(old || []),
            { ...newClientContact, id: 'temp-id' },
         ]);

         return { previousClientContacts };
      },
      onError: (err, newClientContact, context) => {
         console.log('New client contact ', newClientContact);
         console.log(err);
         if (context?.previousClientContacts) {
            queryClient.setQueryData(['clientContacts'], context.previousClientContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['clientContacts'] });
      },
   });
};


interface EditClientContactMutationPayload {
   clientContactId: string;
   clientContactPayload: EditClientContactDto;
}

export const useEditClientContact = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editClientContact'],
      mutationFn: async ({ clientContactId, clientContactPayload }: EditClientContactMutationPayload) => {
         await editClientContact(clientContactId, clientContactPayload);
      },
      onMutate: async ({ clientContactId, clientContactPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['clientContacts'] });
         const previousClientContacts = queryClient.getQueryData(['clientContacts']);

         if (previousClientContacts) {
            queryClient.setQueryData(['clientContacts'], (old: ClientContact[]) =>
               old?.map((clientContact) => (clientContact.id === clientContactId ? clientContactPayload : clientContact))
            );
         }

         return { previousClientContacts };
      },
      onError: (err, newClientContactPayload, context) => {
         console.log('New client contact ', newClientContactPayload);
         console.log(err);
         if (context?.previousClientContacts) {
            queryClient.setQueryData(['clientContacts'], context.previousClientContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['clientContacts'] });
      },
   });
};


export const useDeleteClientContact = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteClientContact'],
      mutationFn: async (clientContactId: string) => {
         await deleteClientContact(clientContactId);
      },
      onMutate: async (clientContactId: string) => {
         await queryClient.cancelQueries({ queryKey: ['clientContacts'] });
         const previousClientContacts = queryClient.getQueryData(['clientContacts']);

         if (previousClientContacts) {
            queryClient.setQueryData(['clientContacts'], (old: ClientContact[]) =>
               old?.filter((clientContact) => clientContact.id !== clientContactId)
            );
         }

         return { previousClientContacts };
      },
      onError: (err, clientContactIds, context) => {
         console.log('Client contact deleting ', clientContactIds);
         console.log(err);
         if (context?.previousClientContacts) {
            queryClient.setQueryData(['clientContacts'], context.previousClientContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['clientContacts'] });
      },
   });
};
