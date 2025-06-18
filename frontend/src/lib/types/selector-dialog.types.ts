import { UseQueryResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export interface SelectObject {
   label: string;
   value: string;
   detail?: string;
   id: string;
}

export interface FilterSelectObject {
   label: string;
   value: string;
}

export interface SelectObject {
   label: string;
   value: string;
   detail?: string;
   id: string;
}

export interface SelectorDialogState {
   isOpen: boolean;
   type: 'file' | 'contact';
   projectId: string;
   selected: SelectObject[];
   option?: any;
   tab: 'client' | 'partner',
   mode: 'view' | 'select'
}

export interface SelectionListProps {
   selected: SelectObject[];
   setSelected: Dispatch<SetStateAction<SelectObject[]>>;
   queryResult: UseQueryResult
}

export interface SelectedListProps {
   selected: SelectObject[];
   setSelected: Dispatch<SetStateAction<SelectObject[]>>;
   setMode: Dispatch<SetStateAction<'select' | 'view'>>;
}

export interface SelectedItemProps {
   data: SelectObject;
   isSelected: boolean;
   onCheckedChange: (e: any) => void;
}
