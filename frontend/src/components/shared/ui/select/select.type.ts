import { Dispatch, SetStateAction } from 'react';

export interface SelectedItem {
   value: string;
   label: string;
}

export interface SelectComponentProps {
   selected: SelectedItem | undefined;
   setSelected: Dispatch<SetStateAction<SelectedItem | undefined>>;
   className?: string;
}
