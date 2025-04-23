import {
   useCreateClient,
   useDeleteClient,
   useEditClient,
} from '@/lib/api/client-api';
import {
   useCreateClientContact,
   useDeleteClientContact,
   useEditClientContact,
} from '@/lib/api/client-contact-api';
import {
   useCreateEvent,
   useDeleteEvent,
   useEditEvent,
} from '@/lib/api/event-api';
import { useCreateFile, useDeleteFile, useEditFile } from '@/lib/api/file-api';
import {
   useCreatePartnerContact,
   useDeletePartnerContact,
   useEditPartnerContact,
} from '@/lib/api/partner-contact-api';
import {
   useCreateProject,
   useDeleteProject,
   useEditProject,
} from '@/lib/api/project-api';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { useCreateTask, useDeleteTask, useEditTask } from '@/lib/api/task-api';

const useCrudApi = (callbacks: MutationCallbacks) => {
   return {
      task: {
         createTask: useCreateTask(callbacks),
         editTask: useEditTask(callbacks),
         deleteTask: useDeleteTask(callbacks),
      },
      event: {
         createEvent: useCreateEvent(callbacks),
         editEvent: useEditEvent(callbacks),
         deleteEvent: useDeleteEvent(callbacks),
      },
      file: {
         createFile: useCreateFile(callbacks),
         editFile: useEditFile(callbacks),
         deleteFile: useDeleteFile(callbacks),
      },
      client: {
         createClient: useCreateClient(callbacks),
         editClient: useEditClient(callbacks),
         deleteClient: useDeleteClient(callbacks),
      },
      clientContact: {
         createClientContact: useCreateClientContact(callbacks),
         editClientContact: useEditClientContact(callbacks),
         deleteClientContact: useDeleteClientContact(callbacks),
      },
      //   partnerCompany: {
      //     createPartnerCompany: useCreatePartnerCompany(callbacks),
      //     editPartnerCompany: useEditPartnerCompany(callbacks),
      //     deletePartnerCompany: useDeletePartnerCompany(callbacks),
      //   },
      partnerContact: {
         createPartnerContact: useCreatePartnerContact(callbacks),
         editPartnerContact: useEditPartnerContact(callbacks),
         deletePartnerContact: useDeletePartnerContact(callbacks),
      },
      project: {
         createProject: useCreateProject(callbacks),
         editProject: useEditProject(callbacks),
         deleteProject: useDeleteProject(callbacks),
      },
      //   salesDocument: {
      //     createSalesDocument: useCreateSalesDocument(callbacks),
      //     editSalesDocument: useEditSalesDocument(callbacks),
      //     deleteSalesDocument: useDeleteSalesDocument(callbacks),
      //   },
      //   salesDocumentItem: {
      //     createSalesDocumentItem: useCreateSalesDocumentItem(callbacks),
      //     editSalesDocumentItem: useEditSalesDocumentItem(callbacks),
      //     deleteSalesDocumentItem: useDeleteSalesDocumentItem(callbacks),
      //   },
      //   user: {
      //     createUser: useCreateUser(callbacks),
      //     editUser: useEditUser(callbacks),
      //     deleteUser: useDeleteUser(callbacks),
      //   },
   };
};

export default useCrudApi;
