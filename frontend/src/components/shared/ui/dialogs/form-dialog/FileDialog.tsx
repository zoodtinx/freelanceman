import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Files, ArrowDownToLine, Loader2 } from 'lucide-react';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { FileIconByExtension } from 'src/components/shared/ui/helpers/Helpers';
import { Button } from '../../primitives/Button';
import { formatBytes } from '@/lib/helper/formatFile';
import { formatDate } from '@/lib/helper/formatDateTime';
import {
   DynamicHeightTextInputForm,
   Label,
   TextSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import { fileTypeSelections } from '@/components/shared/ui/helpers/constants/selections';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { CrudApi } from '@/lib/api/api.type';
import { FormDialogFooterProps } from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { EditFileDto } from 'freelanceman-common';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { toast } from 'sonner';
import { useFileUrlQuery } from '@/lib/api/file-api';

export const FileDialog = ({
   formMethods,
   buttonLoadingState,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   // button loading state
   const { isApiLoading, setIsApiLoading } = buttonLoadingState;

   // form utilities
   const { handleSubmit, getValues, setValue, watch, formState: {dirtyFields}  } = formMethods;
   const fileLink = getValues('link')
   const s3Key = getValues('s3Key');

   //dialog state
   const { formDialogState } = useFormDialogStore();

   // api setup
   const { editFile } = crudApi as CrudApi['file'];
   const { data: fileUrl, isLoading: isUrlLoading } = useFileUrlQuery(
      s3Key,
      Boolean(s3Key)
   );
   if (fileUrl) {
      setValue('fileUrl', fileUrl?.url);
   } else if (fileLink) {
      setValue('fileUrl', fileLink);
   }

   console.log('dirtyFields', dirtyFields)

   const [copied, setCopied] = useState(false);

   const fileSize = formatBytes(watch('size'));
   const category = getValues('category');
   const dateCreated = formatDate(getValues('createdAt'), 'SEMIFULL');

   const handleCopy = () => {
      if (fileUrl?.url) {
         navigator.clipboard.writeText(fileUrl.url);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsApiLoading({ isLoading: true, type: 'submit' });
      const editFilePayload: EditFileDto = {
         id: formDialogState.data.id,
         displayName: data.displayName,
         type: data.type,
         category: data.category,
      };
      editFile.mutate(editFilePayload);
      toast.success('File updated')
      setIsApiLoading({ isLoading: false, type: 'submit' });
   };

   //ui shorthands
   const project = formDialogState.data.project
   const categorySelection = [
      {label: 'Working File', value: 'work'},
      {label: 'Project Asset', value: 'asset'}
   ]

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="bg-background rounded-2xl text-primary flex flex-col"
      >
         <div className="flex gap-1 items-start px-5 pt-4 pb-1 w-full">
            <FileIconByExtension
               fileType={watch('type')}
               className="h-6 w-6 text-secondary"
            />
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="displayName"
               required={true}
               errorMessage="Please name your file"
               placeholder="File Name"
               className="w-full"
            />
         </div>
         <div className="flex px-5 pb-2 gap-2">
            <TextSelectForm
               fieldName="type"
               formMethods={formMethods}
               selection={fileTypeSelections}
               required={true}
               errorMessage="File type must be specified"
               placeholder="Select file type"
            />
            <p>{fileSize}</p>
         </div>
         <div className="flex gap-2 w-full px-5 pb-3">
            <div className="flex flex-col w-1/2 shrink-0">
               <Label className="pb-0">Project</Label>
               <Link
                  to={`/home/project/${project?.id}`}
                  className="leading-tight"
               >
                  {formDialogState.data.project.title}
               </Link>
            </div>
            <div className="flex flex-col w-1/2 shrink-0">
               <Label className="pb-0">Category</Label>
               <TextSelectForm
                  fieldName="category"
                  formMethods={formMethods}
                  selection={categorySelection}
               />
            </div>
         </div>
         <div className="px-5 pb-3">
            <Separator />
         </div>
         {category?.includes('project') && (
            <div className="flex px-5 pb-2 w-full">
               <div className="flex flex-col leading-5 w-1/2">
                  <Label className="pb-0">Project</Label>
                  <Link to={`../${getValues('projectId')}`}>
                     <p>{getValues('project')}</p>
                  </Link>
               </div>
               <div className="flex flex-col leading-5 w-1/2">
                  <Label className="pb-0">Client</Label>
                  <Link to={`../clients/${getValues('clientId')}`}>
                     <p>{getValues('client')}</p>
                  </Link>
               </div>
            </div>
         )}
         {category === 'client-file' && (
            <div className="flex flex-col leading-5 w-1/2">
               <Label className="pb-0">Client</Label>
               <Link to={`../clients/${getValues('clientId')}`}>
                  <p>{getValues('client')}</p>
               </Link>
            </div>
         )}
         <div className="flex gap-2 px-5 pb-2 w-full">
            <div className="flex shrink-0 flex-col leading-5 w-1/2">
               <Label className="pb-0">Date Created</Label>
               <p>{dateCreated}</p>
            </div>
            <div className="flex shrink-0 flex-col leading-5 w-1/2">
               <Label className="pb-0">Copy Link</Label>
               <div
                  className="cursor-default flex gap-1 relative"
                  onClick={handleCopy}
               >
                  {isUrlLoading ? (
                     <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
                  ) : (
                     <>
                        <Files className="w-5 h-5 shrink-0" />
                        <p className="truncate mr-3">{fileUrl ? fileUrl.url : getValues('link')}</p>
                     </>
                  )}
                  {copied && (
                     <p className="absolute bg-primary rounded-md text-sm text-foreground px-2 w-full text-center opacity-100 transition-opacity duration-100">
                        Link copied to clipboard
                     </p>
                  )}
               </div>
            </div>
         </div>
         <FileDialogFooter
            formDialogState={formDialogState}
            formMethods={formMethods}
            isApiLoading={isApiLoading}
            isUrlLoading={isUrlLoading}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};

const FileDialogFooter = ({
   onDiscard,
   isApiLoading,
   formDialogState,
   formMethods,
   isUrlLoading,
}: FormDialogFooterProps) => {
   const url = formMethods.getValues('fileUrl');

   return (
      <DialogFooter>
         <div className="flex justify-between p-4 pb-2">
            <DiscardButton
               onClick={onDiscard}
               isApiLoading={isApiLoading}
               formDialogState={formDialogState}
            />
            <div className="flex gap-1">
               <DownloadButton url={url} isLoading={isUrlLoading!} />
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
                  isApiLoading={isApiLoading}
               />
            </div>
         </div>
      </DialogFooter>
   );
};

const DownloadButton = ({
   url,
   isLoading,
}: {
   url: string;
   isLoading: boolean;
}) => {
   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (url) {
         window.open(url, '_blank');
      }
   };

   return (
      <Button
         type="submit"
         disabled={isLoading}
         variant={isLoading ? 'ghost' : 'default'}
         className="flex gap-1 pl-2 pr-3"
         onClick={handleClick}
      >
         <ArrowDownToLine className="w-4 h-4" />
         Download
      </Button>
   );
};

export default FileDialog;
