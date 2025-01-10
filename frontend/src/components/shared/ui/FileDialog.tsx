import LinkInputForm from '@/components/shared/ui/form-field-elements/LinkInputForm';
import SelectForm from '@/components/shared/ui/form-field-elements/SelectForm';
import { FileCategory } from '@types';
import { FileIconByExtension } from '@/components/page-elements/files/Helpers';
import {
   Tabs,
   TabsList,
   TabsTrigger,
} from 'src/components/shared/ui/primitives/Tabs';
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
import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from './primitives/Dialog';
import { Button } from './primitives/Button';
import { Input } from './primitives/Input';
import { CircleCheck, ClipboardX, Upload, X } from 'lucide-react';
import { InputProps } from '@/lib/types/form-input-props.types';
import { DialogProps } from '@/lib/types/dialog.types';
import { defaultFile } from '@/components/shared/ui/primitives/utils';

const FileDialog: React.FC<DialogProps> = ({ dialogState, setDialogState }) => {
   const [mode, setMode] = useState('upload');
   const formMethods = useForm({
      defaultValues: defaultFile
   });
   const {
      handleSubmit,
      reset,
      register,
      watch,
      formState: { errors },
   } = formMethods;

   const categoryValue = watch('category');

   const handleDialogueClose = () => {
      setDialogState({
         isOpen: false,
         id: '',
         mode: 'create',
         type: 'file',
         data: {},
      });
   };

   useEffect(() => {
      reset({ fileName: '', description: '' });
   }, [dialogState, reset]);

   const onSubmit: SubmitHandler<{
      fileName: string;
      description: string;
      category: string;
      client?: string;
      project?: string;
   }> = (data) => {
      const { category, client, project } = data;

      console.log('love')

      if (
         category === 'project-document' ||
         category === 'project-assets' ||
         category === 'project-file'
      ) {
         if (!project) {
            formMethods.setError('project', {
               type: 'manual',
               message: 'Project name is required for this category',
            });
         }
         if (!client) {
            formMethods.setError('client', {
               type: 'manual',
               message: 'Client name is required for this category',
            });
         }
      } else if (category === 'client-file') {
         if (!client) {
            formMethods.setError('client', {
               type: 'manual',
               message: 'Client name is required for client files',
            });
         }
      } else {
         formMethods.clearErrors(['client', 'project']);
      }

      if (Object.keys(formMethods.formState.errors).length === 0) {
         console.log('File saved:', data);
      }
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Open File Dialog
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-freelanceman-darkgrey text-foreground">
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1 text-white">
                  <Upload className="w-[13px] h-[13px]" />
                  <p>Add File</p>
               </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="bg-background rounded-2xl text-primary">
                  <div className="pt-3">
                     <ModeSelect setMode={setMode} mode={mode} />
                  </div>
                  {mode === 'upload' && (
                     <FileUploadField formMethods={formMethods} />
                  )}
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
                           <SelectForm
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
                     {(categoryValue === 'project-document' ||
                        categoryValue === 'project-assets' ||
                        categoryValue === 'project-file') && (
                        <div className="flex gap-2">
                           <div className="flex flex-col leading-5 w-1/2">
                              <p className="text-secondary">Project</p>
                              <Input
                                 {...register('project', {
                                    required: 'Project name is required',
                                 })}
                                 placeholder="Enter project name"
                                 className="w-full"
                              />
                              {errors.project && (
                                 <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                                    {errors.project.message as string}
                                 </p>
                              )}
                           </div>
                           <div className="flex flex-col leading-5 w-1/2">
                              <p className="text-secondary">Client</p>
                              <Input
                                 {...register('client', {
                                    required: 'Client name is required',
                                 })}
                                 placeholder="Enter client name"
                                 className="w-full"
                              />
                              {errors.client && (
                                 <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                                    {errors.client.message as string}
                                 </p>
                              )}
                           </div>
                        </div>
                     )}

                     {categoryValue === 'client-file' && (
                        <div className="flex flex-col leading-5 w-1/2">
                           <p className="text-secondary">Client</p>
                           <Input
                              {...register('client', {
                                 required: 'Client name is required',
                              })}
                              placeholder="Enter client name"
                              className="w-full"
                           />
                           {errors.client && (
                              <p className="mt-1 text-sm text-red-500 font-normal">
                                 {errors.client.message as string}
                              </p>
                           )}
                        </div>
                     )}
                  </div>
                  <DialogFooter>
                     <div className="flex justify-between p-4">
                        <Button
                           variant={'destructiveOutline'}
                           onClick={handleDialogueClose}
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
                           Save
                           <CircleCheck className="w-4 h-4" />
                        </Button>
                     </div>
                  </DialogFooter>
               </div>
            </form>
         </DialogContent>
      </Dialog>
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
      inputRef.current?.click(); // Trigger file input when div is clicked
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
