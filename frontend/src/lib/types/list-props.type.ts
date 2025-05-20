import { Dispatch, SetStateAction } from 'react';

export interface ListProps<T> {
   addFn: () => void;
   filter: T;
   setFilter: Dispatch<SetStateAction<T>>;
   page?: string;
   loader?: 'skeleton' | 'spinner'
   className?: string
}
