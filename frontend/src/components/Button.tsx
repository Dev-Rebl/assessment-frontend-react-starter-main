import { cn } from 'cn'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  isLoading?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-orange text-white hover:bg-brand-orange-hover rounded-full',
  secondary: 'border bg-surface text-content hover:bg-surface-subtle',
  outline:
    'rounded-full border border-brand-orange bg-transparent text-brand-orange hover:bg-brand-orange-soft',
  ghost: 'text-content hover:bg-surface-subtle',
  danger: 'bg-feedback-danger text-white hover:bg-feedback-danger/90',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-3 py-2 text-sm',
  md: 'h-11 px-4 py-2 text-sm',
  lg: 'h-12 px-6 py-3 text-base',
  icon: 'size-11 p-0',
  'icon-sm': 'size-9 p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      size = 'md',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-feedback-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
