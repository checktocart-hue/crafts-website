"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // Ensure this path matches your project
import Link from "next/link";
import { Edit, ExternalLink, Trash2 } from "lucide-react";

type Post = {
  id: string;
  title: string;
  type: string;
  createdAt: any;
  collectionName: string; 
};

export default function ManageContentPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // MDX to Firebase Migration Script
  const runMigration = async () => {
    const confirm = window.confirm("Are you sure? This will push all local MDX files to Firebase.");
    if (!confirm) return;

    try {
      const res = await fetch('/api/migrate');
      const data = await res.json();

      if (data.success && data.extractedContent) {
        console.log(`Found ${data.extractedContent.length} files. Migrating to Firebase...`);
        
        for (const post of data.extractedContent) {
          const docRef = doc(db, post.collectionName, post.slug);
          
          await setDoc(docRef, {
            title: post.title,
            slug: post.slug,
            type: post.type,
            category: post.category,
            coverImage: post.coverImage,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: new Date().toISOString()
          }, { merge: true });
          
          console.log(`Migrated: ${post.title}`);
        }
        
        alert("Migration Complete! Refresh the page to see your content.");
      } else {
        alert("Migration failed. Did you create the API route?");
      }
    } catch (error) {
      console.error("Migration failed:", error);
      alert("Migration failed. Check console.");
    }
  };

  // Fetch from BOTH collections
  useEffect(() => {
    async function fetchAllContent() {
      try {
        const reviewsQuery = query(collection(db, "reviews"));
        const blogQuery = query(collection(db, "blog")); 

        const [reviewsSnap, blogSnap] = await Promise.all([
          getDocs(reviewsQuery),
          getDocs(blogQuery)
        ]);
        
        const allContent = [
          ...reviewsSnap.docs.map(d => ({ 
            id: d.id, 
            collectionName: "reviews",
            ...d.data() 
          })),
          ...blogSnap.docs.map(d => ({ 
            id: d.id, 
            collectionName: "blog",
            ...d.data() 
          }))
        ] as Post[];
        
        allContent.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        
        setPosts(allContent);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllContent();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
        <div className="flex gap-4">
          <button 
            onClick={runMigration}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-700 transition shadow-sm"
          >
            Run MDX Migration
          </button>
          <Link 
            href="/admin/write"
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition shadow-sm"
          >
            + Draft New
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 animate-pulse font-medium">
            Loading database records...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No content found. Click "Run MDX Migration" to import your files!
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{post.title}</td>
                  <td className="p-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {post.type || post.collectionName.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-3 text-gray-400">
                    <button className="hover:text-blue-600 transition" title="View Live">
                      <ExternalLink size={18} />
                    </button>
                    {/* Passes the collectionName to the URL so the Write page knows where to fetch the edit data */}
                    <Link href={`/admin/write?edit=${post.id}&col=${post.collectionName}`} className="hover:text-green-600 transition" title="Edit Post">
                      <Edit size={18} />
                    </Link>
                    <button className="hover:text-red-600 transition" title="Delete Post">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}