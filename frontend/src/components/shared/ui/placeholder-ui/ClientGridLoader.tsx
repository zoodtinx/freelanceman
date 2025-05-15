import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';

export const ClientGridLoader = () => {
   const placeholder = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Client ${index + 1}`,
      email: `client${index + 1}@example.com`,
   }));

   return (
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-[repeat(4,minmax(0,1fr))] gap-2 w-full pt-2">
         {placeholder?.map((placeholder) => (
            <Skeleton
               key={placeholder.id}
               className="rounded-[20px] h-[170px]"
            />
         ))}
      </div>
   );
};
