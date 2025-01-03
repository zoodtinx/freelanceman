export interface PartnerContact {
   id: string;
   name: string;
   company: string;
   companyId: string;
   profession: string;
   phoneNumber: string[];
   email: string[];
   details: string;
   avatar: string;
   dateCreated: string;
   dateModified: string;
}

export type NewPartnerContactPayload = Omit<
   PartnerContact,
   "id" | "dateCreated" | "dateModified"
>;

export type PartnerContactSearchOption = Partial<
   Pick<PartnerContact, "name" | "companyId" | "profession">
>;
