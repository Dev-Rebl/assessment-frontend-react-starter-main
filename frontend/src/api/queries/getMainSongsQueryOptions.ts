import { queryOptions } from '@tanstack/react-query'
import { api } from '../api'
import { paths } from '../api-types'
import { queryKeys } from './queryKeys'

type Filters = NonNullable<paths['/songs']['get']['parameters']['query']>

export const getMainSongsQueryOptions = (filters?: Filters) =>
  queryOptions({
    queryKey: queryKeys.mainList(filters),
    queryFn: async () => {
      const { data } = await api.GET('/songs', filters ? { params: { query: filters } } : undefined)

      return {
        songs: data ?? [],
        pageNumber: Number(filters?.pageNumber ?? 1),
      }
    },
  })
