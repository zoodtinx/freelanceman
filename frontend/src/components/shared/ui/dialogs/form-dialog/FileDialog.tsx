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
   Label,
   TextSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import { fileTypeSelections } from '@/components/shared/ui/helpers/constants/selections';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FormDialogFooterProps } from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { EditFileDto } from 'freelanceman-common';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { toast } from 'sonner';
import { useDeleteFile, useEditFile, useFileUrlQuery } from '@/lib/api/file-api';
import HeadlineTextInputForm from '@/components/shared/ui/form-field-elements/HeadlineTextInput';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';

export const FileDialog = ({
   formMethods,
}: FormDialogProps) => {
   // local state
   const [copied, setCopied] = useState(false);

   //dialog state
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore((state) => state.setConfirmationDialogState);
   const closeDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   // form utilities
   const {
      handleSubmit,
      getValues,
      setValue,
      watch,
   } = formMethods;
   const fileLink = getValues('link');
   const s3Key = getValues('s3Key');

   // api setup
   const editFile = useEditFile()
   const deleteFile = useDeleteFile()

   // fetch file download url
   const { data: fileUrl, isLoading: isUrlLoading } = useFileUrlQuery(
      s3Key,
      Boolean(s3Key)
   );

   if (fileUrl) {
      setValue('fileUrl', fileUrl?.url);
   } else if (fileLink) {
      // set external link as download link if no s3Key (meaning user use their own link)
      setValue('fileUrl', fileLink);
   }

   const fileSize = formatBytes(watch('size'));
   const dateCreated = formatDate(getValues('createdAt'), 'SEMIFULL');

   const handleCopy = () => {
      if (fileUrl?.url) {
         navigator.clipboard.writeText(fileUrl.url);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const editFilePayload: EditFileDto = {
         id: data.id,
         name: data.name,
         type: data.type,
         category: data.category,
      };
      closeDialog();
      await editFile.mutateAsync(editFilePayload);
      toast.success('File updated');
   };

   const categorySelection = [
      { label: 'Working File', value: 'work' },
      { label: 'Project Asset', value: 'asset' },
   ];

   const handleDestructiveButton = () => {
      if (formDialogState.mode === 'edit') {
         const deleteProjectFn = async () => {
            await deleteFile.mutateAsync(formDialogState.data.id);
         };
         setConfirmationDialogState({
            actions: {
               primary() {
                  deleteProjectFn();
               },
            },
            entityName: formDialogState.data.name,
            isOpen: true,
            type: 'delete',
            dialogRequested: {
               mode: 'edit',
               type: 'file',
            },
         });
      }
      closeDialog();
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="bg-background rounded-2xl text-primary flex flex-col"
      >
         <div className="pt-4 pb-2 px-4">
            <div className="p-2 px-3 bg-foreground rounded-[9px] shadow-sm">
               <HeadlineTextInputForm
                  formMethods={formMethods}
                  fieldName="name"
                  required={true}
                  errorMessage="Please name your file"
                  placeholder="File Name"
                  className="w-full"
               />
               <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                     <FileIconByExtension
                        fileType={watch('type')}
                        className="h-4 w-4 text-secondary"
                     />
                     <TextSelectForm
                        fieldName="type"
                        formMethods={formMethods}
                        selection={fileTypeSelections}
                        required={true}
                        errorMessage="File type must be specified"
                        placeholder="Select file type"
                        isWithIcon={false}
                     />
                  </div>
                  <p>{fileSize}</p>
               </div>
            </div>
         </div>
         <div className="flex gap-2 w-full px-5 pb-2">
            {formDialogState.data.project && (
               <div className="flex flex-col w-1/2 shrink-0">
                  <Label className="pb-0">Project</Label>
                  <Link
                     to={`/home/project/${formDialogState.data.project?.id}`}
                     className="leading-tight"
                  >
                     {formDialogState.data.project?.name}
                  </Link>
               </div>
            )}
            <div className="flex flex-col w-1/2 shrink-0">
               <Label className="pb-0">Category</Label>
               <TextSelectForm
                  fieldName="category"
                  formMethods={formMethods}
                  selection={categorySelection}
               />
            </div>
         </div>
         <div className="flex gap-2 px-5 pb-3 w-full">
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
                        <p className="truncate mr-3">
                           {fileUrl ? fileUrl.url : getValues('link')}
                        </p>
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
            formMethods={formMethods}
            onDiscard={handleDestructiveButton}
            isUrlLoading={isUrlLoading}
            entity='File'
         />
      </form>
   );
};

const FileDialogFooter = ({
   onDiscard,
   formMethods,
   isUrlLoading,
}: FormDialogFooterProps) => {
   const url = formMethods.getValues('fileUrl');

   return (
      <DialogFooter>
         <div className="flex justify-between p-4">
            <DiscardButton onClick={onDiscard} />
            <div className="flex gap-1">
               <DownloadButton url={url} isLoading={isUrlLoading!} />
               <SubmitButton formMethods={formMethods} entity='File' />
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
