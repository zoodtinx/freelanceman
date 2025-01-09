import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from 'src/components/shared/ui/primitives/Tabs';
import { Separator } from './primitives/Separator';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
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
import { Textarea } from './primitives/Textarea';
import { CircleCheck, ClipboardX, Upload, X } from 'lucide-react';

const FileDialog = ({ dialogState, setDialogState }) => {
   const [mode, setMode] = useState<'upload' | 'link'>('upload');
   const formMethods = useForm({
      defaultValues: { fileName: '', description: '' },
   });
   const {
      handleSubmit,
      reset,
      register,
      formState: { errors },
   } = formMethods;

   const handleDialogueClose = () => {
      setDialogState({
         isOpen: false,
         id: '',
         mode: 'create',
         type: 'file',
      });
   };

   useEffect(() => {
      reset({ fileName: '', description: '' });
   }, [dialogState, reset]);

   const onSubmit: SubmitHandler<{ fileName: string; description: string }> = (
      data
   ) => {
      console.log('File saved:', data);
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Open File Dialog
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-primary text-foreground">
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle
                  className={`flex text-base w-full text-center items-center gap-1`}
               >
                  <Upload className="w-[13px] h-[13px]" />
                  <p>Add File</p>
               </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="bg-background rounded-2xl text-primary">
                  <ModeSelect />
                  <div className="px-5 cursor-default">
                     <div className="flex border border-secondary border-dashed rounded-md h-12 items-center justify-center text-secondary bg-foreground">
                        Click to upload
                     </div>
                  </div>
                  <div className="flex flex-col p-5 pt-3 gap-2">
                     <div className="flex flex-col leading-5">
                        <p className="text-secondary">File Name</p>
                        <Input
                           {...register('fileName', {
                              required: 'File name is required',
                           })}
                           placeholder="Enter file name"
                           className="w-full"
                        />
                        {errors.fileName && (
                           <p className="mt-1 text-sm text-red-500 font-normal">
                              {errors.fileName.message}
                           </p>
                        )}
                     </div>
                     <div className="flex gap-2">
                        <div className="flex flex-col leading-5 w-1/2">
                           <p className="text-secondary">Project</p>
                           <Input
                              {...register('fileName', {
                                 required: 'File name is required',
                              })}
                              placeholder="Enter file name"
                              className="w-full"
                           />
                           {errors.fileName && (
                              <p className="mt-1 text-sm text-red-500 font-normal">
                                 {errors.fileName.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col leading-5 w-1/2">
                           <p className="text-secondary">Client</p>
                           <Input
                              {...register('fileName', {
                                 required: 'File name is required',
                              })}
                              placeholder="Enter file name"
                              className="w-full"
                           />
                           {errors.fileName && (
                              <p className="mt-1 text-sm text-red-500 font-normal">
                                 {errors.fileName.message}
                              </p>
                           )}
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <div className="flex flex-col leading-5 w-1/2">
                           <p className="text-secondary">Type</p>
                           <Input
                              {...register('fileName', {
                                 required: 'File name is required',
                              })}
                              placeholder="Enter file name"
                              className="w-full"
                           />
                           {errors.fileName && (
                              <p className="mt-1 text-sm text-red-500 font-normal">
                                 {errors.fileName.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col leading-5 w-1/2">
                           <p className="text-secondary">Category</p>

                           <Input
                              {...register('fileName', {
                                 required: 'File name is required',
                              })}
                              placeholder="Enter file name"
                              className="w-full"
                           />
                           {errors.fileName && (
                              <p className="mt-1 text-sm text-red-500 font-normal">
                                 {errors.fileName.message}
                              </p>
                           )}
                        </div>
                     </div>
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

const ModeSelect = (): JSX.Element => {
   return (
      <Tabs defaultValue="account" className="w-full px-5 py-2">
         <TabsList className="bg-foreground w-full flex">
            <TabsTrigger value="account" className="w-1/2 text-base">
               Upload
            </TabsTrigger>
            <TabsTrigger value="password" className="w-1/2 text-base">
               Add by URL
            </TabsTrigger>
         </TabsList>
      </Tabs>
   );
};

export default FileDialog;
