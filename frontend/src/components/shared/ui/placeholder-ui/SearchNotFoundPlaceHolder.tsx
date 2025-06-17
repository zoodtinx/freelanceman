import { SearchX } from 'lucide-react';

const SearchNotFoundPlaceholder: React.FC<{
   children?: string;
}> = ({ children = 'No data match your search' }) => {
   return (
      <div className="flex flex-col items-center justify-center w-full h-full text-secondary gap-2">
         <SearchX className="w-14 h-14 stroke-[1.4px]" />
         <p className='text-md'>{children}</p>
      </div>
   );
};

export default SearchNotFoundPlaceholder;
