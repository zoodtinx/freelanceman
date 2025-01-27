
import { Link } from 'react-router-dom';
import SelectWithApiSearchForm from '@/components/shared/ui/form-field-elements/SelectWithApiSearchForm';
import LinkInputForm from '@/components/shared/ui/form-field-elements/LinkInputForm';
import SelectForm from '@/components/shared/ui/form-field-elements/SelectForm';
import { FileIconByExtension } from '@/components/page-elements/files/Helpers';

import {
   Tabs,
   TabsList,
   TabsTrigger,
} from 'src/components/shared/ui/primitives/Tabs';
import {
   DialogContent,
   DialogHeader,
   DialogFooter,
   DialogTitle,
   Dialog,
   DialogTrigger,
} from './primitives/Dialog';
import { Button } from './primitives/Button';
import { Input } from './primitives/Input';

import {
   useForm,
   SubmitHandler,
   FieldValues,
   Path,
   PathValue,
} from 'react-hook-form';
import React, {
   Dispatch,
   SetStateAction,
   useEffect,
   useRef,
   useState,
} from 'react';

import { CircleCheck, Files, ClipboardX, Folder, Upload, Link as LinkIcon, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

// API Hooks
import { useClientQuery, useAllClientsQuery } from '@/lib/api/client-api';
import { useAllProjectsQuery } from '@/lib/api/project-api';

// Types
import { InputProps } from '@/lib/types/form-input-props.types';
import { DialogProps, FormDialogState, PromptDialogState } from '@/lib/types/dialog.types';

// Utilities
import { defaultFile } from 'src/components/shared/ui/constants';
import { formatBytes } from '@/lib/helper/formatFile';
import { formatDate } from '@/lib/helper/formatDateTime';
import SelectWithSearchForm from '@/components/shared/ui/form-field-elements/SelectWithSearchForm';

const FileDialog: React.FC<DialogProps> = ({ dialogState, setDialogState, setPromptDialogState }) => {
   const [mode, setMode] = useState('upload');
   const formMethods = useForm({ defaultValues: defaultFile });
   const {
      handleSubmit,
      reset,
   } = formMethods;


   const handleDialogClose = () => {
      setDialogState({
         isOpen: false,
         id: '',
         mode: dialogState.mode,
         type: 'file',
         data: {},
      });
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
      if (dialogState.mode === 'create') {
         reset(defaultFile);
      } else {
         reset(dialogState.data);
      }
   }, [dialogState, reset]);

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
      setPromptDialogState!({
         data: {
            label: dialogState.data.name,
            action() {
                console.log('hey')
            },
         },
         isOpen: true
      })
   }

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Open File Dialog
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-freelanceman-darkgrey text-foreground">
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1 text-white">
                  {dialogState.mode === 'create' ? (
                     <>
                        <Upload className="w-[13px] h-[13px]" />
                        <p>Add File</p>
                     </>
                  ) : (
                     <>
                        <Folder className="w-[13px] h-[13px]" />
                        <p>File</p>
                     </>
                  )}
               </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="bg-background rounded-2xl text-primary">
                  {dialogState.mode === 'view' ? (
                     <ViewModeContent formMethods={formMethods} setDialogState={setDialogState} openDeletePrompt={openDeletePrompt} />
                  ) : (
                     <CreateAndEditModeContent
                        formMethods={formMethods}
                        mode={mode}
                        setMode={setMode}
                        dialogState={dialogState}
                        projectSelection={projectSelection}
                        clientSelection={clientSelection}
                        isProjectLoading={isProjectLoading}
                        isClientLoading={isClientLoading}
                        setProjectListFilter={setProjectListFilter}
                        setClientListFilter={setClientListFilter}
                        setDialogState={setDialogState}
                        openDeletePrompt={openDeletePrompt}
                     />
                  )}
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

const ViewModeContent: React.FC<{
   formMethods: any;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   openDeletePrompt: () => void
}> = ({ formMethods, setDialogState, openDeletePrompt }) => {
   const [copied, setCopied] = useState(false); // To show/hide the "Link copied" text

   const {getValues, watch} = formMethods
   const fileName = formMethods.getValues('name');
   const fileSize = formatBytes(formMethods.watch('size'));
   const link = watch('link')
   const category = getValues('category')

   const dateCreated = formatDate(getValues('dateCreated'), 'LONG')

   const handleCopy = () => {
      if (link) {
        navigator.clipboard.writeText(link);
        setCopied(true); // Show the "Link copied" message
  
        // Hide the message after 3 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    };

    const handleDeleteButton = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
      openDeletePrompt()
    }

   return (
      <div className="flex flex-col">
         <div className="flex gap-1 items-center px-5 pt-4">
            <FileIconByExtension
               fileExtension={formMethods.getValues('type')}
               className="h-5 w-5"
            />
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
               <div
                  className="cursor-default flex gap-1 relative"
                  onClick={handleCopy}
               >
                  <Files className="w-5 h-5" />
                  <p className="truncate">{link}</p>
                  <p
                     className={`absolute bg-primary rounded-md text-sm text-foreground px-2 w-full text-center transition-opacity duration-100 ${
                        copied ? 'opacity-100' : 'opacity-0'
                     }`}
                  >
                     Link copied to clipboard
                  </p>
               </div>
            </div>
         </div>
         {category === 'project-file' ||
            category === 'project-asset' ||
            (category === 'project-document' && (
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
            ))}
         {category === 'client-file' && (
            <div className="flex flex-col leading-5 w-1/2 px-5">
               <p className="text-secondary">Client</p>
               <Link to={`../clients/${getValues('clientId')}`}>
                  <p>{getValues('client')}</p>
               </Link>
            </div>
         )}
         <DialogFooter className="">
            <div className="flex justify-between p-4">
               <div className="flex gap-1">
                  <Button
                     variant={'destructive'}
                     onClick={handleDeleteButton}
                     className="flex gap-1"
                  >
                     Delete
                     <ClipboardX className="w-4 h-4" />
                  </Button>
                  <Button
                     variant={'outline'}
                     className="flex gap-1"
                  >
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

const CreateAndEditModeContent: React.FC<{
   formMethods: any;
   mode: string;
   setMode: Dispatch<SetStateAction<string>>;
   dialogState: any;
   projectSelection: any[];
   clientSelection: any[];
   isProjectLoading: boolean;
   isClientLoading: boolean;
   setProjectListFilter: Dispatch<SetStateAction<any>>;
   setClientListFilter: Dispatch<SetStateAction<any>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   openDeletePrompt: () => void
}> = ({
   formMethods,
   mode,
   setMode,
   dialogState,
   projectSelection,
   clientSelection,
   isProjectLoading,
   isClientLoading,
   setProjectListFilter,
   setClientListFilter,
   openDeletePrompt,
   setDialogState
}) => {
   const {
      register,
      formState: { errors },
      watch,
   } = formMethods;

   const categoryValue = watch('category');

   const selectedProject = watch('projectId')


   const handleDeleteButton = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
      openDeletePrompt()
    }

   return (
      <>
         <div className="pt-3">
            <ModeSelect setMode={setMode} mode={mode} />
         </div>
         {mode === 'upload' && <FileUploadField formMethods={formMethods} />}
         {mode === 'link' && (
            <div className="px-5 py-2">
               <label className="text-secondary">Add a link</label>
               <LinkInputForm
                  formMethods={formMethods}

                  dialogState={dialogState}
                  fieldName="link"
               />
            </div>
         )}
         <div className="flex flex-col p-5 pt-3 gap-2">
            <div className="flex flex-col">
               <p className="text-secondary">Custom file name</p>
               <Input
                  {...register('fileName', {
                     required: 'File name is required',
                  })}
                  placeholder="Leave blank to use the original name"
                  className="w-full"
               />
               {errors.fileName && (
                  <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                     {errors.fileName.message as string}
                  </p>
               )}
            </div>
            <div className="flex gap-2">
               <div className="flex flex-col leading-5 w-1/2">
                  <p className="text-secondary">File type</p>
                  <SelectWithSearchForm
                     formMethods={formMethods}
                     selection={fileTypeSelections}
                     dialogState={dialogState}
                     fieldName="type"
                     placeholder="Select file type"
                  />
                  {errors.type && (
                     <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                        {errors.type.message as string}
                     </p>
                  )}
               </div>
               <div className="flex flex-col leading-5 w-1/2">
                  <p className="text-secondary">Category</p>
                  <SelectForm
                     formMethods={formMethods}
                     selection={fileCategorySelections}
                     dialogState={dialogState}
                     fieldName="category"
                     placeholder="Select category"
                  />
                  {errors.category && (
                     <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                        {errors.category.message as string}
                     </p>
                  )}
               </div>
            </div>
            {(categoryValue === 'document' ||
               categoryValue === 'project-assets' ||
               categoryValue === 'project-file') && (
               <div className="flex gap-2">
                  <div className="flex flex-col leading-5 w-1/2">
                     <p className="text-secondary">Project</p>
                     <SelectWithApiSearchForm
                        formMethods={formMethods}
                        dialogState={dialogState}
                        selection={projectSelection}
                        fieldName="projectId"
                        isLoading={isProjectLoading}
                        setFilter={setProjectListFilter}
                     />
                     {errors.project && (
                        <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                           {errors.project.message as string}
                        </p>
                     )}
                  </div>
                  <div className="flex flex-col leading-5 w-1/2">
                     <p className="text-secondary">Client</p>
                     <SelectWithApiSearchForm
                        formMethods={formMethods}
                        dialogState={dialogState}
                        selection={clientSelection}
                        fieldName="clientId"
                        isLoading={isClientLoading}
                        setFilter={setClientListFilter}
                     />
                     {errors.client && (
                        <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                           {errors.client.message as string}
                        </p>
                     )}
                  </div>
               </div>
            )}
         </div>
         <DialogFooter>
                     <div className="flex justify-between p-4">
                        <Button
                           variant={'destructiveOutline'}
                           className="flex gap-1"
                        >
                           Discard
                           <ClipboardX className="w-4 h-4" />
                        </Button>
                        <Button
                           type="submit"
                           variant={'submit'}
                           className="flex gap-1"
                        >
                           { mode === 'upload' && 'Upload' } 
                           { mode === 'link' && 'Add' } 
                           <ArrowUpFromLine className="w-4 h-4" />
                        </Button>
                     </div>
                  </DialogFooter>
      </>
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
         className="w-full px-5 py-2"
         onValueChange={(value) => setMode(value)}
         value={mode}
      >
         <TabsList className="bg-foreground w-full flex">
            <TabsTrigger value="upload" className="w-1/2 text-base">
               Upload
            </TabsTrigger>
            <TabsTrigger value="link" className="w-1/2 text-base">
               Add by URL
            </TabsTrigger>
         </TabsList>
      </Tabs>
   );
};

const FileUploadField = <TFieldValues extends FieldValues>({
   formMethods,
}: InputProps<TFieldValues>): JSX.Element => {
   const [isUploaded, setIsUploaded] = useState(false);
   const [fileExtension, setFileExtension] = useState('');
   const [fileLabel, setFileLabel] = useState('');

   const { setValue } = formMethods;

   const inputRef = useRef<HTMLInputElement>(null);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current?.files?.length) {
         const file = event.target.files![0];
         const fileExtension = file.name.split('.').pop()?.toLowerCase();
         setFileExtension(fileExtension);
         setFileLabel(file.name);
         setIsUploaded(true);
         setValue(
            'file' as Path<TFieldValues>,
            file as PathValue<TFieldValues, Path<TFieldValues>>
         );
      }
   };

   const handleUploadClick = () => {
      inputRef.current?.click();
   };

   const handleDropFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsUploaded(false);
   };

   return (
      <div className="px-5 cursor-default">
         {isUploaded ? (
            <div
               className="relative flex border border-freelanceman-darkgrey rounded-md h-12 items-center justify-center  cursor-pointer text-freelanceman-darkgrey bg-freelanceman-blue"
               onClick={handleUploadClick}
            >
               <div className="flex gap-1 items-center w-full px-5 truncate justify-center">
                  <FileIconByExtension
                     fileExtension={fileExtension}
                     className="w-4 h-4"
                  />
                  <p>{fileLabel}</p>
               </div>
               <X
                  className="absolute top-1 right-1 h-4 w-4"
                  onClick={handleDropFile}
               />
            </div>
         ) : (
            <div
               className="flex border border-secondary border-dashed rounded-md h-12 items-center justify-center text-secondary cursor-pointer bg-transparent"
               onClick={handleUploadClick}
            >
               Click to upload
            </div>
         )}
         <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
         />
      </div>
   );
};

const fileCategorySelections = [
   { value: 'project-document', label: 'Project Document' },
   { value: 'project-assets', label: 'Project Assets' },
   { value: 'project-file', label: 'Working File' },
   { value: 'client-file', label: 'Client File' },
   { value: 'personal', label: 'Personal' },
];

const fileTypeSelections = [
   { value: 'image', label: 'Image' },
   { value: 'video', label: 'Video' },
   { value: 'document', label: 'Document' },
   { value: 'code', label: 'Code' },
   { value: 'design', label: 'Design' },
   { value: 'spreadsheet', label: 'Spreadsheet' },
   { value: 'presentation', label: 'Presentation' },
   { value: 'audio', label: 'Audio' },
   { value: 'archive', label: 'Archive' },
   { value: 'video-editing', label: 'Video Editing' },
   { value: 'project-management', label: 'Project Management' },
   { value: 'database', label: 'Database' },
   { value: 'other', label: 'Other' },
];

export default FileDialog;
