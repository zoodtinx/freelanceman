import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/helper/utils"
import { buttonVariants } from "src/components/shared/ui/primitives/Button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  
  return (
    <DayPicker
      captionLayout="dropdown"
      
      showOutsideDays={showOutsideDays}
      className="p-4"
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
