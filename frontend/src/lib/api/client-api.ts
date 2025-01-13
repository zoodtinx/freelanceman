import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editClient,
   getClient,
   getAllClients,
   createClient,
   deleteClient,
} from './mock/mock-client-service';
import type { Client, ClientSearchOption, NewClientPayload } from '@types';

export const useAllClientsQuery = (searchTerm?: ClientSearchOption) => {
   return useQuery({
      queryKey: ['clients', searchTerm || null],
      queryFn: () => getAllClients(searchTerm || {}),
   });
};

export const useClientQuery = (clientId: string) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['clients', clientId],
      queryFn: () => {
         const cachedClients = queryClient.getQueryData<Client[]>(['clients']);
         const cachedClient = cachedClients?.find(
            (client) => client.id === clientId
         );
         return cachedClient ?? getClient(clientId);
      },
   });
};

export const useCreateClient = () => {
   const queryClient = useQueryClient();

   return useMutation<Client, Error, NewClientPayload>({
      mutationKey: ['createClient'],
      mutationFn: async (newClient: NewClientPayload) =>
         await createClient(newClient),
      onMutate: async (newClient: NewClientPayload) => {
         await queryClient.cancelQueries(['clients']);

         const previousClients = queryClient.getQueryData<Client[]>(['clients']);

         queryClient.setQueryData<Client[]>(['clients'], (old) => [
            ...(old || []),
            { ...newClient, id: 'temp-id' },
         ]);

         return { previousClients };
      },
      onError: (err, newClient, context: any) => {
         if (context?.previousClients) {
            queryClient.setQueryData(['clients'], context.previousClients);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
   });
};

export const useEditClient = (clientId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Client,
      Error,
      { key: keyof Client; value: Client[keyof Client] }
   >({
      mutationKey: ['editClient'],
      mutationFn: async (clientPayload: { key: keyof Client; value: Client[keyof Client] }) => {
         await editClient(clientId, clientPayload);
      },
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['clients']);

         const previousClients = queryClient.getQueryData<Client[]>(['clients']);

         if (previousClients) {
            queryClient.setQueryData(['clients'], (old) =>
               old?.map((client) =>
                  client.id === clientId ? { ...client, [key]: value } : client
               )
            );
         }

         return { previousClients };
      },
      onError: (err, variables, context) => {
         if (context?.previousClients) {
            queryClient.setQueryData(['clients'], context.previousClients);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['clients']);
      },
   });
};

export const useDeleteClient = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string>({
      mutationKey: ['deleteClient'],
      mutationFn: async (clientId: string) => {
         await deleteClient(clientId);
      },
      onMutate: async (clientId: string) => {
         await queryClient.cancelQueries(['clients']);

         const previousClients = queryClient.getQueryData<Client[]>(['clients']);

         if (previousClients) {
            queryClient.setQueryData<Client[]>(['clients'], (old) =>
               old?.filter((client) => client.id !== clientId)
            );
         }

         return { previousClients };
      },
      onError: (err, clientId, context: any) => {
         if (context?.previousClients) {
            queryClient.setQueryData(['clients'], context.previousClients);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['clients']);
      },
   });
};
