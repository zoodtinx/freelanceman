import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusSelect from '@/components/shared/ui/select/StatusSelect';
import { paymentStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { cn } from '@/lib/helper/utils';
import { FileText, Plus } from 'lucide-react';
import { Project, ProjectPaymentData } from '@types';
import { useProjectPaymentDataQuery } from '@/lib/api/project-payment-api';
import { Separator } from '@/components/shared/ui/primitives/Separator';

const IncomePage: React.FC = () => {
   const handlePaymentStatusChange = (value) => {
      console.log('changed');
   };

   return (
      <section className="flex flex-col gap-2 w-full h-full sm:flex-col">
         <p>Amount unpaid: 30,000</p>
         <ProjectPaymentTabList />
      </section>
   );
};

const ProjectPaymentTabList = () => {
   
   const {data: projectData, isLoading} = useProjectPaymentDataQuery()

   
   if (isLoading) {
      return <p>Loading...</p>
   }

   if (!projectData) {
      return <p>No payment data available</p>
   }
   
   const projectList = projectData.map((project) => {
      return <ProjectPaymentTab key={project.id} project={project} />;
   });

   return <div className="flex flex-col gap-2 w-full">{projectList}</div>;
};

const ProjectPaymentTab = ({ project }: { project: Project }) => {
   const handlePaymentStatusChange = (value) => {
      console.log('changed');
   };

   return (
      <div
         className={cn(
            'flex w-full bg-foreground h-fit rounded-2xl p-2 px-3',
            project.paymentStatus === 'paid' && 'bg-tertiary'
         )}
      >
         <div className="flex flex-col gap-2 w-0 grow leading-snug">
            <div>
               <p className="text-sm text-secondary">{project.client}</p>
               <p className="text-lg">{project.title}</p>
            </div>
            <div className="flex pb-1 gap-1">
               <DocumentButton type="quotation" project={project} />
               <DocumentButton type="invoice" project={project} />
               <DocumentButton type="receipt" project={project} />
            </div>
         </div>
         <div className="flex flex-col gap-1 items-end justify-center leading-tight">
            <p className="text-[22px] pr-1">
               {project.budget.toLocaleString()}{' '}
               <span className="text-base">{project.currency}</span>
            </p>
            <StatusSelect
               selections={paymentStatusSelections}
               value={project.paymentStatus}
               handleValueChange={handlePaymentStatusChange}
               className="p-0 bg-transparent"
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
   project: ProjectPaymentData;
}) => {
   const isPaid = project.paymentStatus === 'paid';
   const haveDocument = !!project[type]?.id

   if (haveDocument) {
      return <EditDocumentButton type={type} project={project} />;
   } else {
      return <AddDocumentButton type={type} project={project} />;
   }
};

const AddDocumentButton = ({
   type,
   project,
}: {
   type: string;
   project: Project;
}) => {
   const label = type.charAt(0).toUpperCase() + type.slice(1);

   const navigate = useNavigate();
   const handleClick = (type: string) => {
      switch (type) {
         case 'quotation':
            navigate('/home/payment/quotation/create');
            break;
         case 'invoice':
            navigate('/home/payment/invoice/create');
            break;
         case 'receipt':
            navigate('/home/payment/receipt/create');
            break;
      }
   };

   return (
      <div
         onClick={() => handleClick(type)}
         className="flex gap-1 text-primary border-secondary border rounded-lg items-center pl-[8px] pr-[10px] py-[2px] cursor-pointer"
      >
         <Plus className="w-4 h-4" />
         {label}
      </div>
   );
};

const EditDocumentButton = ({
   type,
   project,
}: {
   type: string;
   project: Project;
}) => {
   const navigate = useNavigate();
   const isPaid = project.paymentStatus === 'paid';
   const label = type.charAt(0).toUpperCase() + type.slice(1);

   const handleDownload = () => {
      console.log('download');
   };

   const handleEdit = () => {
      console.log('edit');
   };

   const handleDelete = () => {
      console.log('delete');
   };

   return (
      <Popover>
         <PopoverTrigger
            className="flex items-center"
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <div
               className={cn(
                  'flex gap-1 text-primary bg-tertiary border-transparent border rounded-lg items-center pl-[8px] pr-[10px] py-[2px]',
                  isPaid && 'text-secondary bg-tertiary border-secondary'
               )}
            >
               <FileText className="w-4 h-4" />
               {label}
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-[110px] cursor-default select-none bg-foreground">
            <button className='text-left' onClick={handleDownload}>Download</button>
            <button className='text-left' onClick={handleEdit}>Edit</button>
            <button className='text-left' onClick={handleDelete}>Delete</button>
         </PopoverContent>
      </Popover>
   );
};

export default IncomePage