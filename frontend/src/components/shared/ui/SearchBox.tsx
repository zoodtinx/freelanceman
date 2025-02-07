import * as React from 'react';
import { cn } from '@/lib/helper/utils';
import { Search } from 'lucide-react';
import { CleanTextInput } from '@/components/shared/ui/primitives/CleanTextInput';
import { useState } from 'react';

export const SearchBox = React.forwardRef<
   HTMLInputElement,
   React.ComponentProps<'input'> & { placeholder?: string }
>(({ className, placeholder = 'Search', value, onChange, ...props }, ref) => {
   const [hasInput, setHasInput] = useState(!!value)

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasInput(!!e.target.value);
      if (onChange) {
         onChange(e);
      }
   }

   return (
      <div
         ref={ref}
         tabIndex={-1}
         className={cn(
            'group relative flex rounded-full h-7 gap-2 items-center border border-secondary bg-transparent px-2 py-1 focus-within:border-primary',
            className,
            { 'border-primary': hasInput }
         )}
         {...props}
      >
         <Search
            className={cn(
               'w-5 h-auto text-secondary group-focus-within:text-primary',
               { 'text-primary': hasInput }
            )}
         />
         <CleanTextInput
            className="w-full bg-transparent outline-none"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={value}
         />
      </div>
   );
});
SearchBox.displayName = 'SearchBox';
