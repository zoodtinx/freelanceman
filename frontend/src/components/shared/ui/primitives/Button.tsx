import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/helper/utils"

const buttonVariants = cva(
  "active:ring-2 ring-offset-2 ring-primary ring-offset-background inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-foreground hover:bg-primary/90 ring-primary",
          submit:
          "bg-button-blue text-foreground hover:bg-button-blue/80 text-primary ring-button-blue",
        destructive:
          "bg-button-red text-white hover:bg-button-red/80 ring-button-red",
        destructiveOutline:
          "border-[1.5px] border-button-red text-button-red ring-button-red",
        destructiveOutlineGhost:
          "border-[1.5px] border-secondary text-secondary",
        outline:
          "border-[1.5px] border-primary  hover:bg-accent hover:text-accent-foreground ring-secondary",
        secondary:
          "bg-tertiary text-secondary-foreground hover:bg-secondary/80 ring-tertiary",
        ghost: "bg-tertiary text-secondary ring-tertiary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-7 pr-3 pl-2 py-2",
        sm: "h-6 rounded-md px-2 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
