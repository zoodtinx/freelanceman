

export interface ClientResponse {
   id: string,
   name: string  
}


export interface  Client  {
   name: string;
   id: string;
   contactCount: number;
   projectCount: number;
   activeProjectCount: number;
   accentColor: string; // Assuming this is a hex color string
};
