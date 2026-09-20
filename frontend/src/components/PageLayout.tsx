import { cn } from 'cn'
import { PropsWithChildren } from 'react'
import { ThemeToggle } from './ThemeToggle'

type PageLayoutProps = PropsWithChildren<{ contentClassName?: string }>

export const PageLayout = ({ contentClassName, children }: PageLayoutProps) => (
  <div className="grid h-dvh w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
    <header className="flex h-16 w-full items-center justify-end border-b px-4">
      <ThemeToggle />
    </header>

    <main className={cn('min-h-0 w-full p-4', contentClassName)}>{children}</main>
  </div>
)
