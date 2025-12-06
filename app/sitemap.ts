import { MetadataRoute } from 'next'
import { client } from "@/app/lib/sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // REPLACE this with your actual live domain
  const baseUrl = 'https://www.craftsandkits.com' 

  // 1. Fetch Dynamic Data from Sanity
  // We fetch slugs and update times for both Reviews and Blog Posts
  const reviews = await client.fetch(`*[_type == "review"]{ "slug": slug.current, _updatedAt }`)
  
  // Note: We fetch both "post" and "project" to match your Blog page logic
  const posts = await client.fetch(`*[(_type == "post" || _type == "project")]{ "slug": slug.current, _updatedAt }`)

  // 2. Generate URLs for Reviews
  const reviewUrls = reviews.map((review: any) => ({
    url: `${baseUrl}/reviews/${review.slug}`,
    lastModified: review._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 3. Generate URLs for Blog Posts
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 4. Define Static Pages
  const staticRoutes = [
    '',             // Homepage
    '/reviews',     // Reviews Index
    '/blog',        // Blog Index
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/cookies',
    '/submit-review',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.6, // Homepage is priority 1
  }))

  // 5. Combine everything
  return [...staticRoutes, ...reviewUrls, ...postUrls]
}