import { cn } from 'cn'
import { formatDuration } from '../../../utils/formatDuration'
import { GripIcon, MusicNoteIcon } from './ListIcons'
import { ListItemAction } from './ListItemAction'
import { ListAction, Song } from './listTypes'

export const ListItem = ({
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
}) => (
  <li
    className={cn(
      "group relative grid grid-cols-[1.25rem_3.5rem_minmax(0,1fr)_3rem_auto] items-center gap-2 rounded-xl px-3 py-4 after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-border after:content-[''] last:after:hidden hover:bg-surface-subtle sm:gap-4",
      { 'opacity-50': isLoading },
    )}
  >
    <GripIcon className="size-5 cursor-grab text-content-muted" />

    {song.albumImage ? (
      <img
        src={song.albumImage}
        alt={`${song.album ?? song.name} cover`}
        className="size-14 rounded-md object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    ) : (
      <div className="grid size-14 place-items-center rounded-xl bg-surface-subtle text-content-muted">
        <MusicNoteIcon className="size-6" />
      </div>
    )}

    <div className="min-w-0">
      <h3 className="truncate text-lg font-semibold leading-6 tracking-tight">{song.name}</h3>
      <p className="truncate text-sm leading-5 text-content-muted">{song.artist}</p>
    </div>

    <time className="text-right text-sm tabular-nums text-content-muted">
      {formatDuration(song.duration)}
    </time>

    <ListItemAction
      action={action}
      isAdded={isAdded}
      isLoading={isLoading}
      onAction={onAction}
      song={song}
    />
  </li>
)
