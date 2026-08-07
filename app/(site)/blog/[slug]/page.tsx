import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // Ensure this matches your path
import Link from "next/link";

// This tells Next.js to check Firebase for updates every 60 seconds
export const revalidate = 60; 

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Fetch directly from Firebase instead of local folders
  const docRef = doc(db, "blog", slug);
  const docSnap = await getDoc(docRef);

  // 2. If it doesn't exist, or if it's marked as a draft, show the 404
  if (!docSnap.exists() || docSnap.data().status === "draft") {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post not found (or still a draft)</h1>
        <Link href="/blog" className="text-green-700 font-bold hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  const data = docSnap.data();
  // Handle older MDX posts that used "image" vs new CKEditor posts that use "coverImage"
  const displayImage = data.coverImage || data.image; 

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>
      
      {displayImage && (
        <img 
          src={displayImage} 
          alt={data.title || "Blog image"} 
          className="w-full h-auto rounded-lg mb-8 object-cover max-h-[500px]" 
        />
      )}

      {/* 3. CKEditor outputs HTML, so we render it safely inside the prose container */}
      <div 
        className="prose prose-lg prose-green max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: data.content }} 
      />
    </article>
  );
}