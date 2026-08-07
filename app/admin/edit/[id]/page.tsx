"use client";

import { useState, useEffect, use } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const postId = resolvedParams.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dbCollection, setDbCollection] = useState("blog");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    coverImage: "",
    excerpt: "",
    content: "",
    status: "published"
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let docRef = doc(db, "blog", postId);
        let docSnap = await getDoc(docRef);
        let foundCollection = "blog";
        
        if (!docSnap.exists()) {
          docRef = doc(db, "reviews", postId);
          docSnap = await getDoc(docRef);
          foundCollection = "reviews";
        }
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDbCollection(foundCollection);
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            category: data.category || "Book Nooks",
            coverImage: data.coverImage || "",
            excerpt: data.excerpt || "",
            // Add fallback in case legacy used 'body' instead of 'content'
            content: data.content || data.body || "", 
            status: data.status || "published"
          });
        } else {
          alert("Post not found in any collection!");
          router.push('/admin/manage');
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const docRef = doc(db, dbCollection, postId);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/manage');
      }, 1500);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center font-bold">Loading post data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Edit Article</h1>
        <p className="text-gray-500">Update categories, fix typos, or change the status.</p>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 font-bold">
          Post updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Article Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">URL Slug</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category (Strict)</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none bg-white cursor-pointer"
            >
              <optgroup label="Reviews">
                <option value="Book Nooks">Book Nooks</option>
                <option value="Dollhouses">Dollhouses</option>
                <option value="Metal Models">Metal Models</option>
              </optgroup>
              <optgroup label="Blog & Guides">
                <option value="Guides">Guides</option>
                <option value="Tutorials">Tutorials</option>
                <option value="Tools">Tools</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none bg-white"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image URL</label>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Short Excerpt</label>
          <textarea
            required
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Article Content (Markdown)</label>
          <textarea
            required
            rows={15}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-gray-900 outline-none font-mono text-sm"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#111827] hover:bg-black text-white font-bold py-3 px-8 rounded-md transition disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}