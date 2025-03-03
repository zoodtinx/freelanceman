import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Files, ClipboardX, ArrowDownToLine } from 'lucide-react';
import useDialogStore from '@/lib/zustand/dialog-store';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { FileIconByExtension } from 'src/components/shared/ui/helpers/Helpers';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { formatBytes } from '@/lib/helper/formatFile';
import { formatDate } from '@/lib/helper/formatDateTime';
import { DynamicHeightTextInputForm, Label, TextSelectForm } from 'src/components/shared/ui/form-field-elements';
import { fileTypeSelections } from '@/components/shared/ui/helpers/constants/selections';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { DiscardButton, SubmitButton } from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { ApiLoadingState } from '@/lib/types/form-element.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

export const FileDialog = ({ formMethods }: FormDialogProps) => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const [copied, setCopied] = useState(false);
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'discard',
   });

   const { getValues, watch } = formMethods;
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

   const handleDeleteButton = () => {
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: { primary: () => {} },
         message: 'Are you sure you want to delete this file?',
         type: 'delete',
      });
   };

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log('File saved:', data);
   };

   const handleDelete = () => {
      console.log('deleting');
   };

   return (
      <div className="bg-background rounded-2xl text-primary flex flex-col">
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
                  isApiLoading={isApiLoading}
                  formDialogState={formDialogState}
                  action={handleDelete}
                  setIsApiLoading={setIsApiLoading}
                  formMethods={formMethods}
               />
               <div className="flex gap-1">
                  <SubmitButton
                     formDialogState={formDialogState}
                     formMethods={formMethods}
                     isApiLoading={isApiLoading}
                     setIsApiLoading={setIsApiLoading}
                  />
                  <Button
                     type="submit"
                     variant={'submit'}
                     className="flex gap-1"
                  >
                     Download
                     <ArrowDownToLine className="w-4 h-4" />
                  </Button>
               </div>
            </div>
         </DialogFooter>
      </div>
   );
};

export default FileDialog;
