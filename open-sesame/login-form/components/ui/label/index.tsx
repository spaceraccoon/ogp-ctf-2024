'use client'

import * as React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    className?: string
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={`${className} text-sm font-medium leading-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70`}
            {...props}
        />
    )
})

Label.displayName = 'Label'

export { Label }