import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { addSongMutationOptions } from '../../../api/mutations'
import { getMainSongsQueryOptions, getSavedSongsQueryOptions } from '../../../api/queries'
import { Pagination } from '../../../components/Pagination'
import { Surface } from '../../../components/Surface'
import { useDebouncedState } from '../../../hooks/useDebouncedState'
import { List } from './List'

const amountPerPage = 100

export const MainSongs = () => {
  const [search, setSearch] = useState('')
  const [committedSearch, setCommittedSearch] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const debouncedSearch = useDebouncedState(search, 100)

  useEffect(() => {
    setCommittedSearch(debouncedSearch)
    setPageNumber(1)
  }, [debouncedSearch])

  const paginationParams = {
    amountPerPage: `${amountPerPage}`,
    pageNumber: `${pageNumber}`,
  }

  const songsQuery = useQuery({
    ...getMainSongsQueryOptions(
      committedSearch ? { name: committedSearch, ...paginationParams } : paginationParams,
    ),
    placeholderData: keepPreviousData,
  })
  const savedQuery = useQuery(getSavedSongsQueryOptions())
  const addSongMutation = useMutation(addSongMutationOptions)

  const songs = songsQuery.data?.songs ?? []
  const visiblePageNumber = songsQuery.data?.pageNumber ?? 1
  const savedSongIds = new Set(savedQuery.data?.map((song) => song.id))
  const couldHaveNextPage = songs.length === amountPerPage

  return (
    <Surface className="flex min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 space-y-4 bg-surface p-4">
        <h2>Songs</h2>
        <input
          type="search"
          className="w-full rounded-lg border-2 bg-transparent p-2 text-content placeholder:text-content-muted focus:border-feedback-focus focus:outline-none focus:ring-2 focus:ring-feedback-focus/20"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Find songs..."
        />
      </div>

      <List
        songs={songs}
        action={{
          type: 'add',
          onAction: (song) => addSongMutation.mutate(song),
          disabledSongIds: savedSongIds,
        }}
        feedback={{
          status: songsQuery.status,
          isUpdating: songsQuery.isPlaceholderData,
          loadingMessage: 'Loading songs...',
          emptyMessage: committedSearch
            ? `No songs found for “${committedSearch}”. Try another search.`
            : 'No songs are available.',
          errorMessage: "We couldn't load the songs.",
          onRetry: () => void songsQuery.refetch(),
        }}
      />

      <Pagination
        page={visiblePageNumber}
        hasNextPage={couldHaveNextPage}
        isPending={songsQuery.isPlaceholderData || !songsQuery.isSuccess}
        onPageChange={setPageNumber}
        ariaLabel="Songs pagination"
      />
    </Surface>
  )
}
