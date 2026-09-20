import { components } from '../../../api/api-types'
import { ListItem } from './ListItem'
import { ListAction, Song } from './listTypes'

interface ListProps {
  songs: components['schemas']['Songs']
  action: ListAction
  onAction: (song: Song) => void
  disabledSongIds?: ReadonlySet<number>
  isLoading?: boolean
}

export const List = ({
  songs,
  action,
  onAction,
  disabledSongIds = new Set(),
  isLoading = false,
}: ListProps) => (
  <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
    <ul role="list">
      {songs.map((song) => (
        <ListItem
          action={action}
          isAdded={disabledSongIds.has(song.id)}
          isLoading={isLoading}
          key={song.id}
          onAction={onAction}
          song={song}
        />
      ))}
    </ul>
  </div>
)
