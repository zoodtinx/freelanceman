import * as React from "react"
import { cn } from "@/lib/helper/utils"

const HighlightContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "group flex w-full rounded-md border focus-within:ring-1 focus-within:ring-ring focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

HighlightContainer.displayName = "HighlightContainer"

export { HighlightContainer }
