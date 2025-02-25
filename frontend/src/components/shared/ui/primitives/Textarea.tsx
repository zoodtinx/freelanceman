import * as React from "react"

import { cn } from "@/lib/helper/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  variant?: 'outline' | 'base'
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className,variant, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-foreground",
        variant === 'outline' && 'bg-transparent border-secondary',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
