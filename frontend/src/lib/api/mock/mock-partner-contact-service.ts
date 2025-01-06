import { mockPartnerContacts } from "@mocks";
import type {
   PartnerContact,
   PartnerContactSearchOption,
   NewPartnerContactPayload,
} from "@types";

export const getPartnerContact = (id: string) => {
   const partnerContact = mockPartnerContacts.find((contact) => contact.id === id);

   return new Promise((resolve) => {
      setTimeout(() => resolve(partnerContact), 500);
   });
};

export const getAllPartnerContacts = (searchTerm: PartnerContactSearchOption) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         
         if (
            !searchTerm ||
            Object.keys(searchTerm).length === 0 ||
            (searchTerm.name?.trim() === "" &&
             !searchTerm.companyId &&
             searchTerm.type?.trim() === "" &&
             searchTerm.role?.trim() === "" &&
             searchTerm.company?.trim() === "")
         ) {
            resolve(mockPartnerContacts);
            return;
         }

         const filteredPartnerContacts = mockPartnerContacts.filter((contact) => {
            const matchesName =
               !searchTerm.name || searchTerm.name.trim() === "" || 
               contact.name.toLowerCase().includes(searchTerm.name.toLowerCase());

            const matchesCompanyId =
               searchTerm.companyId === undefined || contact.companyId === searchTerm.companyId;

            const matchesType =
               !searchTerm.type || searchTerm.type.trim() === "" || 
               contact.type === searchTerm.type;

            const matchesRole =
               !searchTerm.role || searchTerm.role.trim() === "" || 
               contact.role.toLowerCase().includes(searchTerm.role.toLowerCase());

            const matchesCompany =
               !searchTerm.company || searchTerm.company.trim() === "" || 
               contact.company.toLowerCase().includes(searchTerm.company.toLowerCase());

            return matchesName && matchesCompanyId && matchesType && matchesRole && matchesCompany;
         });

         resolve(filteredPartnerContacts);
      }, 500);
   });
};



export const editPartnerContact = (
   id: string,
   partnerContactPayload: Partial<PartnerContact>
) => {
   console.log("id", id);
   console.log("partnerContactPayload", partnerContactPayload);

   const partnerContact = mockPartnerContacts.find((c) => c.id === id);

   if (!partnerContact) {
      return Promise.reject(new Error(`PartnerContact with id ${id} not found`));
   }

   Object.keys(partnerContactPayload).forEach((key) => {
      if (key !== "id" && key in partnerContact) {
         partnerContact[key as keyof PartnerContact] =
            partnerContactPayload[key as keyof PartnerContact];
      }
   });

   return Promise.resolve(partnerContact);
};

export const createPartnerContact = (newPartnerContact: NewPartnerContactPayload) => {
   const createdPartnerContact = {
      ...newPartnerContact,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      id: crypto.randomUUID(),
   };

   mockPartnerContacts.push(createdPartnerContact);

   return Promise.resolve(createdPartnerContact);
};

export const deletePartnerContact = (partnerContactId: string) => {
   const index = mockPartnerContacts.findIndex((contact) => contact.id === partnerContactId);

   if (index !== -1) {
      mockPartnerContacts.splice(index, 1);
   }

   return Promise.resolve(partnerContactId);
};
