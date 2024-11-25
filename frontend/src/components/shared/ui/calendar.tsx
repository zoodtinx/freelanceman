import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/helper/utils"
import { buttonVariants } from "@/components/shared/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className="p-4"
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
