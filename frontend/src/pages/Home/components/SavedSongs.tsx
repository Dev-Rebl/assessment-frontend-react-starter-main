import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteSongMutationOptions } from '../../../api/mutations'
import { getSavedSongsQueryOptions } from '../../../api/queries'
import { Surface } from '../../../components/Surface'
import { useDebouncedState } from '../../../hooks/useDebouncedState'
import { List } from './List'

export const SavedSongs = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedState(search, 100)
  const savedQuery = useQuery({
    ...getSavedSongsQueryOptions(debouncedSearch ? { name: debouncedSearch } : undefined),
    placeholderData: keepPreviousData,
  })
  const deleteSongMutation = useMutation(deleteSongMutationOptions)

  return (
    <Surface className="flex min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 space-y-4 bg-surface p-4">
        <h2>Saved</h2>
        <input
          type="search"
          className="w-full rounded-lg border-2 bg-transparent p-2 text-content placeholder:text-content-muted focus:border-feedback-focus focus:outline-none focus:ring-2 focus:ring-feedback-focus/20"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Find saved songs..."
        />
      </div>

      <List
        songs={savedQuery.data ?? []}
        action={{
          type: 'remove',
          onAction: (song) => deleteSongMutation.mutate(song.id),
        }}
        feedback={{
          status: savedQuery.status,
          isUpdating: savedQuery.isPlaceholderData,
          loadingMessage: 'Loading your saved songs...',
          emptyMessage: debouncedSearch
            ? `No saved songs found for “${debouncedSearch}”.`
            : 'Your saved list is empty. Add songs to see them here.',
          errorMessage: "We couldn't load your saved songs.",
          onRetry: () => void savedQuery.refetch(),
        }}
      />
    </Surface>
  )
}
