export interface PartnerContact {
   id: string;
   name: string;
   company: string;
   companyId: string;
   role: string;
   phoneNumber: string[];
   email: string;
   details: string;
   avatar: string;
   dateCreated: string;
   dateModified: string;
}

export type PartnerContactSearchOption = Partial<
   Pick<PartnerContact, "name" | "companyId" | "email" | "phoneNumber" | "id" | "role">
>;

export interface CreatePartnerContactDto {
   name: string;
   role: string;
   companyId?: string;
   phoneNumber?: string[];
   email?: string[];
   details?: string;
   avatar?: string;
}

export type EditPartnerContactDto = Partial<
   Pick<
      PartnerContact,
      "name" | "role" | "phoneNumber" | "email" | "details" | "avatar"
   >
>;
