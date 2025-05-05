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
import {
   fileTypeSelections,
   fileCategorySelections,
} from '@/components/shared/ui/helpers/constants/selections';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { FileUploadForm } from '@/components/shared/ui/form-field-elements/FileUploadForm';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { ApiLoadingState } from '@/components/shared/ui/dialogs/form-dialog/dialog-elements.type';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useFileApi } from '@/lib/api/file-api';

export const NewFileDialog = ({
   formMethods,
}: {
   formMethods: UseFormReturn;
}) => {
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'discard',
   });
   const [mode, setMode] = useState<'add-link' | 'upload'>('upload');
   const { formDialogState } = useFormDialogStore();

   const { createFile } = useFileApi();

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log('submitted ', data);
      const payload: CreateFileDto = {
         category: data.category,
         displayName: data.displayName,
         link: data.link,
         originalName: data.link,
         type: data.type,
         clientId: data.clientId,
         projectId: data.projectId,
         size: data.size,
      };
      createFile.mutate(payload);
      console.log('payload', payload)
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
                  <div className="flex flex-col gap-2 items-center">
                     <Link className="text-secondary w-6 h-6 my-1" />
                     <LinkInputForm
                        formMethods={formMethods}
                        required={mode === 'add-link'}
                        fieldName="link"
                        className="w-full"
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
