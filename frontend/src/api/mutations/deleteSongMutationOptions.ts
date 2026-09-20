import { mutationOptions } from "@tanstack/react-query"
import { api } from "../api"
import { queryKeys } from "../queries/queryKeys"
import { queryClient } from "../../queryclient"

export const deleteSongMutationOptions = mutationOptions({
    mutationFn: async (songId: number) => {
        const { data, error, response } = await api.DELETE('/saved', {
            params: { query: { songId } },
        })

        if (!response.ok) {
            throw error
        }

        return data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() })
    }
})