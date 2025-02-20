import { Input } from "@/components/shared/ui/primitives/Input";
import { Textarea } from "@/components/shared/ui/primitives/Textarea";
import { cn } from "@/lib/helper/utils";

export const TextInput: React.FC<{
   label: string;
   formMethods: any;
   fieldName: string;
   className?: string;
   type?: string;
}> = ({ label, formMethods, className, fieldName, type = 'text' }) => {
   const { register } = formMethods;

   return (
      <div className={cn(`flex flex-col`, className)}>
         <Input
            type={type}
            {...register(fieldName)}
            className="peer rounded-md order-2 w-full"
         />
         <label
            htmlFor=""
            className="text-secondary peer-focus:text-primary order-1 w-full text-sm"
         >
            {label}
         </label>
      </div>
   );
};

export const TextAreaInput: React.FC<{
   label: string;
   formMethods: any;
   fieldName: string;
   className?: string;
}> = ({ label, formMethods, className, fieldName }) => {
   const { register } = formMethods;

   return (
      <div className={cn(`flex flex-col h-full`, className)}>
         <Textarea
            type="text"
            {...register(fieldName)}
            className="peer rounded-md order-2 resize-none h-full "
         />
         <label
            htmlFor=""
            className="text-secondary peer-focus:text-primary order-1 text-sm"
         >
            {label}
         </label>
      </div>
   );
};

export const TextInputForm: React.FC<{
   formMethods: any;
   fieldName: string;
   className?: string;
   type?: string;
}> = ({ label, formMethods, className, fieldName, type = 'text' }) => {
   const { register } = formMethods;

   return (
      <div className={cn(`flex flex-col`, className)}>
         <Input
            type={type}
            {...register(fieldName)}
            className="rounded-md w-full bg-transparent py-1 px-2"
         />
      </div>
   );
};