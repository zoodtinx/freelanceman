import { mockClients as mockClients } from "@mocks";
import type {
   Client,
   ClientSearchOption,
   NewClientPayload,
   ClientResponse,
} from "@types";

export const getClient = (idType: string, idValue: string): Promise<Client> => {
   if (!idType || !idValue) {
      return Promise.resolve(null); // Return null if no idType or idValue is provided
   }

   const client = mockClients.find((client) => {
      switch (idType) {
         case 'clientId':
            return client.id === idValue;
         case 'projectId':
            return client.projects?.some((project) => project.id === idValue);
         case 'taskId':
            return client.tasks?.some((task) => task.id === idValue);
         case 'eventId':
            return client.events?.some((event) => event.id === idValue);
         case 'contactId':
            return client.contacts?.some((contact) => contact.id === idValue);
         default:
            return false; // Return false if the idType is not recognized
      }
   });

   return new Promise((resolve) => {
      setTimeout(() => resolve(client), 500);
   });
};

export const getAllClients = (searchTerm: ClientSearchOption) => {
   return new Promise<Client[]>((resolve) => {
      setTimeout(() => {
         // Return all clients if no search term is provided
         if (!searchTerm || Object.keys(searchTerm).length === 0) {
            resolve(mockClients);
            return;
         }
         
         const filteredClients = mockClients.filter((client) => {
            const matchesName =
               !searchTerm.name || client.name.toLowerCase().includes(searchTerm.name.trim().toLowerCase());
         
            const matchesProjectCount =
               searchTerm.projectCount === undefined || client.projectCount === searchTerm.projectCount;
         
            const matchesContactCount =
               searchTerm.contactCount === undefined || client.contactCount === searchTerm.contactCount;
         
            const matchesActiveProjects =
               searchTerm.hasActiveProjects === undefined ||
               (searchTerm.hasActiveProjects ? client.activeProjectCount > 0 : true);
         
            return (
               matchesName &&
               matchesProjectCount &&
               matchesContactCount &&
               matchesActiveProjects
            );
         });         

         resolve(filteredClients);
      }, 500);
   });
};



export const editClient = (id: string, clientPayload: Partial<Client>) => {
   const client = mockClients.find((c) => c.id === id);

   if (!client) {
      return Promise.reject(new Error(`Client with id ${id} not found`));
   }

   Object.keys(clientPayload).forEach((key) => {
      if (key !== "id" && key in client) {
         client[key as keyof Client] = clientPayload[key as keyof Client];
      }
   });

   return Promise.resolve(client);
};

export const createClient = (newClient: NewClientPayload) => {
   const createdClient = {
      ...newClient,
      id: crypto.randomUUID(),
   };

   mockClients.push(createdClient);

   return Promise.resolve(createdClient);
};

export const deleteClient = (clientId: string) => {
   const index = mockClients.findIndex((client) => client.id === clientId);

   if (index !== -1) {
      mockClients.splice(index, 1);
   }

   return Promise.resolve(clientId);
};
