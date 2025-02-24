import { useState } from "react";
import debounce from 'lodash/debounce';

type Type = 'client' | 'project'

const useSearchOption = (type: Type) => {
   const [searchTerm, setSearchTerm] = useState({})

   const handleSearch = debounce((value: string) => {
      if (type === 'project') {
         setSearchTerm({ title: value });
      } else if (type === 'client') {
         setSearchTerm({ name: value });
      }
   }, 300);

   return {searchTerm, handleSearch}
}

export default useSearchOption