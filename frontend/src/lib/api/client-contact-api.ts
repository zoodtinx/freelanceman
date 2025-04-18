import {
   getClientContacts,
   getClientContact,
   createClientContact,
   deleteClientContact,
   editClientContact,
} from '@/lib/api/services/client-contact-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';

export const useClientContactApi = () => {
   return {
      createClientContact: useCreateClientContact(),
      deleteClientContact: useDeleteClientContact(),
      editClientContact: useEditClientContact(),
   };
};

export const useClientContactsQuery = (clientId: string) => {
   return useAppQuery(['clientContacts', clientId], (token) =>
      getClientContacts(token, clientId)
   );
};

export const useClientContactQuery = (contactId: string) => {
   return useAppQuery(['clientContacts', contactId], (token) =>
      getClientContact(token, contactId)
   );
};

export const useCreateClientContact = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'createClientContact',
         invalidationKeys: ['clientContacts'],
         mutationFn: createClientContact,
      },
      callbacks
   );
};

export const useEditClientContact = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'editClientContact',
         invalidationKeys: ['clientContacts'],
         mutationFn: editClientContact,
      },
      callbacks
   );
};

export const useDeleteClientContact = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deleteClientContact',
         invalidationKeys: ['clientContacts'],
         mutationFn: deleteClientContact,
      },
      callbacks
   );
};
