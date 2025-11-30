import { createClient } from "next-sanity";
import * as imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "nrmr5169", // Your Project ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// The Bulletproof Fix:
// We tell code to look for the "default" entrance, and if missing, use the "side" entrance.
const builder = (imageUrlBuilder as any).default 
  ? (imageUrlBuilder as any).default(client) 
  : (imageUrlBuilder as any)(client);

export function urlFor(source: any) {
  return builder.image(source);
}