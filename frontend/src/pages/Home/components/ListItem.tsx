import { cn } from 'cn'
import { formatDuration } from '../../../utils/formatDuration'
import { ChevronDownIcon, MusicNoteIcon } from './ListIcons'
import { ListItemAction } from './ListItemAction'
import { SongDetails } from './SongDetails'
import { ListAction, Song } from './listTypes'

export const ListItem = ({
  song,
  action,
  onAction,
  isAdded,
  isLoading,
  isExpanded,
  onToggle,
}: {
  song: Song
  action: ListAction
  onAction: (song: Song) => void
  isAdded: boolean
  isLoading: boolean
  isExpanded: boolean
  onToggle: (song: Song) => void
}) => {
  return (
    <li
      className={cn(
        "group relative grid cursor-pointer grid-cols-[3.5rem_minmax(0,1fr)_3rem_1.25rem_auto] items-center gap-x-2 gap-y-0 rounded-xl px-3 py-4 transition-[background-color,grid-template-columns,row-gap] duration-200 ease-out after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-border after:content-[''] last:after:hidden hover:bg-surface-subtle sm:gap-x-4",
        {
          'opacity-50': isLoading,
          'grid-cols-[6rem_minmax(0,1fr)_3rem_1.25rem_auto] gap-y-3 bg-surface-subtle': isExpanded,
        },
      )}
      onClick={() => onToggle(song)}
    >
      {song.albumImage ? (
        <img
          src={song.albumImage}
          alt={`${song.album ?? song.name} cover`}
          className={cn('rounded-md object-cover transition-[width,height] duration-200 ease-out', {
            'size-14': !isExpanded,
            'size-24': isExpanded,
          })}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={cn(
            'grid place-items-center rounded-xl bg-surface-subtle text-content-muted transition-[width,height] duration-200 ease-out',
            {
              'size-14': !isExpanded,
              'size-24': isExpanded,
            },
          )}
        >
          <MusicNoteIcon className={cn('size-6', { 'size-9': isExpanded })} />
        </div>
      )}

      <div className="min-w-0">
        <h3 className="truncate text-lg font-semibold leading-6 tracking-tight">{song.name}</h3>
        <p className="truncate text-sm leading-5 text-content-muted">{song.artist}</p>
      </div>

      <time className="text-right text-sm tabular-nums text-content-muted">
        {formatDuration(song.duration)}
      </time>

      <ChevronDownIcon
        className={cn(
          'size-4 text-content-muted transition-[color,transform] duration-200 group-hover:text-brand-orange',
          {
            'rotate-180 text-brand-orange': isExpanded,
          },
        )}
      />

      <ListItemAction
        action={action}
        isAdded={isAdded}
        isLoading={isLoading}
        onAction={onAction}
        song={song}
      />

      <SongDetails song={song} isExpanded={isExpanded} />
    </li>
  )
}
