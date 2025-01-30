import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const buttonVariants = cva(
  "text-sm inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-lg font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-shadow focus:ring-2 focus:ring-main",
  {
    variants: {
      variant: {
        default:
          "focus:ring-2 focus:ring-indigo-300 bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "focus:ring-2 focus:ring-red-300 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        success:
          "focus:ring-2 focus:ring-green-300 bg-green-700 text-white shadow-sm hover:bg-green-700/90",
        warning:
          "focus:ring-2 focus:ring-orange-300 bg-orange-500 text-white shadow-sm hover:bg-orange-500/90",
        blue: "focus:ring-2 focus:ring-blue-300 bg-blue-500 text-white shadow-sm hover:bg-blue-500/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border shadow-md bg-gray-100 text-secondary-foreground shadow-sm hover:bg-gray-200/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-8 p-3 px-3 text-sm",
        lg: "h-9 px-4",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: LucideIcon
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon: Icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const hasIcon = !!Icon
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {hasIcon && <Icon className={"size-4"} />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
