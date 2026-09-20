import { queryOptions } from "@tanstack/react-query";
import { api } from "../api";
import { paths } from "../api-types";
import { queryKeys } from "./queryKeys";

type Filters = Record<string, string> &
  NonNullable<paths["/saved"]["get"]["parameters"]["query"]>;

export const getSavedSongsQueryOptions = (filters?: Filters) =>
  queryOptions({
    queryKey: queryKeys.savedList(filters),
    queryFn: async () => {
      const { data } = await api.GET(
        "/saved",
        filters ? { params: { query: filters } } : undefined,
      );
      return data;
    },
  });
