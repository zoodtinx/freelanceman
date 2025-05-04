import { UseMutationResult } from '@tanstack/react-query';

type CrudOperation = UseMutationResult<any, any, any>;

export interface CrudApi {
   task: {
      createTask: CrudOperation;
      editTask: CrudOperation;
      deleteTask: CrudOperation;
   };
   event: {
      createEvent: CrudOperation;
      editEvent: CrudOperation;
      deleteEvent: CrudOperation;
   };
   file: {
      createFile: CrudOperation;
      editFile: CrudOperation;
      deleteFile: CrudOperation;
   };
   client: {
      createClient: CrudOperation;
      editClient: CrudOperation;
      deleteClient: CrudOperation;
   };
   clientContact: {
      createClientContact: CrudOperation;
      editClientContact: CrudOperation;
      deleteClientContact: CrudOperation;
   };
   partnerCompany: {
      createPartnerCompany: CrudOperation;
      editPartnerCompany: CrudOperation;  
      deletePartnerCompany: CrudOperation;  
   };
   partnerContact: {
      createPartnerContact: CrudOperation;
      editPartnerContact: CrudOperation;
      deletePartnerContact: CrudOperation;
   };
   project: {
      createProject: CrudOperation;
      editProject: CrudOperation;
      deleteProject: CrudOperation;
   };
   salesDocument: {
      createSalesDocument: CrudOperation;  
      editSalesDocument: CrudOperation;    
      deleteSalesDocument: CrudOperation;  
   };
   salesDocumentItem: {
      createsSalesDocumentItem: CrudOperation;  
      editSalesDocumentItem: CrudOperation;    
      deleteSalesDocumentItem: CrudOperation;  
   };
   user: {
      editUser: CrudOperation;    
   };
}
