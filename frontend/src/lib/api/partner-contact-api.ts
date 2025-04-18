
import {
   getPartnerContacts,
   createPartnerContact,
   deletePartnerContact,
   editPartnerContact,
   getPartnerContact,
} from '@/lib/api/services/partner-contact-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { PartnerContactPayload } from 'freelanceman-common';

export const usePartnerContactApi = () => {
   return {
      createPartnerContact: useCreatePartnerContact(),
      deletePartnerContact: useDeletePartnerContact(),
      editPartnerContact: useEditPartnerContact(),
   };
};

export const usePartnerContactsQuery = (filter: PartnerContactPayload) => {
   return useAppQuery(['partnerContacts', filter], (token) =>
      getPartnerContacts(token, filter)
   );
};

export const usePartnerContactQuery = (contactId: string) => {
   return useAppQuery(['partnerContacts', contactId], (token) =>
      getPartnerContact(token, contactId)
   );
};

export const useCreatePartnerContact = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'createPartnerContact',
         invalidationKeys: ['partnerContacts'],
         mutationFn: createPartnerContact,
      },
      callbacks
   );
};

export const useEditPartnerContact = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'editPartnerContact',
         invalidationKeys: ['partnerContacts'],
         mutationFn: editPartnerContact,
      },
      callbacks
   );
};

export const useDeletePartnerContact = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deletePartnerContact',
         invalidationKeys: ['partnerContacts'],
         mutationFn: deletePartnerContact,
      },
      callbacks
   );
};
