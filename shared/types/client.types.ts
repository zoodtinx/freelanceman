
export interface Client {
   name: string;
   id: string;
   contactCount: number;
   projectCount: number;
   activeProjectCount: number;
   taxId: string;
   email: string;
   phoneNumber: string;
   address: string;
   detail: string;
   themeColor: string; 
}

export interface ClientSearchOption {
   name: string,
   clientId: string,
   projectId: string,
   taskId: string,
   eventId: string,
   withActiveProject: boolean
}

export interface CreateClientDto {
   name: string;
   taxId: string;
   email: string;
   phoneNumber: string;
   address: string;
   detail: string;
   contact?: string[];
}

export type EditClientDto = Partial<
   Pick<
      Client,
      | "name"
      | "taxId"
      | "email"
      | "phoneNumber"
      | "address"
      | "detail"
      | "themeColor"
   >
>;