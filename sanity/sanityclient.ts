import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "b4e25sdq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false so you see updates immediately
});