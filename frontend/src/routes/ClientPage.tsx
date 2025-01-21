import ClientInfoSection from '@/components/page-elements/client/ClientInfoSection';
import ClientContactSection from '@/components/page-elements/client/ClientContactSection';
import ClientProjectSection from '@/components/page-elements/client/ClientProjectSection';
import ClientFileSection from '@/components/page-elements/client/ClientFileSection';

export default function ClientPage() {
   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <div className="flex flex-col grow gap-2 h-full">
            <ClientProjectSection />
            <ClientFileSection />
         </div>
         <div className="flex flex-col w-[350px] gap-2 h-full">
            <ClientInfoSection />
            <ClientContactSection />
         </div>
      </section>
   );
}
