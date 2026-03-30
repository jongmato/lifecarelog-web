import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  ref?: React.Ref<HTMLInputElement>
}

export function Input({ label, error, id, className, ref, ...props }: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="font-sans text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'w-full font-sans text-base text-foreground placeholder:text-muted-foreground',
          'bg-input border border-border rounded-xl px-4',
          'min-h-[44px] h-11',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-3 focus:ring-ring focus:border-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-error focus:ring-error',
          className
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={inputId ? `${inputId}-error` : undefined}
          role="alert"
          className="font-sans text-sm text-error"
        >
          {error}
        </p>
      )}
    </div>
  )
}
