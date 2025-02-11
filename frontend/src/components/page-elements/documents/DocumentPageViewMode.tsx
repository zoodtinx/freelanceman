import { DocumentDraftSelections } from 'src/components/shared/ui/constants/selections';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { FilePlus2, Plus, SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { FileList } from '@/components/page-elements/files/FileList';
import { useAllFilesQuery } from '@/lib/api/file-api';
import { FileSearchOption, SalesDocumentSearchOption } from '@types';
import { useDocumentDraftQuery } from '@/lib/api/document-draft-api';
import { DocumentDraftList } from '@/components/page-elements/documents/DocumentDraftList';
import { FormDialogState } from '@/lib/types/dialog.types';
import MultiSelectButton from '@/components/shared/ui/MultiSelectButton';
import AddButton from '@/components/shared/ui/AddButton';
import { Dialog } from '@/components/shared/ui/primitives/Dialog';

const DocumentPageViewMode: React.FC = () => {
   return (
      <div className="flex w-full gap-3 grow ">
         <FileSection />
         <DraftSection />
      </div>
   );
};

export const FileSection = () => {
   const [fileDialogState, setFileDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'file',
      data: {},
      page: 'project-page',
   });

   const [fileFilter, setFileFilter] = useState<FileSearchOption>({
      category: 'document',
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: filesData, isLoading } = useAllFilesQuery(fileFilter);

   return (
      <div className="flex flex-col h-full pt-3">
         <div className="w-full flex mb-1 gap-1">
            <MultiSelectButton
               selectState={selectState}
               setSelectState={setSelectState}
            />
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Type"
               className="h-[25px] w-fit py-0 px-2"
            />
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Client"
               className="h-[25px] w-fit py-0 px-2"
            />
            <SearchBox className="h-[25px] w-fit py-0 px-2 rounded-full border-secondary" />
         </div>
         <FileList
            filesData={filesData}
            isLoading={isLoading}
            selectState={selectState}
            setDialogState={setFileDialogState}
            setSelectState={setSelectState}
            size="sm"
         />
      </div>
   );
};

export const DraftSection = () => {
   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const [documentDraftFilter, setDocumentDraftFilter] =
      useState<SalesDocumentSearchOption>({});

   const { data: documentDraftsData, isLoading } =
      useDocumentDraftQuery(documentDraftFilter);

   return (
      <div className="flex flex-col w-1/2 shadow-md border border-background rounded-xl p-2 py-1 dark:border-tertiary">
         <div className="flex items-center justify-between p-2 pr-1">
            <div className="flex items-center gap-1">
               <SquarePen className="w-5 h-5" />
               <p className="text-lg">Drafts</p>
            </div>
            <div
               className={`
                  flex gap-1 border border-primary rounded-lg p-1 px-2 items-center cursor-default
                  hover:bg-primary hover:text-foreground transition-colors duration-75 select-none`}
            >
               <FilePlus2 className="w-4 h-4" />
               <p className="text-sm font-medium">Create Document</p>
            </div>
         </div>
         <div className="w-full px-1 flex mb-1 gap-1">
            <MultiSelectButton
               selectState={selectState}
               setSelectState={setSelectState}
            />
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Type"
               className="h-[25px] w-fit py-0 px-2"
            />
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Client"
               className="h-[25px] w-fit py-0 px-2"
            />
            <SearchBox className="h-[25px] w-fit py-0 px-2 rounded-full border-secondary" />
         </div>
         <DocumentDraftList
            documentDraftData={documentDraftsData}
            isLoading={isLoading}
            selectState={selectState}
            setSelectState={setSelectState}
         />
         
      </div>
   );
};

export default DocumentPageViewMode;
