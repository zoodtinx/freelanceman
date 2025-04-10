import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editClient,
   getClient,
   getAllClients,
   createClient,
   deleteClient,
} from './mock/mock-client-service';
import type { CreateClientDto, EditClientDto, Client, ClientSearchOption } from '@types';
import useAuthStore from '@/lib/zustand/auth-store';
import { getClients } from '@/lib/api/services/client-service';


export const useClientApi = () => {
   return {
      createClient: useCreateClient(),
      deleteClient: useDeleteClient(),
      editClient: useEditClient()
   }
}


export const useAllClientsQuery = (searchOptions: ClientSearchOption = {}) => {
   return useQuery({
      queryKey: ['clients', searchOptions],
      queryFn: () => getAllClients(searchOptions),
   });
};


export const useClientsQuery = (searchOptions: ClientSearchOption = {}) => {
   const { accessToken } = useAuthStore();

   return useQuery({
   queryKey: ['clients', searchOptions],
      queryFn: () => getClients(accessToken, searchOptions),
   });
};

export const useClientSelectionQuery = (searchOptions: ClientSearchOption = {}) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['clientSelection', JSON.stringify(searchOptions)], 
      queryFn: async () => {
         const cachedClients = queryClient.getQueryData<Client[]>(['clients', JSON.stringify(searchOptions)]);
         
         if (cachedClients) {
            return cachedClients.map(client => ({
               value: client.id, 
               label: client.name 
            }));
         }

         const clients = await getAllClients(searchOptions);
         return clients.map(client => ({
            value: client.id, 
            label: client.name 
         }));
      },
   });
};

export const useClientQuery = (idType: string, idValue: string) => {
   return useQuery<Client, Error, Client>({
      queryKey: ['clients', idType, idValue],
      queryFn: () => getClient(idType, idValue),
   });
};


export const useCreateClient = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createClient'],
      mutationFn: async (newClient: CreateClientDto) => await createClient(newClient),
      onMutate: async (newClient: CreateClientDto) => {
         await queryClient.cancelQueries({ queryKey: ['clients'] });
         const previousClients = queryClient.getQueryData(['clients']);

         queryClient.setQueryData(['clients'], (old: Client[]) => [
            ...(old || []),
            { ...newClient, id: 'temp-id' },
         ]);

         return { previousClients };
      },
      onError: (err, newClient, context) => {
         console.log('New client ', newClient);
         console.log(err);
         if (context?.previousClients) {
            queryClient.setQueryData(['clients'], context.previousClients);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
   });
};


interface EditClientMutationPayload {
   clientId: string;
   clientPayload: EditClientDto;
}

export const useEditClient = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editClient'],
      mutationFn: async ({ clientId, clientPayload }: EditClientMutationPayload) => {
         await editClient(clientId, clientPayload);
      },
      onMutate: async ({ clientId, clientPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['clients'] });
         const previousClients = queryClient.getQueryData(['clients']);

         if (previousClients) {
            queryClient.setQueryData(['clients'], (old: Client[]) =>
               old?.map((client) => (client.id === clientId ? clientPayload : client))
            );
         }

         return { previousClients };
      },
      onError: (err, newClientPayload, context) => {
         console.log('New client ', newClientPayload);
         console.log(err);
         if (context?.previousClients) {
            queryClient.setQueryData(['clients'], context.previousClients);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
   });
};


export const useDeleteClient = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteClient'],
      mutationFn: async (clientId: string) => {
         await deleteClient(clientId);
      },
      onMutate: async (clientId: string) => {
         await queryClient.cancelQueries({ queryKey: ['clients'] });
         const previousClients = queryClient.getQueryData(['clients']);

         if (previousClients) {
            queryClient.setQueryData(['clients'], (old: Client[]) =>
               old?.filter((client) => client.id !== clientId)
            );
         }

         return { previousClients };
      },
      onError: (err, clientIds, context) => {
         console.log('Client deleting ', clientIds);
         console.log(err);
         if (context?.previousClients) {
            queryClient.setQueryData(['clients'], context.previousClients);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
   });
};
