import { InputProps } from 'src/lib/types/form-input-props.types';
import { Pencil } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { FieldValues, Path, PathValue, RegisterOptions } from 'react-hook-form';

const TaskNameInput = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
}: InputProps<TFieldValues>): JSX.Element => {
   const {
      register,
      setValue,
      clearErrors,
      getValues,
      formState: { errors },
   } = formMethods;

   const registerWithRef = register as unknown as {
      (name: Path<TFieldValues>, options?: RegisterOptions): {
         onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
         onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
         ref: (el: HTMLElement | null) => void;
      };
   };

   const taskName = getValues('name' as Path<TFieldValues>);
   const inputRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (
         (dialogState?.mode === 'create' || dialogState?.mode === 'edit') &&
         inputRef.current
      ) {
         inputRef.current.textContent =
            dialogState.mode === 'create' ? '' : taskName || '';
         setValue(
            'name' as Path<TFieldValues>,
            '' as PathValue<TFieldValues, Path<TFieldValues>>
         );
         inputRef.current.focus();
      }
   }, [dialogState, taskName, setValue]);

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
               contentEditable="true"
               role="textbox"
               data-placeholder="Enter name"
               onInput={handleInput}
               {...{
                  ...registerWithRef('name' as Path<TFieldValues>, {
                     required: 'Name is required',
                  }),
                  ref: undefined,
               }}
               ref={(el) => {
                  inputRef.current = el;
                  if (registerWithRef('name' as Path<TFieldValues>).ref) {
                     registerWithRef('name' as Path<TFieldValues>).ref(el);
                  }
               }}
            ></div>
            <div className="absolute right-2 text-secondary transition-colors duration-150 peer-focus:text-primary group-hover:text-primary">
               <Pencil className="h-[18px] w-auto" />
            </div>
         </div>
         {errors.name && (
            <p className="mt-1 text-lg text-red-500 font-normal animate-shake pt-1 text-sm">
               {typeof errors.name?.message === 'string'
                  ? errors.name.message
                  : ''}
            </p>
         )}
      </div>
   );
};

export default TaskNameInput;
