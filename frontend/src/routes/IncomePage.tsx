import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusSelect from '@/components/shared/ui/select/StatusSelect';
import { paymentStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { cn } from '@/lib/helper/utils';
import { Delete, Download, Edit, FileText, Loader, Plus, Trash } from 'lucide-react';
import {
   usePaymentDataQuery,
   usePaymentStatsQuery,
} from 'src/lib/api/payment-api';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { ClientFilterBubble } from '@/components/page-elements/all-projects/ProjectFilterBar';
import {
   PaymentDataPayload,
   SalesDocumentPayload,
} from 'freelanceman-common/src/schemas';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import IncomePageLoader from '@/components/shared/ui/placeholder-ui/IncomePageLoader';
import { FilterSelect } from '@/components/shared/ui/select/FilterSelect';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { toast } from 'sonner';
import { useEditProject } from '@/lib/api/project-api';
import { ProjectFilterDto } from 'freelanceman-common';
import { useDeleteSalesDocument } from '@/lib/api/sales-document-api';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { capitalizeFirstChar } from '@/components/shared/ui/helpers/Helpers';

const IncomePage: React.FC = () => {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      paymentStatus: 'unpaid',
   });
   const { data: projectData, isLoading } = usePaymentDataQuery(projectFilter);

   return (
      <section className="flex flex-col gap-2 w-full h-full sm:flex-col">
         <div className="flex justify-between">
            <StatsBar />
            <FilterBar
               projectFilter={projectFilter}
               setProjectFilter={setProjectFilter}
            />
         </div>
         <ProjectPaymentTabList
            projectData={projectData}
            isLoading={isLoading}
         />
      </section>
   );
};

const FilterBar = ({
   projectFilter,
   setProjectFilter,
}: {
   projectFilter: ProjectFilterDto;
   setProjectFilter: any;
}) => {
   const handleStatusValueChange = (value: string) => {
      setProjectFilter((prev: any) => {
         return {
            ...prev,
            paymentStatus: value,
         };
      });
   };

   return (
      <div className="flex gap-1">
         <FilterSelect
            selectContents={[
               { label: 'Due', value: 'unpaid' },
               { label: 'Paid', value: 'paid' },
            ]}
            onValueChange={handleStatusValueChange}
            value={projectFilter.paymentStatus}
            placeholder="Payment Status"
         />
         <ClientFilterBubble
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
         />
         <SearchBox className="w-fit" />
      </div>
   );
};

const StatsBar = () => {
   const { data: statsData, isLoading } = usePaymentStatsQuery();

   return (
      <div className="flex gap-4">
         <div className="text-secondary flex gap-2 items-center">
            Unprocessed:{' '}
            {isLoading ? (
               <Skeleton className="h-5 w-20 rounded-full" />
            ) : (
               <span className="text-md font-medium text-primary">
                  {statsData?.unprocessed.toLocaleString()}
               </span>
            )}
         </div>
         <div className="text-secondary flex gap-2 items-center">
            Processing:{' '}
            {isLoading ? (
               <Skeleton className="h-5 w-20 rounded-full" />
            ) : (
               <span className="text-md font-medium text-primary">
                  {statsData?.processing.toLocaleString()}
               </span>
            )}
         </div>
         <div className="text-secondary flex gap-2 items-center">
            All Amount Due:{' '}
            {isLoading ? (
               <Skeleton className="h-5 w-20 rounded-full" />
            ) : (
               <span className="text-md font-medium text-primary">
                  {statsData?.allAmountDue.toLocaleString()}
               </span>
            )}
         </div>
      </div>
   );
};

const ProjectPaymentTabList = ({
   projectData,
   isLoading,
}: {
   projectData?: PaymentDataPayload[];
   isLoading: boolean;
}) => {
   const projectList = projectData?.map((project) => {
      return <ProjectPaymentTab key={project.id} project={project} />;
   });

   return (
      <div className="flex flex-col gap-2 w-full h-0 grow overflow-y-auto pb-2 px-1">
         {isLoading ? (
            <IncomePageLoader />
         ) : (
            <>
               {projectList}
               <div className="flex w-full justify-center">Load More</div>
            </>
         )}
      </div>
   );
};

const ProjectPaymentTab = ({ project }: { project: PaymentDataPayload }) => {
   const editProject = useEditProject({
      successCallback() {
         toast.success('Payment status updated');
      },
      errorCallback() {
         toast.error('Error updating payment status');
      },
   });

   const handlePaymentStatusChange = (value: string) => {
      editProject.mutate({ id: project.id, paymentStatus: value });
   };

   return (
      <div
         className={cn(
            'flex w-full bg-foreground rounded-2xl p-3 shadow-md h-[100px] items-center shrink-0',
            project.paymentStatus === 'paid' && 'bg-tertiary shadow-none'
         )}
      >
         <div className="flex flex-col gap-2 w-0 grow leading-snug justify-between h-full">
            <div>
               <p className="text-sm text-secondary">{project.client.name}</p>
               <p className="text-lg">{project.title}</p>
            </div>
            <div className="flex gap-1">
               <DocumentButton type="quotation" project={project} />
               <DocumentButton type="invoice" project={project} />
               <DocumentButton type="receipt" project={project} />
            </div>
         </div>
         <div className="flex flex-col gap-1 items-end h-full leading-tight pr-2">
            <div className="flex text-[22px] pr-1 grow items-center">
               <p className="text-[22px]">
                  {project.budget.toLocaleString()}
                  <span className="text-sm">.-</span>
               </p>
            </div>
            <StatusSelect
               selections={paymentStatusSelections}
               value={project.paymentStatus}
               handleValueChange={handlePaymentStatusChange}
               className="bg-transparent border border-secondary"
            />
         </div>
      </div>
   );
};

const DocumentButton = ({
   type,
   project,
}: {
   type: 'quotation' | 'invoice' | 'receipt';
   project: PaymentDataPayload;
}) => {
   const haveDocument = project.salesDocuments?.some(
      (doc) => doc.category === type
   );

   const salesDocumentData = project.salesDocuments?.find(
      (doc) => doc.category === type
   );

   if (haveDocument) {
      return (
         <EditDocumentButton
            salesDocumentData={salesDocumentData as SalesDocumentPayload}
         />
      );
   } else {
      return <AddDocumentButton type={type} project={project} />;
   }
};

const AddDocumentButton = ({
   type,
   project,
}: {
   type: string;
   project: PaymentDataPayload;
}) => {
   const navigate = useNavigate();
   const label = type.charAt(0).toUpperCase() + type.slice(1);
   const isPaid = project.paymentStatus === 'paid';

   const handleClick = (type: string) => {
      switch (type) {
         case 'quotation':
            navigate(`/home/income/document/quotation/${project.id}`);
            break;
         case 'invoice':
            navigate(`/home/income/document/invoice/${project.id}`);
            break;
         case 'receipt':
            navigate(`/home/income/document/receipt/${project.id}`);
            break;
      }
   };

   return (
      <div
         onClick={() => handleClick(type)}
         className={cn(
            'flex gap-1 text-secondary border-tertiary border rounded-lg items-center pl-[8px] pr-[10px] py-[2px] cursor-pointer',
            'hover:text-primary hover:border-primary transition-colors duration-75',
            'dark:text-secondary dark:border-secondary dark:hover:text-primary dark:hover:border-primary',
            isPaid && 'text-secondary'
         )}
      >
         <Plus className="w-4 h-4" />
         {label}
      </div>
   );
};

const EditDocumentButton = ({
   salesDocumentData,
}: {
   salesDocumentData: SalesDocumentPayload;
}) => {
   const [fetch, setFetch] = useState(false);
   const { data: payload, isLoading } = useFileUrlQuery(
      salesDocumentData.fileKey ?? '',
      fetch
   );

   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   const deleteSalesDoc = useDeleteSalesDocument({
      successCallback() {
         toast.success('Sales document deleted');
      },
      errorCallback() {
         toast.error('Error deleting sales document');
      },
   });
   const navigate = useNavigate();
   const label =
      salesDocumentData.category.charAt(0).toUpperCase() +
      salesDocumentData.category.slice(1);

   const handleEdit = () => {
      navigate(`document/${salesDocumentData.id}`);
   };

   const handleDelete = () => {
      setConfirmationDialogState({
         actions: {
            primary: () => {
               deleteSalesDoc.mutate(salesDocumentData.id);
               setConfirmationDialogState((prev) => {
                  return { ...prev, isOpen: false };
               });
            },
         },
         entityName: `${salesDocumentData.category}`,
         isOpen: true,
         type: 'delete',
         appearance: {
            overlay: true,
            size: 'md',
         },
      });
      console.log('delete');
   };

   const handleDownload = async () => {
      if (!payload.url) return;

      window.open(payload.url, '_blank', 'noopener,noreferrer');
   };

   return (
      <Popover>
         <PopoverTrigger
            className="flex items-center"
            onClick={(e) => {
               e.stopPropagation();
               if (salesDocumentData.fileKey) {
                  setFetch(true);
               }
            }}
         >
            <div
               className={cn(
                  'flex gap-1 text-constant-primary border-transparent bg-theme-blue border rounded-lg items-center pl-[8px] pr-[10px] py-[2px]'
               )}
            >
               <FileText className="w-4 h-4" />
               {label}
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-[120px] cursor-default select-none bg-foreground gap-0">
            <button
               className="flex gap-1 items-center p-1 rounded-md cursor-pointer hover:bg-background"
               onClick={handleEdit}
            >
               <Edit className="h-4 w-4" />
               Edit
            </button>
            {!salesDocumentData.fileKey ? null : isLoading ? (
               <Loader className="animate-spin" />
            ) : (
               <button
                  onClick={handleDownload}
                  className="flex gap-1 items-center p-1 rounded-md cursor-pointer hover:bg-background"
               >
                  <Download className="h-4 w-4" />
                  Download
               </button>
            )}
            <button
               className="flex gap-1 items-center p-1 rounded-md cursor-pointer hover:bg-background"
               onClick={handleDelete}
            >
               <Trash className="h-4 w-4" />
               Delete
            </button>
         </PopoverContent>
      </Popover>
   );
};

export default IncomePage;
