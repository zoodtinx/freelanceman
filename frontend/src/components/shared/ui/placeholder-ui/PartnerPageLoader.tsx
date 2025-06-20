import { Skeleton } from "@/components/shared/ui/primitives/Skeleton";


export const PartnerPageFilterLoader: React.FC = () => {
  return (
    <div className="flex gap-1 h-7 w-full shrink-0">
      <Skeleton className="h-full w-[110px] rounded-full" />
      <Skeleton className="h-full w-[210px] rounded-full" />
    </div>
  );
};

export const PartnerPageTabsLoader = () => {
   return (
      <div className="w-full flex flex-col gap-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <Skeleton key={i} className="rounded-[15px] h-[50px]" />
        ))}
      </div>
   );
}