import * as React from 'react';
import { cn } from '@/lib/helper/utils';
import { Search } from 'lucide-react';
import { CleanTextInput } from '@/components/shared/ui/primitives/CleanTextInput';

export const SearchBox = React.forwardRef<
   HTMLInputElement,
   React.ComponentProps<'input'> & { placeholder?: string }
>(({ className, placeholder = 'Search', value, onChange, ...props }, ref) => {
   return (
      <div
         ref={ref}
         tabIndex={-1}
         className={cn(
            'group relative flex gap-2 items-center rounded-lg border bg-transparent px-2 py-1 focus-within:border-primary',
            className
         )}
         {...props}
      >
         <Search className="w-5 h-auto text-secondary group-focus-within:text-primary" />
         <CleanTextInput
            className="w-full bg-transparent outline-none"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
         />
      </div>
   );
});
SearchBox.displayName = 'SearchBox';
