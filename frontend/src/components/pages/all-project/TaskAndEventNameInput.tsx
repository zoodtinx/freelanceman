import { InputProps } from "@/components/shared/ui/form/props.type";
import { useActionsViewContext } from "@/lib/context/ActionsViewContext";
import { Pencil } from "lucide-react";
import { useEffect, useRef } from "react";
import { FieldValues } from "react-hook-form";

const TaskNameInput = <TFieldValues extends FieldValues = FieldValues>({
   register,
   setValue,
   value,
 }: InputProps<TFieldValues> & { value: string }): JSX.Element => {
   const inputRef = useRef<HTMLDivElement | null>(null);
 
   const { isEventDialogOpen } = useActionsViewContext();

   if (isEventDialogOpen.mode === 'create') {
      inputRef.current?.focus();
   }

   useEffect(() => {
     if (inputRef.current && value !== inputRef.current.textContent) {
       inputRef.current.textContent = value;
     }
   }, [value]);
 
   return (
     <div className="group w-full relative flex">
       <div
         suppressContentEditableWarning
         className="peer w-full rounded-md focus:outline-none order-2 break-words whitespace-pre-wrap pr-7"
         contentEditable="true"
         role="textbox"
         data-placeholder="New task name"
         onInput={(e) => setValue('name', e.currentTarget.textContent || '')} // Update form value
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
   );
 };

export default TaskNameInput;
