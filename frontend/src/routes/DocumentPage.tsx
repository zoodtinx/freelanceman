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
import { Project } from '@types';

const DocumentPage: React.FC = () => {
   const handlePaymentStatusChange = (value) => {
      console.log('changed');
   };

   return (
      <section className="flex flex-col gap-2 w-full h-full sm:flex-col">
         <p>Amount unpaid: 30,000</p>
         <ProjectPaymentTabList projects={projects} />
      </section>
   );
};

const ProjectPaymentTabList = ({ projects }: { projects: Project[] }) => {
   const projectList = projects.map((project) => {
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
   type: string;
   project: Project;
}) => {
   const isPaid = project.paymentStatus === 'paid';

   if (isPaid) {
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
         className="flex gap-1 text-primary border-secondary border rounded-lg items-center pl-[8px] pr-[10px] py-[2px]"
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
            <p onClick={handleDownload}>Download</p>
            <p onClick={handleEdit}>Edit</p>
            <p onClick={handleDelete}>Delete</p>
         </PopoverContent>
      </Popover>
   );
};

export default DocumentPage;

const projects = [
   {
      id: 'e7efac8e-e486-4aa3-b14d-b049799fb105',
      title: 'Commercial Jingle',
      client: 'Sonic Boom Audio',
      clientId: 'ba7cb739-b960-4a4a-a3e0-96dc89f407cd',
      quickTaskId: '5712e3bf-90ba-49c7-a765-9c3f5a42a014',
      projectStatus: 'active',
      paymentStatus: 'notProcessed',
      budget: 7500,
      currency: 'THB',
      themeColor: 'red',
      links: [],
      note: 'Project Commercial Jingle for Sonic Boom Audio',
      createdAt: '2025-02-07T05:32:58.970551',
      modifiedAt: '2025-02-07T05:32:58.970566',
      pinned: true,
   },
   {
      id: 'c5e8f8d1-6d84-4a9a-90b5-3b4a3a6a8c82',
      title: 'Brand Identity Design',
      client: 'Visionary Studios',
      clientId: 'f3a2d681-7684-4e1a-9e52-ec3f7c4e1d91',
      quickTaskId: '02d9e7e4-88f1-492d-8f2f-8b3a5a9f3e12',
      projectStatus: 'completed',
      paymentStatus: 'processed',
      budget: 12500,
      currency: 'THB',
      themeColor: 'blue',
      links: [],
      note: 'Full brand identity package for Visionary Studios',
      createdAt: '2025-01-15T10:25:43.123456',
      modifiedAt: '2025-02-01T14:32:11.654321',
      pinned: false,
   },
   {
      id: 'ab3e7f92-bc45-4d29-98f4-1e4a56b3c712',
      title: 'E-commerce Website',
      client: 'ShopEase Co.',
      clientId: '7b9f4a1c-8e25-4a7b-94e6-5d8a7c3e1f82',
      quickTaskId: 'f7e3a9c8-1b2d-4f7b-a9e5-6c3f7d1e4b82',
      projectStatus: 'inProgress',
      paymentStatus: 'pending',
      budget: 22000,
      currency: 'THB',
      themeColor: 'green',
      links: [],
      note: 'Developing an e-commerce site for ShopEase Co.',
      createdAt: '2025-02-02T08:17:21.987654',
      modifiedAt: '2025-02-10T12:45:32.543210',
      pinned: true,
   },
   {
      id: 'e1a2b3c4-d5f6-7g8h-9i0j-1k2l3m4n5o6p',
      title: 'Mobile App UX/UI',
      client: 'TechFlow Inc.',
      clientId: '6c3f7d1e-4b82-4a7b-94e6-5d8a7c3e1f82',
      quickTaskId: '9e4b5a6c-7d8e-9f1a-2b3c-4d5e6f7g8h9i',
      projectStatus: 'active',
      paymentStatus: 'notProcessed',
      budget: 15000,
      currency: 'THB',
      themeColor: 'purple',
      links: [],
      note: "Designing UX/UI for TechFlow's new mobile app",
      createdAt: '2025-02-05T09:11:43.654321',
      modifiedAt: '2025-02-07T11:22:33.876543',
      pinned: false,
   },
   {
      id: '1b2c3d4e-5f6g-7h8i-9j0k-1l2m3n4o5p6q',
      title: 'Corporate Video Production',
      client: 'Global Enterprises',
      clientId: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
      quickTaskId: '3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s',
      projectStatus: 'inProgress',
      paymentStatus: 'paid',
      budget: 18500,
      currency: 'THB',
      themeColor: 'orange',
      links: [],
      note: 'Corporate promotional video for Global Enterprises',
      createdAt: '2025-01-28T07:44:55.432109',
      modifiedAt: '2025-02-09T16:20:45.987654',
      pinned: true,
   },
   {
      id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
      title: 'Product Packaging Design',
      client: 'EcoGoods Ltd.',
      clientId: '5f6g7h8i-9j0k-1l2m-3n4o-5p6q7r8s9t0u',
      quickTaskId: '6g7h8i9j-0k1l-2m3n4o-5p6q-7r8s9t0u1v2w',
      projectStatus: 'active',
      paymentStatus: 'paid',
      budget: 9000,
      currency: 'THB',
      themeColor: 'teal',
      links: [],
      note: 'Sustainable packaging design for EcoGoods',
      createdAt: '2025-02-08T13:22:14.789012',
      modifiedAt: '2025-02-10T09:15:30.567890',
      pinned: false,
   },
];
