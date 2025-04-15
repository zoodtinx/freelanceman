import { Dispatch, SetStateAction } from 'react';

export interface SelectObject {
   id: string;
   value: string;
   detail?: string;
}

export interface SelectorDialogState {
   isOpen: boolean;
   type: 'file' | 'contact';
   selected: SelectObject[];
   setSelected: Dispatch<SetStateAction<SelectObject[]>>;
   option?: any;
}

export interface SelectionListProps {
   selected: SelectObject[];
   setSelected: Dispatch<SetStateAction<SelectObject[]>>;
   filter: any;
   setfilter: Dispatch<SetStateAction<any>>;
}

export interface FileSelectionItemProps {
   file: File;
   selected: SelectObject[];
   setSelected: Dispatch<SetStateAction<SelectObject[]>>;
}

export interface SelectedListProps {
   selected: SelectObject[];
   setSelected: Dispatch<SetStateAction<SelectObject[]>>;
   setMode: Dispatch<SetStateAction<'select' | 'view'>>;
}

export interface SelectedItemProps {
   data: SelectObject;
   isSelected: boolean;
   onCheckedChange: () => void;
}
