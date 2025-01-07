import * as React from "react"

import { cn } from "@/lib/helper/utils"

const CleanSelect = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type='text'
        className={cn(
          "focus:outline-none bg-transparent",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

CleanSelect.displayName = "CleanSelect"

export { CleanSelect }
