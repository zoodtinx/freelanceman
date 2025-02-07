
export interface Contact {
   id: string;
   name: string;
   company: string;
   companyId: string;
   role: string;
   phoneNumber: string[];
   email: string[];
   details: string;
   avatar: string;
}

export type ContactSearchOption = Partial<
   Pick<Contact, "name" | "companyId" | "email" | "phoneNumber" | "id">
>;

export interface CreateContactDto {
   name: string;
   companyId: string;
   role?: string;
   phoneNumber?: string[];
   email?: string[];
   detail?: string;
   avatar?: string;
}

export type EditContactDto = Partial<
   Pick<
      Contact,
      "name" | "role" | "phoneNumber" | "email" | "details" | "avatar"
   >
>;
