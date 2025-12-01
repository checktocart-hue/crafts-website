import { MetadataRoute } from 'next'
import { client } from '@/app/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://craftsandkits.com'

  // 1. Get all Reviews
  const reviews = await client.fetch(`*[_type == "review"] { "slug": slug.current, _updatedAt }`)
  
  // 2. Get all Projects (Guides)
  const projects = await client.fetch(`*[_type == "project"] { "slug": slug.current, _updatedAt }`)

  // 3. Get all Categories
  const categories = await client.fetch(`*[_type == "category"] { "slug": slug.current, _updatedAt }`)

  // 4. Build the URLs
  const reviewUrls = reviews.map((post: any) => ({
    url: `${baseUrl}/reviews/${post.slug}`,
    lastModified: post._updatedAt,
    priority: 0.8,
  }))

  const projectUrls = projects.map((post: any) => ({
    url: `${baseUrl}/projects/${post.slug}`,
    lastModified: post._updatedAt,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((cat: any) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }))

  // 5. Return the full map
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.5,
    },
    ...reviewUrls,
    ...projectUrls,
    ...categoryUrls,
  ]
}