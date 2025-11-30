import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "nrmr5169", // <--- DELETE THIS TEXT AND PASTE YOUR ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // We use false so you see updates instantly
});