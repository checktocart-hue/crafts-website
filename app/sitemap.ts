import { MetadataRoute } from 'next'
import { client } from './lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.craftsandkits.com' // Ensure this matches your live domain

  // 1. Fetch all Blog Posts
  const blogQuery = `*[_type == "post" || _type == "project"] { "slug": slug.current, _updatedAt }`
  const blogPosts = await client.fetch(blogQuery)

  const blogUrls = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 2. Fetch all Reviews (CRITICAL for your new content)
  const reviewQuery = `*[_type == "review"] { "slug": slug.current, _updatedAt }`
  const reviews = await client.fetch(reviewQuery)

  const reviewUrls = reviews.map((post: any) => ({
    url: `${baseUrl}/reviews/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9, // Higher priority for reviews
  }))

  // 3. Define Static Pages
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/reviews',
    '/tools',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  }))

  return [...staticRoutes, ...blogUrls, ...reviewUrls]
}