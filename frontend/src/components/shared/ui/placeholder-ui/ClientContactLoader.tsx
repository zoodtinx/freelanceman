import { Skeleton } from "@/components/shared/ui/primitives/Skeleton";

export const ClientContactLoader: React.FC = () => {
   return (
      <Skeleton
         className="rounded-full h-16"
      />
   );
};

export const ClientContactListLoader = () => {
   return (
      <div className="flex flex-col w-full gap-1">
         <ClientContactLoader />
         <ClientContactLoader />
         <ClientContactLoader />
         <ClientContactLoader />
         <ClientContactLoader />
         <ClientContactLoader />
         <ClientContactLoader />
      </div>
   )
}

export default ClientContactLoader;
