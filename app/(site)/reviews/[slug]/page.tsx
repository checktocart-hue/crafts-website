import { doc, getDoc, collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Link from "next/link";
import { Metadata } from "next";

// This tells Next.js to check Firebase for updates every 60 seconds
export const revalidate = 60; 

// 1. DYNAMIC METADATA FETCH
// Pulls the exact SEO Title and Meta Description you wrote in the CMS
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  
  // Query the reviews collection first
  let q = query(collection(db, "reviews"), where("slug", "==", params.slug), limit(1));
  let snap = await getDocs(q);
  
  if (snap.empty) {
    q = query(collection(db, "blog"), where("slug", "==", params.slug), limit(1));
    snap = await getDocs(q);
  }

  if (snap.empty) {
    return { title: "Review Not Found | Crafts & Kits" };
  }

  const post = snap.docs[0].data() as any;

  return {
    title: post.seoTitle || post.title || "Crafts & Kits",
    description: post.metaDescription || "In-depth tutorials and recommendations for book nooks, metal models, and miniature kits.",
    alternates: {
      canonical: `https://www.craftsandkits.com/reviews/${params.slug}`,
    },
  };
}

export default async function ReviewPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const docRef = doc(db, "reviews", slug);
  const docSnap = await getDoc(docRef);

  // Check if it exists AND make sure it is not a draft
  if (!docSnap.exists() || docSnap.data().status === "draft") {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Review not found (or still a draft)</h1>
        <Link href="/reviews" className="text-green-700 font-bold hover:underline">
          &larr; Back to Reviews
        </Link>
      </div>
    );
  }

  const post = docSnap.data();
  // Support both new posts (coverImage) and older migrated posts (image)
  const displayImage = post.coverImage || post.image;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
      
      {displayImage && (
        <img 
          src={displayImage} 
          alt={post.title} 
          className="w-full h-auto rounded-lg mb-8 object-cover max-h-[500px]" 
        />
      )}

      {/* Render the raw HTML from CKEditor */}
      <div 
        className="prose prose-lg prose-green max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
      
    </article>
  );
}