import { mutationOptions } from '@tanstack/react-query'
import { api } from '../api'
import { components } from '../api-types'

export const loginMutationOptions = mutationOptions({
  mutationKey: ['login'],
  mutationFn: async (credentials: components['schemas']['Login']) => {
    const { data, error, response } = await api.POST('/login', {
      body: credentials,
    })

    if (!response.ok) {
      throw error
    }

    return data
  },
})
