import { cn } from 'cn'
import { PropsWithChildren } from 'react'

export const Surface = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn('rounded-2xl border bg-surface shadow-xl ', className)}>{children}</div>
}
