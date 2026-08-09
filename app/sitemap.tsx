import { MetadataRoute } from 'next';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/app/lib/firebase'; // Adjust this path if your firebase.ts is elsewhere

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.craftsandkits.com';

  // 1. Fetch your blog posts and reviews
  const blogQuery = query(collection(db, "blog"));
  const reviewsQuery = query(collection(db, "reviews"));
  
  const [blogSnap, reviewsSnap] = await Promise.all([
    getDocs(blogQuery),
    getDocs(reviewsQuery)
  ]);

  // 2. Map blog posts to sitemap format
  const blogUrls = blogSnap.docs
    .filter(doc => doc.data().status === "published" || !doc.data().status)
    .map((doc) => ({
      url: `${baseUrl}/blog/${doc.data().slug || doc.id}`,
      lastModified: new Date(doc.data().updatedAt || doc.data().createdAt || new Date()),
    }));

  // 3. Map review posts to sitemap format
  const reviewUrls = reviewsSnap.docs
    .filter(doc => doc.data().status === "published" || !doc.data().status)
    .map((doc) => ({
      url: `${baseUrl}/blog/${doc.data().slug || doc.id}`, // Adjust if reviews use a different route
      lastModified: new Date(doc.data().updatedAt || doc.data().createdAt || new Date()),
    }));

  // 4. Return the homepage + all dynamic URLs
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...blogUrls,
    ...reviewUrls,
  ];
}