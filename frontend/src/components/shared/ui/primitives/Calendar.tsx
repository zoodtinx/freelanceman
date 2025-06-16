import * as React from "react"
import { DayPicker } from "react-day-picker"


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
