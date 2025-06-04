import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import React, {
   Dispatch,
   SetStateAction,
   useEffect,
   useRef,
   useState,
   forwardRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import StatusSelect from '@/components/shared/ui/select/StatusSelect';
import { paymentStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { cn } from '@/lib/helper/utils';
import { Download, Edit, FileText, Loader, Plus, Trash } from 'lucide-react';
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
import { PaymentDataFilter, PaymentDataListPayload } from 'freelanceman-common';
import { useDeleteSalesDocument } from '@/lib/api/sales-document-api';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import { UseQueryResult } from '@tanstack/react-query';
import { ApiErrorPlaceHolder } from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import IncomePagePlacholder from '@/components/shared/ui/placeholder-ui/IncomePagePlaceholder';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { defaultValues } from '@/components/shared/ui/helpers/constants/default-values';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import { useUserQuery } from '@/lib/api/user-api';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';

const IncomePage: React.FC = () => {
   const { data: userData } = useUserQuery();
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   if (userData?.visitingStatus?.incomePage === false) {
      setWelcomeDialogState({ isOpen: true, page: 'incomePage' });
   }

   const [projectFilter, setProjectFilter] = useState<PaymentDataFilter>({
      paymentStatus: 'unpaid',
   });
   const paymentDataQueryResult = usePaymentDataQuery(projectFilter);

   return (
      <section className="flex flex-col gap-2 w-full overflow-hidden sm:flex-col relative sm:gap-2">
         <div
            className={cn(
               'flex shrink-0 justify-between items-center bg-quaternary p-2 rounded-full pl-4  z-10',
               'sm:flex-col sm:bg-background sm:p-0'
            )}
         >
            <StatsBar />
            <FilterBar
               projectFilter={projectFilter}
               setProjectFilter={setProjectFilter}
            />
         </div>
         <ProjectPaymentTabList
            paymentDataQueryResult={paymentDataQueryResult}
            setFilter={setProjectFilter}
         />
      </section>
   );
};

const FilterBar = ({
   projectFilter,
   setProjectFilter,
}: {
   projectFilter: PaymentDataFilter;
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
      <div className="flex gap-1 sm:w-full sm:px-1">
         <FilterSelect
            selectContents={[
               { label: 'Due', value: 'unpaid' },
               { label: 'Paid', value: 'paid' },
            ]}
            onValueChange={handleStatusValueChange}
            value={projectFilter.paymentStatus ?? ''}
            placeholder="Payment Status"
         />
         <ClientFilterBubble
            projectFilter={projectFilter as any}
            setProjectFilter={setProjectFilter}
            className='max-w-20'
         />
         <SearchBox className="sm:grow" />
      </div>
   );
};

const StatsBar = () => {
   const { data: statsData, isLoading } = usePaymentStatsQuery();

   return (
      <div className="flex gap-3 sm:w-full sm:justify-between sm:px-2 sm:pb-2 items-center">
         <div
            className={cn(
               'text-secondary flex gap-2 items-center',
               'sm:flex-col sm:gap-0 sm:leading-snug sm:h-fit sm:items-start sm:flex-1'
            )}
         >
            <div>
               Unprocessed:{' '}
               {isLoading ? (
                  <Skeleton className="h-5 w-20 rounded-full" />
               ) : (
                  <span className="text-md font-medium text-primary">
                     {statsData?.unprocessed.toLocaleString()}
                  </span>
               )}
            </div>
         </div>
         <div
            className={cn(
               'text-secondary flex gap-2 items-center',
               'sm:flex-col sm:gap-0 sm:leading-snug sm:h-fit sm:items-start sm:flex-1'
            )}
         >
            <div>
               Processing:{' '}
               {isLoading ? (
                  <Skeleton className="h-5 w-20 rounded-full" />
               ) : (
                  <span className="text-md font-medium text-primary">
                     {statsData?.processing.toLocaleString()}
                  </span>
               )}
            </div>
         </div>
         <div
            className={cn(
               'text-secondary flex gap-2 items-center',
               'sm:flex-col sm:gap-0 sm:leading-snug sm:h-fit sm:items-start sm:flex-1'
            )}
         >
            <div>
               All Due:{' '}
               {isLoading ? (
                  <Skeleton className="h-5 w-20 rounded-full" />
               ) : (
                  <span className="text-md font-medium text-primary">
                     {statsData?.allAmountDue.toLocaleString()}
                  </span>
               )}
            </div>
         </div>
      </div>
   );
};

const ProjectPaymentTabList = ({
   paymentDataQueryResult,
   setFilter,
}: {
   paymentDataQueryResult: UseQueryResult<PaymentDataListPayload>;
   setFilter: Dispatch<SetStateAction<PaymentDataFilter>>;
}) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const {
      data: projectData,
      isLoading,
      isError,
      refetch,
   } = paymentDataQueryResult;
   const lastItemRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!projectData || projectData?.items.length <= 20) {
         return;
      }

      if (lastItemRef.current) {
         lastItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }
   }, [projectData?.items.length]);

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-project',
         mode: 'create',
         data: { ...defaultValues['new-project'] },
         openedOn: 'income-page',
         entity: 'project',
      });
   };

   if (isLoading) {
      return <IncomePageLoader />;
   }

   
   if (!projectData || projectData.items.length === 0) {
      return <IncomePagePlacholder addFn={handleNewProject} />;
   }
   
   if (isError && !projectData) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   const handleLoadMore = () => {
      const curentLength = projectData?.items.length;

      if (!curentLength) {
         return;
      }

      setFilter((prev) => {
         return {
            ...prev,
            take: curentLength + 8,
         };
      });
   };

   const remainingItems = projectData.total - projectData.items.length > 0;
   const projectList = projectData?.items.map((project, i, arr) => {
      const isLast = i === arr.length - 1;
      return (
         <ProjectPaymentTab
            key={project.id}
            project={project}
            ref={isLast ? lastItemRef : undefined}
         />
      );
   });

   return (
      <ScrollArea>
         <div className="flex flex-col gap-2 w-full h-full grow overflow-y-auto pb-2 sm:px-1">
            {projectList}
            {remainingItems && (
               <div className="flex justify-center pt-3 pb-7">
                  <LoadMoreButton
                     loadMoreFn={handleLoadMore}
                     isLoading={isLoading}
                  />
               </div>
            )}
         </div>
      </ScrollArea>
   );
};

const ProjectPaymentTab = forwardRef<
   HTMLDivElement,
   { project: PaymentDataPayload }
>(({ project }, ref) => {
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
         ref={ref}
         className={cn(
            'flex w-full bg-foreground rounded-2xl p-3 shadow-md h-[100px] items-center shrink-0',
            'sm:h-[85px] sm:gap-3',
            project.paymentStatus === 'paid' && 'bg-tertiary shadow-none'
         )}
      >
         <div className="flex flex-col gap-2 w-0 grow leading-snug justify-between h-full">
            <div>
               <p className="text-sm text-secondary">
                  {project.client?.name ?? 'Freelancing'}
               </p>
               <p className="text-lg sm:text-md sm:line-clamp-2">{project.title}</p>
            </div>
            <div className="flex gap-1 sm:hidden">
               <DocumentButton type="quotation" project={project} />
               <DocumentButton type="invoice" project={project} />
               <DocumentButton type="receipt" project={project} />
            </div>
         </div>
         <Separator orientation='vertical' className='md:hidden lg:hidden xl:hidden' />
         <div className="flex flex-col gap-1 items-end h-full leading-tight pr-2 sm:pr-0">
            <div className="flex text-[22px] pr-1 grow items-center">
               <p className="text-[22px] sm:text-lg">
                  {project.budget.toLocaleString()}
                  <span className="text-sm">.-</span>
               </p>
            </div>
            <StatusSelect
               selections={paymentStatusSelections}
               value={project.paymentStatus}
               handleValueChange={handlePaymentStatusChange}
               className="bg-transparent border border-secondary text-sm"
            />
         </div>
      </div>
   );
});

ProjectPaymentTab.displayName = 'ProjectPaymentTab';

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
            'sm:text-sm sm:px-1 sm:pr-2 sm:gap-0',
            isPaid && 'text-secondary'
         )}
      >
         <Plus className="w-4 h-4 sm:hidden" />
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
                  'flex gap-1 text-constant-primary border-transparent bg-theme-blue border rounded-lg items-center pl-[8px] pr-[10px] py-[2px]',
                  'sm:text-sm sm:px-1'
               )}
            >
               <FileText className="w-4 h-4 sm:hidden" />
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
