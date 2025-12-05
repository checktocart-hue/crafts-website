import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "next-sanity/image"; 
// Note: next-sanity often includes the image builder now, 
// but let's stick to the package you have installed and fix the import style:

import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "nrmr5169",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}