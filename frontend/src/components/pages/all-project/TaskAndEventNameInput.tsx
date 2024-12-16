import { InputProps } from '@/components/shared/ui/form/props.type';
import { useActionsViewContext } from '@/lib/context/ActionsViewContext';
import { ActionFormData } from '@types';
import { Pencil } from 'lucide-react';
import { useEffect, useRef } from 'react';

const TaskNameInput = ({
   formMethods,
   dialogState,
}: InputProps<ActionFormData>): JSX.Element => {
   const {
      register,
      setValue,
      clearErrors,
      getValues,
      formState: { errors },
   } = formMethods;
   
   const taskName = getValues('name');

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
      clearErrors('name'); 
      setValue('name', e.currentTarget.textContent || null);
   };

   return (
      <div>
         <div className="group w-full relative flex">
            <div
               suppressContentEditableWarning
               className="peer w-full rounded-md focus:outline-none order-2 break-words whitespace-pre-wrap pr-7"
               contentEditable="true"
               role="textbox"
               data-placeholder='Enter name'
               onInput={handleInput}
               {...{
                  ...register('name', { required: 'Name is required' }),
                  ref: undefined,
               }}
               ref={(el) => {
                  inputRef.current = el;
                  if (register?.ref) {
                     register.ref(el);
                  }
               }}
            ></div>
            <div className="w-[0px] shrink-0 text-secondary overflow-hidden peer-focus:w-[25px] peer-focus:text-primary group-hover:w-[25px] transition-all duration-100 order-1">
               <Pencil className="h-[18px] w-auto" />
            </div>
         </div>
         {errors.name && (
            <p className="mt-1 text-sm text-red-500 font-normal animate-shake pt-1">
               {errors.name.message}
            </p>
         )}
      </div>
   );
};

export default TaskNameInput;
