import {
   editClient,
   getClient,
   createClient,
   deleteClient,
   getClients,
   getClientSelections,
} from './services/client-service';
import { ClientFilterDto } from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';

export const useClientApi = () => {
   return {
      createClient: useCreateClient(),
      deleteClient: useDeleteClient(),
      editClient: useEditClient(),
   };
};

export const useClientsQuery = (filter: ClientFilterDto = {}) => {
   return useAppQuery(['clients', filter], (token) =>
      getClients(token, filter)
   );
};

export const useClientQuery = (clientId: string) => {
   return useAppQuery(['clients', clientId], (token) =>
      getClient(token, clientId)
   );
};

export const useClientSelectionsQuery = (filter: ClientFilterDto) => {
   return useAppQuery(['clientSelections', filter], (token) =>
      getClientSelections(token, filter)
   );
}

// export const useProjectSelectionQuery = (filter: ProjectFilterDto = {}) => {
//    return useAppQuery(['projectSelections', filter], (token) =>
//       getProjectSelections(token, filter)
//    );
// };

export const useCreateClient = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'createClient',
         invalidationKeys: ['clients'],
         mutationFn: createClient,
      },
      callbacks
   );
};

export const useEditClient = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'editClient',
         invalidationKeys: ['clients'],
         mutationFn: editClient,
      },
      callbacks
   );
};

export const useDeleteClient = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deleteClient',
         invalidationKeys: ['clients'],
         mutationFn: deleteClient,
      },
      callbacks
   );
};
