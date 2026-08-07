"use client";

import { marked } from "marked";
import { useState, useEffect, Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; 

const CustomEditor = dynamic(() => import("@/components/CustomEditor"), { 
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg animate-pulse">Loading Editor...</div>
});

// Define our strict category lists
const BLOG_CATEGORIES = ["Buying Guides", "Tutorials", "Tools"];
const REVIEW_CATEGORIES = ["Book Nooks", "Dollhouses", "Metal Models"];

function EditorForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const editId = searchParams.get("edit");
  const editCol = searchParams.get("col") || "reviews";
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("Product Review");
  const [category, setCategory] = useState(REVIEW_CATEGORIES[0]);
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  
  const [isFetching, setIsFetching] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    async function fetchPost() {
      if (!editId) return;
      try {
        const docRef = doc(db, editCol, editId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setType(data.type || "Product Review");
          setCategory(data.category || REVIEW_CATEGORIES[0]);
          setCoverImage(data.coverImage || "");
          setSeoTitle(data.seoTitle || "");
          setMetaDescription(data.metaDescription || "");
          setStatus(data.status || "draft");
          
          const rawContent = data.content || "";
          const formattedContent = await marked.parse(rawContent);
          setContent(formattedContent as string); 
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchPost();
  }, [editId, editCol]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editId) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  // Dynamically switch categories when Content Type changes
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setType(newType);
    setCategory(newType === "Blog Post" ? BLOG_CATEGORIES[0] : REVIEW_CATEGORIES[0]);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (data.url) setCoverImage(data.url);
      else alert("Upload failed.");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const executeSave = async (targetStatus: "draft" | "published") => {
    if (!title || !slug || !content) {
      alert("Please provide at least a title, slug, and content.");
      return;
    }

    setIsSaving(true);
    try {
      const targetCollection = editId ? editCol : (type === "Blog Post" ? "blog" : "reviews");
      const docRef = editId 
        ? doc(db, targetCollection, editId) 
        : doc(collection(db, targetCollection));

      await setDoc(docRef, {
        title,
        slug,
        type,
        category,
        coverImage,
        seoTitle,
        metaDescription,
        content,
        status: targetStatus,
        updatedAt: new Date().toISOString(),
        ...(editId ? {} : { createdAt: new Date().toISOString() })
      }, { merge: true });

      alert(targetStatus === "published" ? "Successfully published to site!" : "Draft saved successfully!");
      router.push("/admin/manage");
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Failed to save post.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (!slug) {
      alert("Please enter a slug first to preview.");
      return;
    }
    window.open(`/preview?slug=${slug}&col=${editCol || (type === "Blog Post" ? "blog" : "reviews")}`, "_blank");
  };

  if (isFetching) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">Loading post data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {editId ? "Edit Content" : "Draft New Content"}
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
            Status: <span className={status === "published" ? "text-green-600" : "text-amber-600"}>{status}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePreview}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition text-sm shadow-sm"
          >
            Preview
          </button>
          <button 
            onClick={() => executeSave("draft")}
            disabled={isSaving}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition text-sm shadow-sm disabled:opacity-50"
          >
            Save Draft
          </button>
          <button 
            onClick={() => executeSave("published")}
            disabled={isSaving}
            className="bg-green-700 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-800 transition text-sm shadow-sm disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Publish Live"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={handleTitleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">URL Slug</label>
              <input 
                type="text" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-gray-600 outline-none text-sm font-mono"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Content Type</label>
              <select 
                value={type}
                onChange={handleTypeChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm bg-white"
              >
                <option value="Product Review">Product Review</option>
                <option value="Blog Post">Blog Post</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm bg-white"
              >
                {type === "Blog Post" 
                  ? BLOG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)
                  : REVIEW_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)
                }
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image</label>
              <input 
                type="text" 
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Image URL..."
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none text-sm mb-2"
              />
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleCoverUpload}
                className="hidden" 
              />
              <button 
                onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
              >
                Upload from Computer
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">SEO Title (Optional)</label>
            <input 
              type="text" 
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Leave blank to use main title..."
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description</label>
            <textarea 
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Brief summary for Google search results..."
              rows={2}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm bg-white resize-none"
            />
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm mt-8">
          <CustomEditor value={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}

export default function AdminEditorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading workspace...</div>}>
      <EditorForm />
    </Suspense>
  );
}