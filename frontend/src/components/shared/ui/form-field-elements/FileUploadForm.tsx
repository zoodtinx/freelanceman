import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import React, { useState, useRef } from 'react';
import { Plus, Upload, X } from 'lucide-react';
import { FormElementProps, SelectFormElementProps } from '@/lib/types/form-element.type';
import { FileIconByExtension, FileIconByMimeType, getFileTypeFromMimeType } from '@/components/shared/ui/helpers/Helpers';
import { defaultFileValues } from '@/components/shared/ui/helpers/constants/default-values';
import { toast } from 'sonner';

export const FileUploadForm = <TFormData extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
}: FormElementProps<TFormData>): JSX.Element => {
   const {
      control,
      setValue,
      reset,
      formState: { errors },
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'Please select a status'
               : false,
         }}
         render={({ field }) => {
            const setFormValue = (value: File) => {
               field.onChange(value);
            };

            return (
               <div className={className}>
                  <FileUploadField
                     setFormValue={setFormValue}
                     resetForm={reset}
                     formMethods={formMethods}
                  />
                  {errors[fieldName] && (
                     <p className="text-red-500 font-normal animate-shake text-sm pt-1">
                     {errors[fieldName]?.message as string}
                  </p>
                  )}
               </div>
            );
         }}
      />
   );
};

const FileUploadField = ({
   setFormValue,
   resetForm,
   formMethods
}: {
   setFormValue: (file: File) => void;
   resetForm: (value: any) => void;
   formMethods: UseFormReturn<any>
}): JSX.Element => {
   const {setValue: setAdditionalValue, clearErrors} = formMethods
   
   const [isUploaded, setIsUploaded] = useState(false);
   const [fileMimeType, setFileMimeType] = useState<string | undefined>('');
   const [fileLabel, setFileLabel] = useState('');
   const [fileSize, setFileSize] = useState<string | undefined>();

   const inputRef = useRef<HTMLInputElement>(null);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      clearErrors()
      if (inputRef.current?.files?.length) {
         const file = event.target.files![0];

          if (file.size > 10 * 1024 * 1024) {
            toast.error('File exceed 10MB for demo version 😅')
            return;
          }

         const fileType = file.type
         setFileMimeType(fileType);
         setFileLabel(file.name);
         setFileSize(convertFileSize(file.size))
         setIsUploaded(true);
         
         setAdditionalValue('type', getFileTypeFromMimeType(file.type))
         setAdditionalValue('size', file.size)
         setAdditionalValue('displayName', file.name)
         setAdditionalValue('originalName', file.name)
         setFormValue(file)
      }
   };

   const handleUploadClick = () => {
      inputRef.current?.click();
   };

   const handleDropFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsUploaded(false);
      resetForm(defaultFileValues)
   };

   return (
      <div className="cursor-default">
         {isUploaded ? (
            <div
               className="relative flex py-3 border border-transparent bg-general-blue border-freelanceman-darkgrey rounded-md items-center justify-center  cursor-pointer text-freelanceman-darkgrey bg-freelanceman-blue"
               onClick={handleUploadClick}
            >
               <div className="flex flex-col leading-tight text-md items-center w-full px-5 truncate justify-center">
                  <FileIconByMimeType
                     mimeType={fileMimeType}
                     className="w-5 h-5 mb-1"
                  />
                  <p className='font-semibold truncate w-full text-center'>{fileLabel}</p>
                  <p className='text-sm'>{fileSize}</p>
               </div>
               <X
                  className="absolute top-2 right-2 h-4 w-4"
                  onClick={handleDropFile}
               />
            </div>
         ) : (
            <div     
               className="flex flex-col gap-1 border border-secondary border-dashed rounded-md py-2 items-center justify-center text-secondary cursor-pointer bg-transparent"
               onClick={handleUploadClick}
            >
               <Upload className='w-5 h-5' />
               <p>Upload a file</p>
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

const convertFileSize = (size: number): string => {
   if (size < 1024) {
      return `${size} B`;
   } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
   } else if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
   } else {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
   }
}