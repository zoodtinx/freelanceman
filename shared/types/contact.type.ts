
export interface Contact {
   id: string,
   name: string,
   client:  string,
   clientId: string,
   type: 'client' | 'partner'
   role: string,
   phoneNumber: string[],
   email: string[],
   details: string,
   avatar:string,
   dateCreated: string,
   dateModified: string,
}

export type NewContactPayload = Omit<Contact, 'id' | 'dateCreated' | 'dateModified'>;