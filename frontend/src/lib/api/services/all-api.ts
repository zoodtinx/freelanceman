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
import { useEditUser } from '@/lib/api/user-api';

interface CallbackOptions  {
   createCallbacks: MutationCallbacks,
   editCallbacks: MutationCallbacks,
   deleteCallbacks: MutationCallbacks,
}

const useCrudApi = (callbacks: CallbackOptions) => {
   const {createCallbacks, deleteCallbacks, editCallbacks} = callbacks
   return {
      task: {
         createTask: useCreateTask(createCallbacks),
         editTask: useEditTask(editCallbacks),
         deleteTask: useDeleteTask(deleteCallbacks),
      },
      event: {
         createEvent: useCreateEvent(createCallbacks),
         editEvent: useEditEvent(editCallbacks),
         deleteEvent: useDeleteEvent(deleteCallbacks),
      },
      file: {
         createFile: useCreateFile(createCallbacks),
         editFile: useEditFile(editCallbacks),
         deleteFile: useDeleteFile(deleteCallbacks),
      },
      client: {
         createClient: useCreateClient(createCallbacks),
         editClient: useEditClient(editCallbacks),
         deleteClient: useDeleteClient(deleteCallbacks),
      },
      clientContact: {
         createClientContact: useCreateClientContact(createCallbacks),
         editClientContact: useEditClientContact(editCallbacks),
         deleteClientContact: useDeleteClientContact(deleteCallbacks),
      },
      partnerCompany: {
         createPartnerCompany: useCreateClientContact(createCallbacks),
         editPartnerCompany: useEditClientContact(editCallbacks),
         deletePartnerCompany: useDeleteClientContact(deleteCallbacks),
      },
      partnerContact: {
         createPartnerContact: useCreatePartnerContact(createCallbacks),
         editPartnerContact: useEditPartnerContact(editCallbacks),
         deletePartnerContact: useDeletePartnerContact(deleteCallbacks),
      },
      project: {
         createProject: useCreateProject(createCallbacks),
         editProject: useEditProject(editCallbacks),
         deleteProject: useDeleteProject(deleteCallbacks),
      },
      salesDocument: {
         createSalesDocument: useCreateProject(createCallbacks),
         editSalesDocument: useEditProject(editCallbacks),
         deleteSalesDocument: useDeleteProject(deleteCallbacks),
      },
      salesDocumentItem: {
         createSalesDocumentItem: useCreateProject(createCallbacks),
         editSalesDocumentItem: useEditProject(editCallbacks),
         deleteSalesDocumentItem: useDeleteProject(deleteCallbacks),
      },
      user: {
         editUser: useEditUser(editCallbacks),
      },
   };
};

export default useCrudApi;
