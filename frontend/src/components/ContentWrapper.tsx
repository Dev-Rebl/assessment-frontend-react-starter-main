import { cn } from 'cn'
import { PropsWithChildren } from 'react'

export const ContentWrapper = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn('p-4', className)}>{children}</div>
}
