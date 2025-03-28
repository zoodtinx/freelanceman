export interface ClientContact {
   id: string;
   name: string;
   company: string;
   companyId: string;
   role: string;
   phoneNumber: string[];
   email: string;
   details: string;
   avatar: string;
   type: 'client-contact' | 'partner-contact'
}

export type ClientContactSearchOption = Partial<
   Pick<ClientContact, "name" | "companyId" | "email" | "phoneNumber" | "id">
>;

export interface CreateClientContactDto {
   name: string;
   companyId: string;
   role?: string;
   phoneNumber?: string[];
   email?: string[];
   detail?: string;
   avatar?: string;
}

export type EditClientContactDto = Partial<
   Pick<
      ClientContact,
      "name" | "role" | "phoneNumber" | "email" | "details" | "avatar"
   >
>;