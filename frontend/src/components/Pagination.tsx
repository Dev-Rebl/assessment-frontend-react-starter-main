import { Button } from './Button'

interface PaginationProps {
  page: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
  isPending?: boolean
  ariaLabel?: string
}

export const Pagination = ({
  page,
  hasNextPage,
  onPageChange,
  isPending = false,
  ariaLabel = 'Pagination',
}: PaginationProps) => (
  <nav
    className="flex shrink-0 items-center justify-between gap-3 border-t bg-surface p-4"
    aria-label={ariaLabel}
  >
    <Button
      variant="secondary"
      size="sm"
      disabled={page === 1 || isPending}
      onClick={() => onPageChange(Math.max(1, page - 1))}
    >
      Previous
    </Button>

    <span
      className="min-w-20 text-center text-sm font-semibold tabular-nums text-content-muted"
      aria-live="polite"
    >
      Page {page}
    </span>

    <Button
      variant="secondary"
      size="sm"
      disabled={!hasNextPage || isPending}
      onClick={() => onPageChange(page + 1)}
    >
      Next
    </Button>
  </nav>
)
