import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { InputProps } from '@/lib/types/form-input-props.types';
import { Upload } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/helper/utils';

export const AvatarInputForm = ({ formMethods }: InputProps) => {
   const {
      control,
      getValues,
      formState: { errors },
   } = formMethods;

   const avatarFileKey = getValues('avatar');
   const { data, isLoading } = useFileUrlQuery(
      avatarFileKey,
      Boolean(avatarFileKey)
   );

   if (isLoading) {
      return <Skeleton className="w-[125px] h-[125px] rounded-full" />;
   }

   return (
      <Controller
         name="avatarFile"
         control={control}
         render={({ field }) => (
            <AvatarInput
               field={field}
               errors={errors.avatar}
               avatarFileKey={avatarFileKey}
               previewUrl={data?.url}
            />
         )}
      />
   );
};

interface AvatarInputProps {
   field: {
      onChange: (file: File) => void;
      value: File | null;
   };
   avatarFileKey: string;
   previewUrl?: string;
   errors?: any;
}

const AvatarInput = ({ field, avatarFileKey, previewUrl, errors }: AvatarInputProps) => {
   const [avatarImage, setAvatarImage] = useState<string | undefined>(previewUrl);
   const MAX_SIZE = 2 * 1024 * 1024;

   useEffect(() => {
      if (previewUrl) {
         setAvatarImage(previewUrl);
      }
   }, [previewUrl]);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > MAX_SIZE) {
         toast.error('Oops! Files over 2MB aren’t allowed in this demo');
         return;
      }

      field.onChange(file);

      const reader = new FileReader();
      reader.onload = () => {
         if (reader.result) setAvatarImage(reader.result as string);
      };
      reader.onerror = () => {
         console.error('Error reading the file.');
      };
      reader.readAsDataURL(file);
   };

   return (
      <div className="flex flex-col items-center gap-2">
         <div
            className={cn(
               'relative w-[125px] h-[125px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer',
               avatarFileKey ? '' : 'mr-3 mt-2 bg-tertiary text-secondary'
            )}
            onClick={() => document.getElementById('avatar-upload')?.click()}
         >
            {avatarImage ? (
               <>
                  <img
                     src={avatarImage}
                     alt="Avatar Preview"
                     className="w-full h-full object-cover bg-tertiary"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                     <span className="text-white text-sm font-medium mb-2">Edit</span>
                  </div>
               </>
            ) : (
               <Upload className="w-10 h-10" />
            )}
         </div>
         <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            onChange={handleFileChange}
         />
         {errors && (
            <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
               {errors.message as string}
            </p>
         )}
      </div>
   );
};
