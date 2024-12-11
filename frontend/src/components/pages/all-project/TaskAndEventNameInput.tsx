import { InputProps } from "@/components/shared/ui/form/props.type";
import { Pencil } from "lucide-react";
import { useEffect, useRef } from "react";
import { FieldValues } from "react-hook-form";

const TaskNameInput = <TFieldValues extends FieldValues = FieldValues>({
   register,
   setValue,
}: InputProps<TFieldValues>): JSX.Element => {
   const inputRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      // Focus on the `contentEditable` element when the component mounts
      inputRef.current?.focus();
   }, []);

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
