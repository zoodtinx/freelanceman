import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { InputProps } from '@/lib/types/form-input-props.types';
import { Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const AvatarInputForm = ({ formMethods }: InputProps) => {
   const {
      setValue,
      getValues,
      register,
      formState: { errors },
   } = formMethods;
   const avatarFileKey = getValues('avatar');
   const [avatarImage, setAvatarImage] = useState(avatarFileKey);
   const { data, isLoading } = useFileUrlQuery(
      avatarFileKey,
      Boolean(avatarFileKey)
   );

   console.log('data', data)

   useEffect(() => {
      if (data?.url) {
         setAvatarImage(data.url);
      }
   }, [data?.url]);

   const MAX_SIZE = 2 * 1024 * 1024; // 2MB

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const files = event.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];

      if (file.size > MAX_SIZE) {
         toast.error('File must not be larger than 2MB');
         return;
      }

      setValue('avatarFile', file)

      const reader = new FileReader();

      reader.onload = () => {
         if (reader.result) {
            setAvatarImage(reader.result);
         } else {
            console.warn('FileReader result is null.');
         }
      };

      reader.onerror = () => {
         console.error('Error reading the file.');
      };

      reader.readAsDataURL(file);
   };

   if (isLoading) {
      return <Skeleton className="w-[125px] h-[125px] rounded-full" />;
   }

   return (
      <div className="flex flex-col items-center gap-2">
         <div
            className={`relative w-[125px] h-[125px] ${
               avatarFileKey ? '' : 'mr-3 mt-2 bg-tertiary text-secondary'
            } rounded-full overflow-hidden flex items-center justify-center cursor-pointer`}
            onClick={() => document.getElementById('avatar-upload')?.click()}
         >
            {avatarImage ? (
               <>
                  <img
                     src={avatarImage}
                     alt="Avatar Preview"
                     className="w-full h-full object-cover bg-tertiary"
                  />
                  <div
                     className={`absolute inset-x-0 bottom-0 h-1/2 
                              bg-gradient-to-t from-black via-transparent to-transparent 
                              flex items-end justify-center 
                              opacity-0 group-hover:opacity-100 
                              transition-opacity duration-150`}
                  >
                     <span className="text-white text-sm font-medium mb-2">
                        Edit
                     </span>
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
            {...register('avatarFile', {
               onChange: (e) => {
                  handleFileChange(e);
               },
            })}
         />

         {errors.avatar && (
            <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
               {errors.avatar.message as string}
            </p>
         )}
      </div>
   );
};
