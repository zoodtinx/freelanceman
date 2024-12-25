import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editContact,
   getContact,
   getAllContacts,
   createContact,
   deleteContact,
} from './mock/mock-contact-service';
import type { Contact, ContactSearchOption, NewContactPayload } from '@types';

export const useAllContactsQuery = (searchTerm : ContactSearchOption) => {
   return useQuery({
      queryKey: ['contacts', searchTerm],
      queryFn: () => getAllContacts(searchTerm),
   });
};

export const useContactQuery = (contactId: string) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['contacts', contactId],
      queryFn: () => {
         const cachedContacts = queryClient.getQueryData<Contact[]>(['contacts']);
         const cachedContact = cachedContacts?.find(
            (contact) => contact.id === contactId
         );
         return cachedContact ?? getContact(contactId);
      },
   });
};

export const useCreateContact = () => {
   const queryClient = useQueryClient();

   return useMutation<Contact, Error, NewContactPayload>({
      mutationKey: ['createContact'],
      mutationFn: async (newContact: NewContactPayload) =>
         await createContact(newContact),
      onMutate: async (newContact: NewContactPayload) => {
         await queryClient.cancelQueries(['contacts']);

         const previousContacts = queryClient.getQueryData<Contact[]>(['contacts']);

         queryClient.setQueryData<Contact[]>(['contacts'], (old) => [
            ...(old || []),
            { ...newContact, id: 'temp-id' },
         ]);

         return { previousContacts };
      },
      onError: (err, newContact, context: any) => {
         if (context?.previousContacts) {
            queryClient.setQueryData(['contacts'], context.previousContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['contacts'] });
      },
   });
};

export const useEditContact = (contactId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Contact,
      Error,
      { key: keyof Contact; value: Contact[keyof Contact] }
   >({
      mutationKey: ['editContact'],
      mutationFn: async (contactPayload: { key: keyof Contact; value: Contact[keyof Contact] }) => {
         await editContact(contactId, contactPayload);
      },
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['contacts']);

         const previousContacts = queryClient.getQueryData<Contact[]>(['contacts']);

         if (previousContacts) {
            queryClient.setQueryData(['contacts'], (old) =>
               old?.map((contact) =>
                  contact.id === contactId ? { ...contact, [key]: value } : contact
               )
            );
         }

         return { previousContacts };
      },
      onError: (err, variables, context) => {
         if (context?.previousContacts) {
            queryClient.setQueryData(['contacts'], context.previousContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['contacts']);
      },
   });
};

export const useDeleteContact = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string>({
      mutationKey: ['deleteContact'],
      mutationFn: async (contactId: string) => {
         await deleteContact(contactId);
      },
      onMutate: async (contactId: string) => {
         await queryClient.cancelQueries(['contacts']);

         const previousContacts = queryClient.getQueryData<Contact[]>(['contacts']);

         if (previousContacts) {
            queryClient.setQueryData<Contact[]>(['contacts'], (old) =>
               old?.filter((contact) => contact.id !== contactId)
            );
         }

         return { previousContacts };
      },
      onError: (err, contactId, context: any) => {
         if (context?.previousContacts) {
            queryClient.setQueryData(['contacts'], context.previousContacts);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['contacts']);
      },
   });
};
