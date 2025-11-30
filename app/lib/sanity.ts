import { createClient } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url'; // <--- Renamed this based on the error

export const client = createClient({
  projectId: "nrmr5169", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Use the new name here
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}