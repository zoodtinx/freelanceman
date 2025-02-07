export interface Partner {
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

export type PartnerSearchOption = Partial<
   Pick<Partner, "name" | "companyId" | "email" | "phoneNumber" | "id" | "role">
>;

export interface CreatePartnerDto {
   name: string;
   role: string;
   companyId?: string;
   phoneNumber?: string[];
   email?: string[];
   details?: string;
   avatar?: string;
}

export type EditPartnerDto = Partial<
   Pick<
      Partner,
      "name" | "role" | "phoneNumber" | "email" | "details" | "avatar"
   >
>;
