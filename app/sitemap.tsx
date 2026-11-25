import { MetadataRoute } from 'next';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

// Refresh the sitemap every hour so newly published posts appear promptly
export const revalidate = 3600;

function parseFirestoreDate(dateField: any): Date {
  if (!dateField) return new Date();
  if (typeof dateField.toDate === 'function') return dateField.toDate();
  if (dateField instanceof Date) return dateField;
  const parsed = new Date(dateField);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.craftsandkits.com';

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/reviews',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Fetch Blog Posts and Reviews from Firestore
  try {
    const blogQuery = query(collection(db, "blog"));
    const reviewsQuery = query(collection(db, "reviews"));

    const [blogSnap, reviewsSnap] = await Promise.all([
      getDocs(blogQuery),
      getDocs(reviewsQuery),
    ]);

    // 3. Map Blog URLs
    const blogUrls: MetadataRoute.Sitemap = blogSnap.docs
      .filter((doc) => doc.data().status === "published" || !doc.data().status)
      .map((doc) => {
        const data = doc.data();
        const slug = data.slug || doc.id;
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: parseFirestoreDate(data.updatedAt || data.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        };
      });

    // 4. Map Review URLs directly to /blog/ to match your next.config.ts canonical route
    const reviewUrls: MetadataRoute.Sitemap = reviewsSnap.docs
      .filter((doc) => doc.data().status === "published" || !doc.data().status)
      .map((doc) => {
        const data = doc.data();
        const slug = data.slug || doc.id;
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: parseFirestoreDate(data.updatedAt || data.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        };
      });

    // Deduplicate URLs in case a slug exists in both collections
    const allDynamicUrls = [...blogUrls, ...reviewUrls];
    const uniqueDynamicUrls = Array.from(
      new Map(allDynamicUrls.map((item) => [item.url, item])).values()
    );

    return [...staticRoutes, ...uniqueDynamicUrls];
  } catch (error) {
    console.error("Error generating dynamic sitemap from Firebase:", error);
    return staticRoutes;
  }
}
