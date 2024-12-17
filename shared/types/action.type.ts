export interface NewActionPayload<TStatus = string> {
   id: string;
   name: string;
   status: string; // Generic status type
   details: string;
   link: string;
   dueDate: string;
   projectId: string;
}


export interface ActionFormData<TStatus = string> extends NewActionPayload<TStatus> {
   project: string;
   client: string;
   clientId: string;
}

export interface ActionResponsePayload<TStatus = string> {
   id: string;
   name: string;
   status: TStatus;
   details: string;
   link: string;
   createdAt: string;
   dueDate: string;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
}