import { mockAllClients } from '@mocks';

export const getClientInfo = (clientId: string) => {
   return new Promise((resolve, reject) => {
      const matchedClient = mockAllClients.find(
         (client) => client.id === clientId
      );

      setTimeout(() => {
         if (matchedClient) {
            resolve(matchedClient);
         } else {
            reject(new Error(`Client with ID ${clientId} not found.`));
         }
      }, 100);
   });
};
