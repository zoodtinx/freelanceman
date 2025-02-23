import { InputProps } from 'src/lib/types/form-input-props.types';
import { useEffect, useRef } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { cn } from '@/lib/helper/utils';
import { Pencil, PencilLine } from 'lucide-react';

const TaskNameInput = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
   className,
   placeholder,
   fieldName
}: InputProps<TFieldValues>): JSX.Element => {
   const {
      setValue,
      clearErrors,
      getValues,
      formState: { errors },
   } = formMethods;

   const inputRef = useRef<HTMLDivElement | null>(null);

   const taskName = getValues(fieldName as Path<TFieldValues>);

   useEffect(() => {
      if (
         (dialogState?.mode === 'create' || dialogState?.mode === 'edit') &&
         inputRef.current
      ) {
         inputRef.current.textContent = taskName;
         inputRef.current.focus();
      }
   }, [dialogState, taskName]);

   const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      clearErrors(fieldName as Path<TFieldValues>);
      setValue(
         fieldName as Path<TFieldValues>,
         e.currentTarget.textContent as PathValue<
            TFieldValues,
            Path<TFieldValues>
         >
      );
   };

   if (dialogState?.mode === 'view') {
      return (
         <div className="w-full">
            <p className="text-lg font-medium">
               {taskName || 'No name provided'}
            </p>
         </div>
      );
   }

   return (
      <div>
         <div className="w-full relative flex ">
            <div
               suppressContentEditableWarning
               className={cn("peer w-full rounded-md focus:outline-none break-words whitespace-pre-wrap pr-7 text-lg font-medium", className)}
               contentEditable
               role="textbox"
               data-placeholder={placeholder}
               onInput={handleInput}
               ref={inputRef} // Use only one ref here
            />
            <Pencil className='w-6 h-6 text-secondary' />
         </div>
         {errors.name && (
            <p className="mt-1 text-red-500 font-normal animate-shake pt-1 text-sm">
               {errors.name.message as string}
            </p>
         )}
      </div>
   );
};

export default TaskNameInput;
