"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

export default function AdminManagePage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const postsSnap = await getDocs(collection(db, "posts"));
      const reviewsSnap = await getDocs(collection(db, "reviews"));
      
      const allPosts = postsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id, type: "posts" }));
      const allReviews = reviewsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id, type: "reviews" }));
      
      const combined = [...allPosts, ...allReviews].sort((a: any, b: any) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
      
      setContent(combined);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleDelete = async (id: string, type: string) => {
    if (!window.confirm("Are you sure you want to delete this permanently?")) return;
    try {
      await deleteDoc(doc(db, type, id));
      setContent(content.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
        <Link href="/admin/write" className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition">
          + Draft New
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-bold">Loading your content...</div>
      ) : content.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500">
          No articles found. Time to start writing!
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-sm font-bold text-gray-700">Title</th>
                <th className="p-4 text-sm font-bold text-gray-700">Type</th>
                <th className="p-4 text-sm font-bold text-gray-700">Date</th>
                <th className="p-4 text-sm font-bold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {content.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">{item.title}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.type === 'posts' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {item.type === 'posts' ? 'Blog' : 'Review'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="p-4 flex justify-end gap-3">
                    <Link href={`/${item.type === 'posts' ? 'blog' : 'reviews'}/${item.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-green-600 transition" title="View Live">
                      <ExternalLink size={18} />
                    </Link>
                    <Link href={`/admin/write?edit=${item.slug}&type=${item.type}`} className="p-2 text-gray-400 hover:text-blue-600 transition" title="Edit">
                      <Pencil size={18} />
                    </Link>
                    <button onClick={() => handleDelete(item.id, item.type)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}