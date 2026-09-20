import { mutationOptions } from "@tanstack/react-query";
import { api } from "../api";
import { components } from "../api-types";
import { queryKeys } from "../queries/queryKeys";
import { queryClient } from "../../queryclient";

export const addSongMutationOptions = mutationOptions({
  mutationFn: async (song: components["schemas"]["Song"]) => {
    const { data, error, response } = await api.POST("/saved", {
      body: song,
    });

    if (!response.ok) {
      throw error;
    }

    return data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
  },
});
