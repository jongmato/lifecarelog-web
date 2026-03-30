import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  ref?: React.Ref<HTMLTextAreaElement>
}

export function Textarea({ label, error, id, className, ref, ...props }: TextareaProps) {
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-sans text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full font-sans text-base text-foreground placeholder:text-muted-foreground',
          'bg-input border border-border rounded-xl px-4 py-3',
          'min-h-[120px] resize-y',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-3 focus:ring-ring focus:border-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-error focus:ring-error',
          className
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={textareaId ? `${textareaId}-error` : undefined}
          role="alert"
          className="font-sans text-sm text-error"
        >
          {error}
        </p>
      )}
    </div>
  )
}
