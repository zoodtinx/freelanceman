import { mockContacts } from "src/lib/api/mock/mock-data";

export const getContact = (id: string) => {
   const contact = mockContacts.find((contact) => contact.id === id);

   return new Promise((resolve) => {
      setTimeout(() => resolve(contact), 500);
   });
};

export const getAllContacts = (searchTerm: ContactSearchOption): Contact[] => {
   return new Promise((resolve) => {
      setTimeout(() => {
         // Return all contacts if no search terms are provided or name is an empty string
         if (
            !searchTerm ||
            Object.keys(searchTerm).length === 0 ||
            (searchTerm.name === '' && !searchTerm.companyId && !searchTerm.type)
         ) {
            resolve(mockContacts);
            return;
         }

         const filteredContacts = mockContacts.filter((contact) => {
            const matchesName =
               searchTerm.name &&
               searchTerm.name.trim() !== '' &&
               contact.name.toLowerCase().includes(searchTerm.name.toLowerCase());
            const matchesClientId =
               searchTerm.companyId !== undefined && contact.companyId === searchTerm.companyId;
            const matchesType = searchTerm.type && contact.type === searchTerm.type;

            return matchesName || matchesClientId || matchesType;
         });

         resolve(filteredContacts);
      }, 500);
   });
};


export const editContact = (id: string, contactPayload: Partial<Contact>) => {
   console.log('id', id);
   console.log('contactPayload', contactPayload);

   const contact = mockContacts.find((c) => c.id === id);

   if (!contact) {
      return Promise.reject(new Error(`Contact with id ${id} not found`));
   }

   Object.keys(contactPayload).forEach((key) => {
      if (key !== "id" && key in contact) {
         contact[key as keyof Contact] = contactPayload[key as keyof Contact];
      }
   });

   return Promise.resolve(contact);
};

export const createContact = (newContact: NewContactPayload) => {
   const createdContact = {
      ...newContact,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      id: crypto.randomUUID(),
   };

   mockContacts.push(createdContact);

   return Promise.resolve(createdContact);
};

export const deleteContact = (contactId: string) => {
   const index = mockContacts.findIndex((contact) => contact.id === contactId);

   if (index !== -1) {
      mockContacts.splice(index, 1);
   }

   return Promise.resolve(contactId);
};
