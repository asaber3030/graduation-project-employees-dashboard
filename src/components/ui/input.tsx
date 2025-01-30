import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    const hasIcon = !!Icon

    return (
      <div className="size-4 w-full relative h-8">
        {hasIcon && (
          <Icon className="absolute size-4 text-muted-foreground top-1/2 left-3 transform -translate-y-1/2" />
        )}
        <input
          type={type}
          className={cn(
            "flex h-full w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:ring-2 focus:ring-blue-600",
            hasIcon && "pl-9",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
