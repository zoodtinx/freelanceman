import ClientInfoSection from '@/components/page-elements/client/ClientInfoSection';
import ClientContactSection from '@/components/page-elements/client/ClientContactSection';
import ClientProjectSection from '@/components/page-elements/client/ClientProjectSection';
import ClientFileSection from '@/components/page-elements/client/ClientFileSection';
import { mockClients } from '@mocks';

export default function ClientPage() {
   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <div className="flex flex-col grow gap-2 h-full">
            <ClientProjectSection />
            <ClientFileSection />
         </div>
         <div className="flex flex-col w-[350px] gap-2 h-full">
            <ClientContactSection />
            <ClientInfoSection clientData={mockAllClients[1]} />
            <ClientActivitySection />
         </div>
      </section>
   );
}

const ClientActivitySection = () => {
   return (
      <div className="flex min-h-[200px] flex-col bg-foreground p-4 rounded-[20px] shrink-0">
         <p className="text-lg">Activity Timeline</p>
         
      </div>
   )
}