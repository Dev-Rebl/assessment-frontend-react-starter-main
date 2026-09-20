export const queryKeys = {
  all: ['songs'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  mainList: (filters: unknown) => [...queryKeys.lists(), 'main', filters] as const,
  savedList: (filters: unknown) => [...queryKeys.lists(), 'save', filters] as const,
}
