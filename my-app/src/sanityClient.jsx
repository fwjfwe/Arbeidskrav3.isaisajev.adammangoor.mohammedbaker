import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "6m8nbi12",
  dataset: "production",
  apiVersion: "2023-03-25",
  useCdn: true,
});