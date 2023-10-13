import * as React from "react"

import { cn } from "lib/utils"
import Icon from "utils/Icon"

export interface TextareaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
  }

const CustomTextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label,  ...props }, ref) => {
    const [isFocused, setIsFocus] = React.useState<boolean>(false)

    return (
      <div className="relative">
        <label className={`text-gray-400 bg-white absolute transition-all duration-300 ${isFocused ? 'top-[-10px] left-[10px]' : 'top-[10px] left-[10px]'} text-[15px]`}>{label}</label>
        <textarea
          className={cn(
            "flex min-h-[140px] !border-gray-300 focus:ring-0 focus-visible:!ring-0 resize-none w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocus(true)}
          {...props}
        />
        <div className="bg-white flex flex-wrap gap-y-5 justify-between rounded-md py-2 px-2 md:px-8 border border-gray-300 mt-2">
          <div className="flex gap-x-4">
            <span><Icon name="bold" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="italic" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="underline" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="alignLeft" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="alignCenter" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="orderedList" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="paragraph" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="insertLink" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="smileIcon" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
          </div>
          <div className="flex gap-x-4">
            <span><Icon name="undoIcon" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="redoIcon" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
            <span><Icon name="verticalDot" svgProp={{className: 'w-[15px] h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px]'} }/></span>
          </div>
        </div>
      </div>
    )
  }
)
CustomTextArea.displayName = "Textarea"

export { CustomTextArea }
