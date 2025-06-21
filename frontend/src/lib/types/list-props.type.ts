import { UseQueryResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';


export interface ListProps<Response, Filter> {
   addFn: () => void;
   filter: Filter;
   setFilter: Dispatch<SetStateAction<Filter>>;
   page?: string;
   loader?: 'skeleton' | 'spinner';
   className?: string;
   queryResult: UseQueryResult<Response>;
}
