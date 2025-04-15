import { DocumentDraftSelections } from 'src/components/shared/ui/helpers/constants/selections';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { FilePlus2, Plus, SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { FileList } from '@/components/page-elements/files/FileList';
import { useAllFilesQuery } from '@/lib/api/file-api';
import { FileFilterDto, SalesDocumentFilterDto } from '@schemas';
import { useSalesDocumentsQuery } from 'src/lib/api/sales-document-api';
import { DocumentDraftList } from '@/components/page-elements/documents/DocumentDraftList';
import MultiSelectButton from 'src/components/shared/ui/select/MultiSelectButton';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';

const DocumentPageViewMode: React.FC = () => {
   return (
      <div className="flex w-full gap-3 grow ">
         <FileSection />
         <DraftSection />
      </div>
   );
};

export const FileSection = () => {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);

   const [fileFilter, setFileFilter] = useState<FileFilterDto>({
      category: 'document',
   });

   console.log('DocumentPage')

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: filesData, isLoading } = useAllFilesQuery(fileFilter);

   const handleNewFile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'all-client-page',
         type: 'client-contact',
         data: defaultFileValues,
      });
   };

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
      useState<SalesDocumentFilterDto>({});

   const { data: documentDraftsData, isLoading } =
      useSalesDocumentsQuery(documentDraftFilter);

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
