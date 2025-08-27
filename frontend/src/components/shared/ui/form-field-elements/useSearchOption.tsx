import { useState } from "react";
import debounce from 'lodash/debounce';

type Type = 'client' | 'project'

export const useSearchOption = (type: Type) => {
   const [searchTerm, setSearchTerm] = useState({})

   const handleSearch = debounce((value: string) => {
      if (type === 'project') {
         setSearchTerm({ name: value });
      } else if (type === 'client') {
         setSearchTerm({ name: value });
      }
   }, 300);

   return {searchTerm, handleSearch}
}