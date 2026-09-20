import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useDebouncedState } from '../hooks/useDebouncedState'
import { useState } from 'react'
import { cn } from 'cn'
import { getMainSongsQueryOptions, getSavedSongsQueryOptions } from '../api/queries'
import { addSongMutationOptions, deleteSongMutationOptions } from '../api/mutations'
import { components } from '../api/api-types'

export const Home = () => {
  const [search, setSearch] = useState('')
  const [savedSearch, setSavedSearch] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const debouncedSearch = useDebouncedState(search, 100)
  const debouncedSavedSearch = useDebouncedState(savedSearch, 100)

  const amountPerPage = 100

  const paginationParams = {
    amountPerPage: `${amountPerPage}`,
    pageNumber: `${pageNumber}`,
  }

  const songsQuery = useQuery({
    ...getMainSongsQueryOptions(
      debouncedSearch
        ? {
            name: debouncedSearch,
            ...paginationParams,
          }
        : paginationParams,
    ),
    placeholderData: keepPreviousData,
  })

  const isLoadingSongs =
    songsQuery.isLoading || (songsQuery.isPlaceholderData && songsQuery.isFetching)
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
  const couldHaveNextPage = songsQuery.data?.length === amountPerPage

  const addSongMutation = useMutation(addSongMutationOptions)
  const deleteSongMutation = useMutation(deleteSongMutationOptions)

  const addSong = (song: components['schemas']['Song']) => {
    addSongMutation.mutate(song)
  }
  const deleteSong = (songId: number) => {
    deleteSongMutation.mutate(songId)
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4 justify-center container mx-auto h-screen my-auto">
      <div className="border-2 border-orange-500 rounded-md w-full">
        <div className="flex flex-col gap-2 p-4 ">
          <div className="text-4xl text-white font-bold py-2">Songs</div>
          <input
            type="search"
            className="w-full rounded border-2 border-orange-500 bg-transparent p-2 text-base text-white placeholder-white"
            id="exampleSearch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find songs..."
          />

          {songsQuery.data?.map((el, index) => (
            <div
              key={`${el.name}-${el.id}-${index}`}
              className="p-2 rounded-lg border-2 border-gray-500"
            >
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li
                  className={cn('p-2', {
                    'opacity-30': isLoadingSongs,
                  })}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-12 h-12 rounded-md"
                        src={el.albumImage}
                        referrerPolicy={'no-referrer'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {el.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {el.artist}
                      </div>
                    </div>
                    <button
                      disabled={savedSongIds.has(el.id)}
                      onClick={() => addSong(el)}
                      className={cn(
                        'hover:cursor-pointer rounded font-bold text-black bg-white  p-2 px-3',
                        {
                          'opacity-30': savedSongIds.has(el.id),
                        },
                      )}
                    >
                      Add
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          ))}

          <div>
            <button
              disabled={pageNumber === 1 || songsQuery.isFetching}
              onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
            >
              Previous
            </button>

            <span>Page {pageNumber}</span>

            <button
              disabled={!couldHaveNextPage || songsQuery.isFetching}
              onClick={() => setPageNumber((page) => page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="border-2 border-orange-500 rounded-md w-full pt-2">
        <div className="flex flex-col h-full gap-2 p-4 ">
          <div className="text-4xl text-white font-bold py-2">Saved</div>
          <input
            type="search"
            className="w-full rounded border-2 border-orange-500 bg-transparent p-2 text-base text-white placeholder-white"
            id="exampleSearch"
            value={savedSearch}
            onChange={(e) => setSavedSearch(e.currentTarget.value)}
            placeholder="Find saved songs..."
          />
          {savedQuery.data?.map((el, index) => (
            <div
              key={`${el.name}-${el.id}-${index}`}
              className={'p-2 rounded-lg border-2 border-gray-500'}
            >
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li
                  className={cn('p-2', {
                    'opacity-30': isLoadingSavedSongs,
                  })}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-12 h-12 rounded-md" src={el.albumImage} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {el.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {el.artist}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSong(el.id)}
                      className="hover:cursor-pointer font-bold text-white bg-orange-500 rounded py-2 px-3"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
