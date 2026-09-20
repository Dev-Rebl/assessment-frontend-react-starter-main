import { cn } from 'cn'
import { Button } from '../../../components/Button'
import { CheckIcon, PlusIcon, TrashIcon } from './ListIcons'
import { ListAction, Song } from './listTypes'

export const ListItemAction = ({
  song,
  action,
  onAction,
  isAdded,
  isLoading,
}: {
  song: Song
  action: ListAction
  onAction: (song: Song) => void
  isAdded: boolean
  isLoading: boolean
}) => {
  const isRemoveAction = action === 'remove'
  const actionLabel = isRemoveAction ? `Remove ${song.name}` : `Add ${song.name}`

  if (isAdded && !isRemoveAction) {
    return (
      <span
        role="status"
        aria-label={`${song.name} is saved`}
        title={`${song.name} is saved`}
        className="grid size-9 place-items-center rounded-full border border-brand-orange bg-brand-orange text-white"
      >
        <CheckIcon className="size-5" />
      </span>
    )
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      aria-label={actionLabel}
      title={actionLabel}
      disabled={isLoading}
      onClick={(event) => {
        event.stopPropagation()
        onAction(song)
      }}
      className={cn({
        'border-feedback-danger text-feedback-danger hover:bg-feedback-danger/10': isRemoveAction,
      })}
    >
      {isRemoveAction ? <TrashIcon className="size-5" /> : <PlusIcon className="size-5" />}
    </Button>
  )
}
