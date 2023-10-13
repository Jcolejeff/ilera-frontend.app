"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import Icon from "utils/Icon"

interface DataInterface {
  label: string
}

const  DatePicker: React.FC<DataInterface> = ({label}) => {
  const [date, setDate] = React.useState<Date>()
  const [popOver, setPopOver] = React.useState<boolean>(false)

  return (
    <Popover onOpenChange={(e) => setPopOver(e)}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between bg-white !border-gray-300  text-left font-normal relative",
            !date && "text-muted-foreground !bg-white"
          )}
        >
          {date ? format(date, "dd/MM/yyyy") : ''}
          <span className={`absolute text-gray-400 transition-all duration-300 ${(popOver || date) ? 'top-[-10px] bg-white left-[10px]' : 'top-[10px] bg-white left-[10px]'}`}>{label}</span>
            <Icon name="calendarIconBlack" svgProp={{
                className: 'mr-2 h-4 w-4 absolute right-[10px]'
            }}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker