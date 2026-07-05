import * as React from "react"

import { cn } from "../lib/utils"

function Textarea({ className, placeholder, ...props }: React.ComponentProps<"textarea">) {
  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        placeholder={placeholder ? " " : undefined}
        className={cn(
          "peer flex field-sizing-content min-h-16 w-full rounded-lg bg-bg5 px-2.5 py-2 text-base transition-colors outline-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
      {placeholder && (
        <span
          className="pointer-events-none absolute left-2.5 top-2 text-base text-muted-foreground origin-top-left transition-all duration-300 ease-out transform
          peer-focus:-translate-y-1.5 peer-focus:scale-x-75 peer-focus:scale-y-0 peer-focus:opacity-0
          peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:scale-x-75 peer-not-placeholder-shown:scale-y-0 peer-not-placeholder-shown:opacity-0
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100"
        >
          {placeholder}
        </span>
      )}
    </div>
  )
}

export { Textarea }
