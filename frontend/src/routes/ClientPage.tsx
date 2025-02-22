import ClientInfoSection from '@/components/page-elements/client/ClientInfoSection';
import ClientContactSection from '@/components/page-elements/client/ClientContactSection';
import ClientProjectSection from '@/components/page-elements/client/ClientProjectSection';
import ClientFileSection from '@/components/page-elements/client/ClientFileSection';
import { useParams } from 'react-router-dom';
import { useClientQuery } from '@/lib/api/client-api';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import useDialogStore from '@/lib/zustand/dialog-store';

export default function ClientPage() {
   const { clientId } = useParams();
   const { data: clientData, isLoading } = useClientQuery('clientId', clientId);

   if (isLoading) {
      return <p>Loading...</p>
   }

   if (!clientData) {
      return <p>Client not found</p>
   }

   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <div className="flex flex-col grow gap-2 h-full">
            <ClientProjectSection
               clientData={clientData}
               isLoading={isLoading}
            />
            <ClientFileSection clientData={clientData} isLoading={isLoading} />
         </div>
         <div className="flex flex-col w-[350px] gap-2 h-full">
            <ClientContactSection
               clientData={clientData}
               isLoading={isLoading}
            />
            <ClientInfoSection clientData={clientData} isLoading={isLoading} />
            <ClientActivitySection
               clientData={clientData}
               isLoading={isLoading}
            />
         </div>
      </section>
   );
}

const ClientActivitySection: React.FC<ClientSectionProps> = () => {
   return (
      <div className="flex min-h-[200px] flex-col bg-foreground p-2 rounded-[20px] shrink-0 shadow-md">
         <p className="text-lg px-2">Activity Timeline</p>
      </div>
   );
};
