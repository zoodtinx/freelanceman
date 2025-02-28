import {
   Tabs,
   TabsList,
   TabsTrigger,
} from 'src/components/shared/ui/primitives/Tabs';
import {
   AutoClientField,
   LinkInputForm,
   SelectWithSearchForm,
   StatusSelectForm,
   TextInputForm,
   TextSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import React, {
   useEffect,
   useState,
   useRef,
   Dispatch,
   SetStateAction,
} from 'react';
import { ClipboardX, ArrowUpFromLine, Link } from 'lucide-react';
import { useAllClientsQuery } from '@/lib/api/client-api';
import { useAllProjectsQuery } from '@/lib/api/project-api';
import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useDialogStore from '@/lib/zustand/dialog-store';
import { ProjectSearchOption } from '@types';
import {
   fileTypeSelections,
   fileCategorySelections,
} from '@/components/shared/ui/helpers/constants/selections';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { FileUploadForm } from '@/components/shared/ui/form-field-elements/FileUploadForm';
import { DiscardButton, SubmitButton } from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { ApiLoadingState } from '@/components/shared/ui/dialogs/form-dialog/dialog-elements.type';
import { Separator } from '@/components/shared/ui/primitives/Separator';

export const NewFileDialog = ({
   formMethods,
}: {
   formMethods: UseFormReturn;
}) => {
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
         isLoading: false,
         type: 'discard',
      });
   const [projectListFilter, setProjectListFilter] =
      useState<ProjectSearchOption>({});
   const [mode, setMode] = useState<'upload' | 'add-link'>('add-link');
   const { formDialogState, setFormDialogState } = useDialogStore();

   const {
      handleSubmit,
      reset,
      register,
      formState: { errors },
   } = formMethods;

   const { data: projectList, isLoading: isProjectLoading } =
      useAllProjectsQuery(projectListFilter);
   const projectSelection = projectList?.map((project) => ({
      value: project.id,
      label: project.title,
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
      console.log('submitted ', data);
   };

   const categoryValue = formMethods.watch('category');

   return (
      <div className="bg-background rounded-2xl text-primary">
         <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="flex flex-col"
         >
            <div className="px-5 py-4 flex flex-col gap-3">
               <ModeSelect setMode={setMode} mode={mode} />
               {mode === 'upload' && (
                  <FileUploadForm
                     fieldName="link"
                     formMethods={formMethods}
                     required={mode === 'upload'}
                     errorMessage="Please upload a file"
                  />
               )}
               {mode === 'add-link' && (
                  <div className='flex flex-col gap-2 items-center'>
                     <Link className='text-secondary w-6 h-6 my-1' />
                     <LinkInputForm
                           formMethods={formMethods}
                           required={mode === 'add-link'}
                           fieldName="link"
                           className='w-full'
                        />
                     {/* <div className="grow">
                        <label className="text-secondary">Add a link</label>
                        <LinkInputForm
                           formMethods={formMethods}
                           required={mode === 'add-link'}
                           fieldName="link"
                        />
                     </div> */}
                  </div>
               )}
               <Separator className='mt-1' />
               <div className="flex flex-col">
                  <Label>Diaplay Name</Label>
                  <TextInputForm
                     fieldName="displayName"
                     formMethods={formMethods}
                     required={true}
                     errorMessage="Please enter display name"
                     placeholder="Something straightforward"
                  />
               </div>
               <div className="flex gap-2">
                  <div className="flex flex-col leading-5 w-1/2">
                     <Label>File Type</Label>
                     <TextSelectForm
                        fieldName="type"
                        formMethods={formMethods}
                        selection={fileTypeSelections}
                        required={true}
                        errorMessage="File type must be specified"
                        placeholder="Select file type"
                     />
                  </div>
                  <div className="flex flex-col leading-5 w-1/2">
                     <Label>Category</Label>
                     <TextSelectForm
                        fieldName="category"
                        formMethods={formMethods}
                        selection={fileCategorySelections}
                        required={true}
                        errorMessage="File category must be specified"
                        placeholder="Select file category"
                     />
                  </div>
               </div>
               {(categoryValue === 'document' ||
                  categoryValue === 'project-assets' ||
                  categoryValue === 'project-file') && (
                  <div className="flex gap-2">
                     <div className="flex flex-col leading-5 w-full">
                        <p className="text-secondary">Project</p>
                        <SelectWithSearchForm
                           formMethods={formMethods}
                           dialogState={formDialogState}
                           selection={projectSelection}
                           fieldName="projectId"
                           placeholder="Select a project"
                           type="project"
                           isLoading={isProjectLoading}
                           setFilter={setProjectListFilter}
                        />
                     </div>
                  </div>
               )}
            </div>
            <DialogFooter>
               <div className="flex justify-between p-4">
                  <DiscardButton
                     formDialogState={formDialogState}
                     formMethods={formMethods}
                     isApiLoading={isApiLoading}
                     setIsApiLoading={setIsApiLoading}
                  />
                  <SubmitButton
                     formDialogState={formDialogState}
                     formMethods={formMethods}
                     isApiLoading={isApiLoading}
                     setIsApiLoading={setIsApiLoading}
                  />
               </div>
            </DialogFooter>
         </form>
      </div>
   );
};

const ModeSelect = ({
   setMode,
   mode,
}: {
   setMode: Dispatch<SetStateAction<string>>;
   mode: string;
}): JSX.Element => {
   return (
      <Tabs
         className="w-full"
         onValueChange={(value) => setMode(value)}
         value={mode}
      >
         <TabsList className="bg-foreground w-full flex p-[5px]">
            <TabsTrigger
               value="upload"
               className="w-1/2 text-base h-6 rounded-sm"
            >
               Upload
            </TabsTrigger>
            <TabsTrigger
               value="add-link"
               className="w-1/2 text-base h-6 rounded-sm"
            >
               Add by URL
            </TabsTrigger>
         </TabsList>
      </Tabs>
   );
};
