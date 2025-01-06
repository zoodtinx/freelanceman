
export interface Contact {
   id: string,
   name: string,
   company:  string,
   companyId: string,
   type: 'client-contact' | 'partner-contact'
   role: string,
   phoneNumber: string[],
   email: string[],
   details: string,
   avatar:string,
   dateCreated: string,
   dateModified: string,
}

export type NewContactPayload = Omit<Contact, 'id' | 'dateCreated' | 'dateModified'>;

export type ContactSearchOption = Partial<Pick<Contact, 'name' | 'companyId' | 'type' | 'role'>>;
