import { components } from '../../../api/api-types'
import { ListItem } from './ListItem'
import { ListState } from './ListState'
import { ListAction, Song } from './listTypes'

interface ListProps {
  songs: components['schemas']['Songs']
  action: {
    type: ListAction
    onAction: (song: Song) => void
    disabledSongIds?: ReadonlySet<number>
  }
  feedback: {
    status: 'pending' | 'error' | 'success'
    emptyMessage: string
    errorMessage: string
    loadingMessage: string
    onRetry: () => void
    isUpdating?: boolean
  }
}

export const List = ({ songs, action, feedback }: ListProps) => {
  if (feedback.status === 'pending') {
    return <ListState variant="loading" message={feedback.loadingMessage} />
  }

  if (feedback.status === 'error') {
    return <ListState variant="error" message={feedback.errorMessage} onRetry={feedback.onRetry} />
  }

  if (songs.length === 0) {
    return <ListState variant="empty" message={feedback.emptyMessage} />
  }

  return (
    <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
      <ul role="list">
        {songs.map((song) => (
          <ListItem
            action={action.type}
            isAdded={action.disabledSongIds?.has(song.id) ?? false}
            isLoading={feedback.isUpdating ?? false}
            key={song.id}
            onAction={action.onAction}
            song={song}
          />
        ))}
      </ul>
    </div>
  )
}
