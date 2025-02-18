import { useRef, useEffect } from 'react';
import * as React from 'react';
import { SelectItem } from '@/components/shared/ui/primitives/Selection';


const AsyncSelectionList: React.FC<{
   selectContents: { value: string; label: string }[] | undefined;
   isLoading: boolean;
   onValueChange: (value: string) => void;
   selectedValue?: string;
}> = ({
   selectContents,
   isLoading,
   onValueChange,
   handleDialogClose,
}) => {
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
         ) {
            handleDialogClose();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [handleDialogClose]);

   let content;
   if (isLoading) {
      content = (
         <div className="text-gray-500 text-sm px-2 py-2">Loading...</div>
      );
   } else if (selectContents && selectContents.length > 0) {
      content = selectContents.map((selection) => (
         <SelectItem
            value={selection.value}
            key={selection.value}
            className="px-2 mr-2 rounded cursor-pointer hover:bg-gray-200"
         >
            <p className="w-full pr-5 line-clamp-2">{selection.label}</p>
         </SelectItem>
      ));
   } else {
      content = (
         <div className="text-gray-500 text-sm px-2 py-2">No results found</div>
      );
   }

   return (
      <div className="max-h-[250px] pr-2 overflow-y-auto overflow-x-hidden">
         {content}
      </div>
   );
};

export default AsyncSelectionList