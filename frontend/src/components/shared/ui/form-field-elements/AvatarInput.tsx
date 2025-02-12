import { Upload } from 'lucide-react';
import { InputProps } from '@/lib/types/form-input-props.types';

const AvatarInput = ({ formMethods }: InputProps) => {
   const {
      setValue,
      watch,
      formState: { errors },
   } = formMethods;

   const avatarFile = watch('avatar');

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            setValue('avatar', reader.result, { shouldValidate: true });
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className="flex flex-col items-center gap-2">
         <div
            className={`relative w-[125px] h-[125px] ${
               avatarFile ? '' : 'mr-3 mt-2 bg-tertiary text-secondary'
            } rounded-full overflow-hidden flex items-center justify-center cursor-pointer`}
            onClick={() => document.getElementById('avatar-upload')?.click()}
         >
            {avatarFile ? (
               <>
                  <img
                     src={avatarFile}
                     alt="Avatar Preview"
                     className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center">
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
            onChange={handleFileChange}
         />
         {errors.avatar && (
            <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
               {errors.avatar.message as string}
            </p>
         )}
      </div>
   );
};

export default AvatarInput
