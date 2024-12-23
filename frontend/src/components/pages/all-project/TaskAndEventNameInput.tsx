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
      if (dialogState?.mode === 'create') {
         inputRef.current?.focus();
      }
   }, [dialogState, errors.name]);

   useEffect(() => {
      if (inputRef.current && taskName !== inputRef.current.textContent) {
         inputRef.current.textContent = taskName;
      }
   }, [taskName]);
   
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

   return (
      <div>
         <div className="group w-full relative flex">
            <div
               suppressContentEditableWarning
               className="peer w-full rounded-md focus:outline-none order-2 break-words whitespace-pre-wrap pr-7"
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
            <div className="w-[0px] shrink-0 text-secondary overflow-hidden peer-focus:w-[25px] peer-focus:text-primary group-hover:w-[25px] transition-all duration-100 order-1">
               <Pencil className="h-[18px] w-auto" />
            </div>
         </div>
         {errors.name && (
            <p className="mt-1 text-sm text-red-500 font-normal animate-shake pt-1">
               {typeof errors.name?.message === 'string'
                  ? errors.name.message
                  : ''}
            </p>
         )}
      </div>
   );
};

export default TaskNameInput;