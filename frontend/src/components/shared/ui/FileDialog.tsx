import {
   useForm,
   SubmitHandler,
   FieldValues,
} from 'react-hook-form';
import React, {
   useEffect,
   useState,
} from 'react';

// API Hooks
import { useAllClientsQuery } from '@/lib/api/client-api';
import { useAllProjectsQuery } from '@/lib/api/project-api';

// Types
import { DialogProps } from '@/lib/types/dialog.types';

// Utilities
import { defaultFileValues } from 'src/components/shared/ui/constants/default-values';
import FileDialogViewMode from '@/components/shared/ui/FileDialogViewMode';
import FileDialogCreateMode from '@/components/shared/ui/FileDialogCreateMode';
import useDialogStore from '@/lib/zustand/dialog-store';
import { File } from '@types';

const FileDialog: React.FC<DialogProps> = () => {
   const { formDialogState, setFormDialogState } = useDialogStore();
   let fileData

   const [mode, setMode] = useState('upload');
   const formMethods = useForm({ defaultValues: fileData });
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

   const openDeletePrompt = () => {
      setFormDialogState!({
         data: {
            label: formDialogState.data.name,
            action() {
               console.log('hey');
            },
         },
         isOpen: true,
      });
   };

   return (
         <div className="bg-background rounded-2xl text-primary">
            {formDialogState.mode === 'view' ? (
               <FileDialogViewMode
                  formMethods={formMethods}
                  setDialogState={setFormDialogState}
                  openDeletePrompt={openDeletePrompt}
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

export default FileDialog;
