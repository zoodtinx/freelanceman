import { Link } from 'react-router-dom';
import { FileIconByExtension } from 'src/components/shared/ui/helpers/Helpers';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Files, ClipboardX, ArrowDownToLine } from 'lucide-react';

// Utilities
import { formatBytes } from '@/lib/helper/formatFile';
import { formatDate } from '@/lib/helper/formatDateTime';
import useDialogStore from '@/lib/zustand/dialog-store';

const FileDialogViewMode = ({ formMethods, setDialogState }) => {
   const setConfirmationDialogState = useDialogStore(
      (state) => state.setConfirmationDialogState
   );
   
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );
   
   const [copied, setCopied] = useState(false);
   const { getValues, watch } = formMethods;
   const fileName = getValues('name');
   const fileSize = formatBytes(watch('size'));
   const link = watch('link');
   const category = getValues('category');
   const dateCreated = formatDate(getValues('dateCreated'), 'LONG');

   const handleCopy = () => {
      if (link) {
         navigator.clipboard.writeText(link);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   const handleDeleteButton = () => {
      setFormDialogState((prev) => {
         console.log('prev', prev)
         return { ...prev, isOpen: false };
      });
      setConfirmationDialogState({isOpen: true, actions: { primary: () => {}}, message: 'Are you sure you want to delete this file?', type: 'delete'})
   };

   return (
      <div className="flex flex-col">
         <div className="flex gap-1 items-center px-5 pt-4">
            <FileIconByExtension fileExtension={getValues('type')} className="h-5 w-5" />
            <p className="text-lg">{fileName}</p>
         </div>
         <p className="px-5 pb-3">{fileSize}</p>
         <div className="flex gap-2 px-5 pb-2">
            <div className="flex flex-col leading-5 w-1/2">
               <p className="text-secondary">Date Created</p>
               <p>{dateCreated}</p>
            </div>
            <div className="flex flex-col leading-5 w-1/2">
               <p className="text-secondary">Click to copy link</p>
               <div className="cursor-default flex gap-1 relative" onClick={handleCopy}>
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
         {category?.includes('project') && (
            <div className="flex gap-2 px-5 pb-2">
               <div className="flex flex-col leading-5 w-1/2">
                  <p className="text-secondary">Project</p>
                  <Link to={`../${getValues('projectId')}`}>
                     <p>{getValues('project')}</p>
                  </Link>
               </div>
               <div className="flex flex-col leading-5 w-1/2">
                  <p className="text-secondary">Client</p>
                  <Link to={`../clients/${getValues('clientId')}`}>
                     <p>{getValues('client')}</p>
                  </Link>
               </div>
            </div>
         )}
         {category === 'client-file' && (
            <div className="flex flex-col leading-5 w-1/2 px-5">
               <p className="text-secondary">Client</p>
               <Link to={`../clients/${getValues('clientId')}`}>
                  <p>{getValues('client')}</p>
               </Link>
            </div>
         )}
         <DialogFooter>
            <div className="flex justify-between p-4">
               <div className="flex gap-1">
                  <Button variant={'destructive'} onClick={handleDeleteButton} className="flex gap-1">
                     Delete
                     <ClipboardX className="w-4 h-4" />
                  </Button>
                  <Button variant={'outline'} className="flex gap-1">
                     Edit
                     <ClipboardX className="w-4 h-4" />
                  </Button>
               </div>
               <Button type="submit" variant={'submit'} className="flex gap-1">
                  Download
                  <ArrowDownToLine className="w-4 h-4" />
               </Button>
            </div>
         </DialogFooter>
      </div>
   );
};


export default FileDialogViewMode