import React from 'react';
import DocumentPageLayout from 'src/components/page-elements/documents/DocumentPageLayout';
import { Outlet } from 'react-router-dom';
import StatusSelect from '@/components/shared/ui/select/StatusSelect';
import { paymentStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { cn } from '@/lib/helper/utils';
import { Plus } from 'lucide-react';

const project = {
   id: "e7efac8e-e486-4aa3-b14d-b049799fb105",
   title: "Commercial Jingle",
   client: "Sonic Boom Audio",
   clientId: "ba7cb739-b960-4a4a-a3e0-96dc89f407cd",
   quickTaskId: "5712e3bf-90ba-49c7-a765-9c3f5a42a014",
   projectStatus: "active",
   paymentStatus: "notProcessed",
   budget: 7500,
   themeColor: "red",
   links: [],
   note: "Project Commercial Jingle for Sonic Boom Audio",
   createdAt: "2025-02-07T05:32:58.970551",
   modifiedAt: "2025-02-07T05:32:58.970566",
   pinned: true,
 }

const DocumentPage: React.FC = () => {
   
   const handlePaymentStatusChange = (value) => {
      console.log('changed')
   }
   
   return (
      <section className="flex w-full h-full sm:flex-col">
         <div
            className={cn(
               'flex w-full bg-foreground h-fit rounded-xl p-2 px-3',
               project.paymentStatus === 'paid' && 'bg-tertiary'
            )}
         >
            <div className="flex flex-col gap-2 w-0 grow leading-tight">
               <div>
                  <p className="text-sm text-secondary">{project.client}</p>
                  <p className="text-lg">{project.title}</p>
               </div>
               <div className='flex pb-1 gap-1'>
                  <div className='flex gap-1 text-secondary border border-secondary rounded-lg items-center pl-[8px] pr-[10px] py-[2px]'>
                     <Plus className='w-4 h-4' />
                     Quotation
                  </div>
                  <div className='flex gap-1 text-secondary border border-secondary rounded-lg items-center pl-[8px] pr-[10px] py-[2px]'>
                     <Plus className='w-4 h-4' />
                     Invoice
                  </div>
                  <div className='flex gap-1 text-secondary border border-secondary rounded-lg items-center pl-[8px] pr-[10px] py-[2px]'>
                     <Plus className='w-4 h-4' />
                     Receipt
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-1 items-end justify-center leading-tight">
               <p className="text-[22px] pr-1">{project.budget.toLocaleString()}</p>
               <StatusSelect
                  selections={paymentStatusSelections}
                  value={project.paymentStatus}
                  handleValueChange={handlePaymentStatusChange}
                  className="p-0"
               />
            </div>
         </div>
      </section>
   );
};

const DocumentButton = () => {

   

   return (
      <div>
         <p className="text-sm text-secondary">{project.client}</p>
         <p className="text-lg">{project.title}</p>
      </div>
   );
};

export default DocumentPage;