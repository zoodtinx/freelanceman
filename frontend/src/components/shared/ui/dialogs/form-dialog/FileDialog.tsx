import {
   useForm,
   SubmitHandler,
   FieldValues,
   UseFormReturn,
} from 'react-hook-form';
import React, {
   useEffect,
   useState,
} from 'react';

// API Hooks
import { useAllClientsQuery } from '@/lib/api/client-api';
import { useAllProjectsQuery } from '@/lib/api/project-api';

// Types
import { DialogProps } from 'src/lib/types/form-dialog.types';

// Utilities
import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';
import FileDialogViewMode from 'src/components/shared/ui/dialogs/form-dialog/FileDialogViewMode';
import FileDialogCreateMode from 'src/components/shared/ui/dialogs/form-dialog/FileDialogCreateMode';
import useDialogStore from '@/lib/zustand/dialog-store';

export const FileDialog = ({formMethods}:{formMethods: UseFormReturn}) => {
   const { formDialogState, setFormDialogState } = useDialogStore();

   const [mode, setMode] = useState('upload');
   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close')
   };

   const [projectListFilter, setProjectListFilter] = useState({});
   const { data: projectList, isLoading: isProjectLoading } =
      useAllProjectsQuery(projectListFilter);
   const projectSelection = projectList?.map((project) => ({
      value: project.id,
      label: project.name,
   }));

   const [clientListFilter, setClientListFilter] = useState({});
   const { data: clientList, isLoading: isClientLoading } =
      useAllClientsQuery(clientListFilter);
   const clientSelection = clientList?.map((client) => ({
      value: client.id,
      label: client.name,
   }));

   useEffect(() => {
      if (formDialogState.mode === 'create') {
         reset(defaultFileValues);
      } else {
         reset(formDialogState.data);
      }
   }, [formDialogState, reset]);

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      const { category, client, project } = data;
      if (
         ['project-document', 'project-assets', 'project-file'].includes(
            category
         ) &&
         (!project || !client)
      ) {
         formMethods.setError(!project ? 'project' : 'client', {
            type: 'manual',
            message: `${
               !project ? 'Project' : 'Client'
            } name is required for this category`,
         });
         return;
      }

      if (category === 'client-file' && !client) {
         formMethods.setError('client', {
            type: 'manual',
            message: 'Client name is required for client files',
         });
         return;
      }

      formMethods.clearErrors(['client', 'project']);
      console.log('File saved:', data);
   };

   return (
         <div className="bg-background rounded-2xl text-primary">
            {formDialogState.mode === 'view' ? (
               <FileDialogViewMode
                  formMethods={formMethods}
                  setDialogState={setFormDialogState}
               />
            ) : (
               <FileDialogCreateMode
                  formMethods={formMethods}
                  mode={mode}
                  setMode={setMode}
                  dialogState={formDialogState}
                  projectSelection={projectSelection}
                  clientSelection={clientSelection}
                  isProjectLoading={isProjectLoading}
                  isClientLoading={isClientLoading}
                  setProjectListFilter={setProjectListFilter}
                  setClientListFilter={setClientListFilter}
                  setDialogState={setFormDialogState}
                  openDeletePrompt={openDeletePrompt}
               />
            )}
         </div>
   );
};
