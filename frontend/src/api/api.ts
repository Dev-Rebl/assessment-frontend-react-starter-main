import createClient from "openapi-fetch";
import type { paths } from "./api-types";

export const api = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
});

api.use({
  async onResponse({ response }) {
    if (response.ok) {
      return;
    }

    const body: unknown = await response
      .clone()
      .json()
      .catch(() => undefined);

    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
        ? body.error
        : `API request failed (${response.status})`;

    throw new Error(message);
  },
});
