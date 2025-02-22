import * as React from "react"

import { cn } from "@/lib/helper/utils"

interface InputProps extends React.ComponentProps<"input"> {
  variant?: 'outline' | 'base'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    


    return (
      <input
        type={type}
        className={cn(
          "flex rounded-md border border-secondary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-foreground box-border",
          variant === 'outline' && 'bg-transparent border-secondary',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
