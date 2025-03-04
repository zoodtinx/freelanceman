import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Files, ClipboardX, ArrowDownToLine } from 'lucide-react';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { FileIconByExtension } from 'src/components/shared/ui/helpers/Helpers';
import { DialogFooter } from '../../primitives/Dialog';
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
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { ApiLoadingState } from '@/lib/types/form-element.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { EditFileDto } from '@types';
import { useFileApi } from '@/lib/api/file-api';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';

export const FileDialog = ({ formMethods }: FormDialogProps) => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const [copied, setCopied] = useState(false);

   const { editFile } = useFileApi()

   const { getValues, watch, handleSubmit } = formMethods;
   const fileName = getValues('displayName')
   const fileSize = formatBytes(watch('size'));
   const link = watch('link');
   const category = getValues('category');
   const dateCreated = formatDate(getValues('createdAt'), 'LONG');

   const handleCopy = () => {
      if (link) {
         navigator.clipboard.writeText(link);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   const handleDeleteButtonClick = () => {
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: () => {}
         },
         message: fileName,
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'file'
         }
      })
   };

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      const editFilePayload: EditFileDto = {
         displayName: data.displayName,
         type: data.type
      }
      const fileId = formDialogState.data.id
      editFile.mutate({
         fileId: fileId, 
         filePayload: editFilePayload
      } )
   };

   const handleDelete = () => {
      console.log('deleting');
   };

   const fileUrl = formMethods.getValues('link');

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-background rounded-2xl text-primary flex flex-col">
         <div className="flex gap-1 items-center px-5 pt-4 w-full">
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
         <div className="flex px-5  gap-2">
            <TextSelectForm
               fieldName="type"
               formMethods={formMethods}
               selection={fileTypeSelections}
               required={true}
               errorMessage="File type must be specified"
               placeholder="Select file type"
            />
            <p className="pb-3">{fileSize}</p>
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
            <div className="flex flex-col leading-5 w-1/2">
               <Label className="pb-0">Date Created</Label>
               <p>{dateCreated}</p>
            </div>
            <div className="flex flex-col leading-5 w-1/2">
               <Label className="pb-0">Copy Link</Label>
               <div
                  className="cursor-default flex gap-1 relative"
                  onClick={handleCopy}
               >
                  <Files className="w-5 h-5" />
                  <p className="truncate">{link}</p>
                  {copied && (
                     <p className="absolute bg-primary rounded-md text-sm text-foreground px-2 w-full text-center opacity-100 transition-opacity duration-100">
                        Link copied to clipboard
                     </p>
                  )}
               </div>
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <DiscardButton
                  formDialogState={formDialogState}
                  action={handleDeleteButtonClick}
                  formMethods={formMethods}
               />
               <div className="flex gap-1">
                  <SubmitButton
                     formDialogState={formDialogState}
                     formMethods={formMethods}
                  />
                  <DownloadButton url={fileUrl} />
               </div>
            </div>
         </DialogFooter>
      </form>
   );
};

const DownloadButton = ({ url }: { url: string }) => {
   return (
      <Link to={url}>
         <Button type="submit" variant={'default'} className="flex gap-1 pl-2 pr-3">
            <ArrowDownToLine className="w-4 h-4" />
            Download
         </Button>
      </Link>
   );
};

export default FileDialog;
