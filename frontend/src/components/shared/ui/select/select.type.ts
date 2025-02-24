import { Dispatch, SetStateAction } from 'react';

export interface SelectItemContent {
   value: string;
   label: string;
}

export interface SelectComponentProps {
   selected: SelectItemContent | undefined;
   setSelected: Dispatch<SetStateAction<SelectItemContent | undefined>>;
   className?: string;
}
