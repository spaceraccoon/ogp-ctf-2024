import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:hover:bg-indigo-800 dark:hover:text-indigo-100 disabled:opacity-50 dark:focus:ring-indigo-400 disabled:pointer-events-none dark:focus:ring-offset-indigo-900 data-[state=open]:bg-indigo-100 dark:data-[state=open]:bg-indigo-800',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-900 text-white hover:bg-indigo-700 dark:bg-indigo-50 dark:text-indigo-900',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-transparent border border-indigo-200 hover:bg-indigo-100 dark:border-indigo-700 dark:text-indigo-100',
        subtle:
          'bg-indigo-100 text-indigo-900 hover:bg-indigo-200 dark:bg-indigo-700 dark:text-indigo-100',
        ghost:
          'bg-transparent hover:bg-indigo-100 dark:hover:bg-indigo-800 dark:text-indigo-100 dark:hover:text-indigo-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-indigo-900 dark:text-indigo-100 hover:bg-transparent dark:hover:bg-transparent'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
