import { FieldValues, Path } from "react-hook-form";
import { InputProps } from "./props.type";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const LinkInput = <TFieldValues extends FieldValues = FieldValues>({
   register,
   setValue,
   getValues,
}: InputProps<TFieldValues>): JSX.Element => {
   const [isButtonMode, setIsButtonMode] = useState(false);
   const [url, setUrl] = useState("");

   // Initialize the state based on the current value
   useEffect(() => {
      const currentUrl = getValues("link" as Path<TFieldValues>);
      if (currentUrl) {
         setUrl(currentUrl);
         setIsButtonMode(true);
      }
   }, [getValues]);

   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (inputValue) {
         setUrl(inputValue);
         setIsButtonMode(true);
      }
   };

   const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Prevent triggering the link
      setIsButtonMode(false);
      setValue("link" as Path<TFieldValues>, ""); // Reset the value in the form
   };

   const displayText = url.replace(/^https?:\/\//, ""); // Remove the protocol from the link

   return isButtonMode ? (
      <div className="flex justify-between items-center gap-2 px-2 py-1 font-medium text-blue-600 bg-blue-100 rounded-md">
         <Link
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            className="grow"
         >
            <span className="truncate">{displayText}</span>
         </Link>
         <button
            type="button"
            onClick={handleReset}
            className="text-gray-500"
            aria-label="Reset"
         >
            <X className="w-4 h-auto" />
         </button>
      </div>
   ) : (
      <input
         type="url"
         {...register?.("link" as Path<TFieldValues>, { required: "Please enter link" })}
         onBlur={handleBlur}
         className="flex px-2 h-6 w-full border border-secondary rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
         placeholder="Enter your link"
      />
   );
};

export default LinkInput;
