import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: "nrmr5169", // Double check this is your ID!
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// This is the missing helper function!
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}