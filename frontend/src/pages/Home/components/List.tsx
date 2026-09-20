import { components } from '../../../api/api-types'
import { ListItem } from './ListItem'
import { ListState } from './ListState'
import { ListAction, Song } from './listTypes'

interface ListProps {
  songs: components['schemas']['Songs']
  action: ListAction
  onAction: (song: Song) => void
  disabledSongIds?: ReadonlySet<number>
  status: 'pending' | 'error' | 'success'
  emptyMessage: string
  errorMessage: string
  loadingMessage: string
  onRetry: () => void
  isUpdating?: boolean
}

export const List = ({
  songs,
  action,
  onAction,
  disabledSongIds = new Set(),
  status,
  emptyMessage,
  errorMessage,
  loadingMessage,
  onRetry,
  isUpdating = false,
}: ListProps) => {
  if (status === 'pending') {
    return <ListState variant="loading" message={loadingMessage} />
  }

  if (status === 'error') {
    return <ListState variant="error" message={errorMessage} onRetry={onRetry} />
  }

  if (songs.length === 0) {
    return <ListState variant="empty" message={emptyMessage} />
  }

  return (
    <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
      <ul role="list">
        {songs.map((song) => (
          <ListItem
            action={action}
            isAdded={disabledSongIds.has(song.id)}
            isLoading={isUpdating}
            key={song.id}
            onAction={onAction}
            song={song}
          />
        ))}
      </ul>
    </div>
  )
}
