import { cn } from 'cn'
import { SpotifyIcon } from './ListIcons'
import { Song } from './listTypes'

interface SongDetailsProps {
  song: Song
  isExpanded: boolean
}

export const SongDetails = ({ song, isExpanded }: SongDetailsProps) => (
  <div
    className={cn(
      'col-start-2 col-end-6 grid min-w-0 transition-[grid-template-rows] duration-200 ease-out',
      {
        'pointer-events-none grid-rows-[0fr]': !isExpanded,
        'grid-rows-[1fr]': isExpanded,
      },
    )}
    aria-hidden={!isExpanded}
  >
    <div className="min-h-0 overflow-hidden">
      <div
        className={cn(
          'flex flex-wrap items-center gap-x-5 gap-y-2 pb-1 text-sm text-content-muted transition-opacity duration-150',
          {
            'opacity-0': !isExpanded,
            'delay-200 opacity-100': isExpanded,
          },
        )}
      >
        {song.album && <Detail label="Album" value={song.album} />}
        {song.year && <Detail label="Year" value={song.year} />}
        {song.genre && <Detail label="Genre" value={song.genre} />}
        {song.bpm && <Detail label="BPM" value={song.bpm} />}
        {song.spotifyId && (
          <div className="basis-full">
            <a
              href={`https://open.spotify.com/track/${song.spotifyId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-5 items-center justify-center gap-1 rounded-full border border-brand-orange bg-transparent px-2 text-xs font-semibold leading-none text-brand-orange hover:bg-brand-orange-soft"
              onClick={(event) => event.stopPropagation()}
            >
              <SpotifyIcon className="size-3.5" />
              Spotify
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
)

const Detail = ({ label, value }: { label: string; value: string | number }) => (
  <span>
    {label} <span className="font-semibold text-content">{value}</span>
  </span>
)
