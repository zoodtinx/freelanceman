import { InputProps } from 'src/lib/types/form-input-props.types';
import { Pencil } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';

const TaskNameInput = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
}: InputProps<TFieldValues>): JSX.Element => {
   const {
      setValue,
      clearErrors,
      getValues,
      formState: { errors },
   } = formMethods;

   const inputRef = useRef<HTMLDivElement | null>(null);

   const taskName = getValues('name' as Path<TFieldValues>);

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
      clearErrors('name' as Path<TFieldValues>);
      setValue(
         'name' as Path<TFieldValues>,
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
         <div className="w-full relative flex">
            <div
               suppressContentEditableWarning
               className="peer w-full rounded-md focus:outline-none break-words whitespace-pre-wrap pr-7 text-lg font-medium"
               contentEditable
               role="textbox"
               data-placeholder="Enter name"
               onInput={handleInput}
               ref={inputRef} // Use only one ref here
            ></div>
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
