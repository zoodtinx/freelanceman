import { FieldValues, Path } from "react-hook-form";
import { InputProps } from "./props.type";

const LinkInput = <TFieldValues extends FieldValues = FieldValues>({
   register,
}: InputProps<TFieldValues>): JSX.Element => {
   return (
      <input
         type="url"
         {...register?.('link' as Path<TFieldValues>, { required: 'Please enter link' })}
         className="flex px-2 h-6 w-full border border-secondary rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
         placeholder="Enter your link"
      />
   );
};
export default LinkInput;