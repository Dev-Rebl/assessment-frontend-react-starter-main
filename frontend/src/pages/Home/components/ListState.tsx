import { Button } from '../../../components/Button'
import { ErrorIcon, MusicNoteIcon } from './ListIcons'

interface ListStateProps {
  variant: 'loading' | 'empty' | 'error'
  message: string
  onRetry?: () => void
}

export const ListState = ({ variant, message, onRetry }: ListStateProps) => (
  <div
    className="grid min-h-40 flex-1 place-items-center px-6 py-10 text-center"
    role={variant === 'error' ? 'alert' : 'status'}
  >
    <div className="flex max-w-sm flex-col items-center gap-3">
      {variant === 'loading' ? (
        <span
          className="size-8 animate-spin rounded-full border-2 border-border border-t-brand-orange"
          aria-hidden="true"
        />
      ) : variant === 'error' ? (
        <span className="grid size-10 place-items-center rounded-full bg-feedback-danger/10 text-feedback-danger">
          <ErrorIcon className="size-5" />
        </span>
      ) : (
        <span className="grid size-10 place-items-center rounded-full bg-surface-subtle text-content-muted">
          <MusicNoteIcon className="size-5" />
        </span>
      )}

      <p className="text-sm text-content-muted">{message}</p>

      {variant === 'error' && onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  </div>
)
