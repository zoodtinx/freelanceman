import { cn } from "@/lib/helper/utils";

export const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={cn("text-secondary text-[13px] pb-[2px]", className)}>
    {children}
  </p>
);
