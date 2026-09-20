import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useDebouncedState } from '../../hooks/useDebouncedState'
import { useEffect, useState } from 'react'
import { getMainSongsQueryOptions, getSavedSongsQueryOptions } from '../../api/queries'
import { addSongMutationOptions, deleteSongMutationOptions } from '../../api/mutations'
import { components } from '../../api/api-types'
import { List } from './components/List'
import { ContentWrapper } from '../../components/ContentWrapper'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Surface } from '../../components/Surface'
import { Pagination } from '../../components/Pagination'

export const Home = () => {
  const [search, setSearch] = useState('')
  const [committedSearch, setCommittedSearch] = useState('')
  const [savedSearch, setSavedSearch] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const debouncedSearch = useDebouncedState(search, 100)
  const debouncedSavedSearch = useDebouncedState(savedSearch, 100)

  useEffect(() => {
    setCommittedSearch(debouncedSearch)
    setPageNumber(1)
  }, [debouncedSearch])

  const amountPerPage = 100

  const paginationParams = {
    amountPerPage: `${amountPerPage}`,
    pageNumber: `${pageNumber}`,
  }

  const songsQuery = useQuery({
    ...getMainSongsQueryOptions(
      committedSearch
        ? {
            name: committedSearch,
            ...paginationParams,
          }
        : paginationParams,
    ),
    placeholderData: keepPreviousData,
  })

  const isLoadingSongs =
    songsQuery.isLoading || (songsQuery.isPlaceholderData && songsQuery.isFetching)
  const visiblePageNumber = songsQuery.data?.pageNumber ?? 1

  const savedQuery = useQuery({
    ...getSavedSongsQueryOptions(
      debouncedSavedSearch
        ? {
            name: debouncedSavedSearch,
          }
        : undefined,
    ),
    placeholderData: keepPreviousData,
  })
  const isLoadingSavedSongs =
    savedQuery.isLoading || (savedQuery.isPlaceholderData && savedQuery.isFetching)

  const savedSongIds = new Set(savedQuery.data?.map((s) => s.id))

  // Useful since the API does not return a total page count.
  const couldHaveNextPage = songsQuery.data?.songs.length === amountPerPage

  const addSongMutation = useMutation(addSongMutationOptions)
  const deleteSongMutation = useMutation(deleteSongMutationOptions)

  const addSong = (song: components['schemas']['Song']) => {
    addSongMutation.mutate(song)
  }
  const deleteSong = (songId: number) => {
    deleteSongMutation.mutate(songId)
  }

  return (
    <div className="grid h-dvh w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
      <div className="flex h-16 w-full items-center justify-end border-b px-4">
        <ThemeToggle />
      </div>

      <ContentWrapper className="min-h-0 w-full overflow-hidden">
        <div className="container mx-auto grid h-full min-h-0 grid-cols-1 grid-rows-2 gap-4 p-4 md:grid-cols-2 md:grid-rows-1">
          <Surface className="flex min-h-0 flex-col overflow-hidden">
            <div className="shrink-0 space-y-4 bg-surface p-4">
              <h2>Songs</h2>
              <input
                type="search"
                className="w-full rounded-lg border-2 bg-transparent p-2 text-content placeholder:text-content-muted focus:border-feedback-focus focus:outline-none focus:ring-2 focus:ring-feedback-focus/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find songs..."
              />
            </div>

            <List
              songs={songsQuery.data?.songs ?? []}
              action="add"
              onAction={addSong}
              disabledSongIds={savedSongIds}
              isLoading={isLoadingSongs}
            />

            <Pagination
              page={visiblePageNumber}
              hasNextPage={couldHaveNextPage}
              isPending={songsQuery.isPlaceholderData}
              onPageChange={setPageNumber}
              ariaLabel="Songs pagination"
            />
          </Surface>

          <Surface className="flex min-h-0 flex-col overflow-hidden">
            <div className="shrink-0 space-y-4 bg-surface p-4">
              <h2>Saved</h2>
              <input
                type="search"
                className="w-full rounded-lg border-2 bg-transparent p-2 text-content placeholder:text-content-muted focus:border-feedback-focus focus:outline-none focus:ring-2 focus:ring-feedback-focus/20"
                value={savedSearch}
                onChange={(e) => setSavedSearch(e.currentTarget.value)}
                placeholder="Find saved songs..."
              />
            </div>

            <List
              songs={savedQuery.data || []}
              action="remove"
              onAction={(song) => deleteSong(song.id)}
              isLoading={isLoadingSavedSongs}
            />
          </Surface>
        </div>
      </ContentWrapper>
    </div>
  )
}
