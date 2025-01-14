import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 disabled:pointer-events-none disabled:opacity-50 font-serif italic",
  {
    variants: {
      variant: {
        default: "bg-rose-400 text-white shadow-lg hover:bg-rose-500/90 hover:shadow-xl hover:scale-105",
        outline: "border-2 border-rose-200 bg-white/80 shadow-sm hover:bg-rose-50 hover:border-rose-300",
        ghost: "hover:bg-rose-50 hover:text-rose-500",
      },
      size: {
        default: "h-12 px-8 py-4",
        sm: "h-8 px-4 text-xs",
        lg: "h-14 px-12 text-lg",
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