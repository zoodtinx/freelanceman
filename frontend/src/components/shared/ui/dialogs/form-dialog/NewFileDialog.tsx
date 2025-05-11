import {
   Tabs,
   TabsList,
   TabsTrigger,
} from 'src/components/shared/ui/primitives/Tabs';
import {
   LinkInputForm,
   SelectWithSearchForm,
   TextInputForm,
   TextSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import { DialogFooter } from '../../primitives/Dialog';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useState, Dispatch, SetStateAction } from 'react';
import { Link } from 'lucide-react';
import { fileTypeSelections } from '@/components/shared/ui/helpers/constants/selections';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { FileUploadForm } from '@/components/shared/ui/form-field-elements/FileUploadForm';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import {
   ApiLoadingState,
   FormDialogProps,
} from '@/lib/types/form-dialog.types';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useGetPresignedUrl } from '@/lib/api/file-api';
import { CreateFileDto } from 'freelanceman-common';
import { toast } from 'sonner';
import { CrudApi } from '@/lib/api/api.type';

export const NewFileDialog = ({ formMethods, crudApi }: FormDialogProps) => {
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'destructive',
   });
   const [mode, setMode] = useState<'add-link' | 'upload'>('upload');
   const { formDialogState, setFormDialogState } = useFormDialogStore();

   // api setup
   const { createFile } = crudApi as CrudApi['file'];
   const getPresignedUrl = useGetPresignedUrl({
      errorCallback() {
         toast.error('Unable to edit profile');
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      setIsApiLoading({ isLoading: true, type: 'submit' });
      console.log('submitted ', data);

      let presignedUrl;

      const projectId = formMethods.getValues('projectId');
      const fileType = formMethods.getValues('type');
      const fileName = formMethods.getValues('displayName');
      const file = formMethods.getValues('file');
      const link = formMethods.getValues('link');

      console.log('link', link);

      if (mode === 'upload') {
         toast.loading('Uploading file');
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
         presignedUrl = await getPresignedUrl.mutateAsync({
            fileName: fileName,
            category: `project_${projectId}`,
            contentType: fileType,
         });

         const uploadResponse = await fetch(presignedUrl.url, {
            method: 'PUT',
            body: file,
            headers: {
               'Content-Type': fileType,
            },
         });

         if (!uploadResponse.ok) {
            toast.error('Error uploading file');
            return;
         }
      }

      const payload: CreateFileDto = {
         category: data.category,
         displayName: data.displayName,
         link: data.link,
         originalName: data.originalName,
         type: data.type,
         clientId: data.clientId,
         projectId: data.projectId,
         size: data.size,
         s3Key: mode === 'upload' ? presignedUrl.key : undefined,
         url: mode === 'add-link' ? link : undefined,
      };
      createFile.mutate(payload);
      setIsApiLoading({ isLoading: false, type: 'submit' });
   };

   const categoryValue = formMethods.watch('category');
   const categorySelection = [
      { label: 'Working File', value: 'work' },
      { label: 'Project Asset', value: 'asset' },
   ];

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
                     fieldName="file"
                     formMethods={formMethods}
                     required={mode === 'upload'}
                     errorMessage="Please upload a file"
                  />
               )}
               {mode === 'add-link' && (
                  <div className="flex flex-col gap-2 items-center">
                     <Link className="text-secondary w-6 h-6 my-1" />
                     <LinkInputForm
                        formMethods={formMethods}
                        required={mode === 'add-link'}
                        fieldName="link"
                        className="w-full"
                        errorMessage="Invalid URL format"
                     />
                  </div>
               )}
               <Separator className="mt-1" />
               <div className="flex flex-col">
                  <Label>Diaplay Name</Label>
                  <TextInputForm
                     fieldName="displayName"
                     formMethods={formMethods}
                     required={true}
                     errorMessage="Please enter display name"
                  />
               </div>
               {formDialogState.openedOn !== 'project-page' && (
                  <div className="flex flex-col">
                     <Label>Project</Label>
                     <SelectWithSearchForm
                        fieldName="projectId"
                        formMethods={formMethods}
                        type="project"
                        required={true}
                        errorMessage="Please select a project"
                        placeholder="Select a project"
                     />
                  </div>
               )}
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
                        selection={categorySelection}
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
                           fieldName="projectId"
                           placeholder="Select a project"
                           type="project"
                           size="base"
                        />
                     </div>
                  </div>
               )}
            </div>
            <DialogFooter>
               <div className="flex justify-between p-4 pb-2">
                  <DiscardButton
                     formMethods={formMethods}
                     isApiLoading={isApiLoading}
                     setIsApiLoading={setIsApiLoading}
                  />
                  <SubmitButton
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
