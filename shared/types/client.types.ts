export interface ClientResponse {
   id: string;
   name: string;
}

export interface Client {
   name: string;
   id: string;
   contactCount: number;
   projectCount: number;
   activeProjectCount: number;
   taxId: string;
   phoneNumber: string;
   address: string;
   office: string;
   detail: string;
   accentColor: string; // Assuming this is a hex color string
}

export type ClientSearchOption = Partial<
   Pick<Client, "name" | "projectCount" | "contactCount"> & {
      hasActiveProjects: boolean; // New flag for filtering active projects
   }
>;


export interface NewClientPayload {
   name: string;
   contactCount: number;
   projectCount: number;
   activeProjectCount: number;
   accentColor: string;
}

