"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useSearchParams } from "next/navigation";

// Dynamically import the editor
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// Wrap the actual form in a component so we can use useSearchParams safely
function WriteForm() {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit");
  const editType = searchParams.get("type");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("tutorials");
  const [image, setImage] = useState("");
  const [docType, setDocType] = useState("posts");
  const [content, setContent] = useState<string | undefined>("Write your article here...");
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // DETECT EDIT MODE AND LOAD DATA
  useEffect(() => {
    if (editSlug && editType) {
      setIsEditing(true);
      setDocType(editType);
      
      const fetchExistingPost = async () => {
        try {
          const docRef = doc(db, editType, editSlug);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title || "");
            setSlug(data.slug || editSlug);
            setCategory(data.category || "tutorials");
            setImage(data.image || "");
            setContent(data.content || "");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
          setMessage("❌ Failed to load existing article.");
        }
      };
      
      fetchExistingPost();
    }
  }, [editSlug, editType]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // Only auto-generate the slug if we are creating a NEW post
    if (!isEditing) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage("⏳ Uploading to ImgBB...");

    const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY_HERE"; 
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setImage(data.data.url);
        setMessage("✅ Image uploaded successfully!");
      } else {
        throw new Error("ImgBB returned an error.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Image upload failed. Check console.");
    }
    setIsUploading(false);
  };

  const handlePublish = async () => {
    if (!title || !slug || !content) {
      setMessage("❌ Title, Slug, and Content are required.");
      return;
    }

    setIsPublishing(true);
    setMessage("");

    try {
      // Set up the payload
      const postData: any = {
        title,
        slug,
        category,
        image,
        content,
        updatedAt: new Date().toISOString(),
      };

      // Only set createdAt if this is a brand new post
      if (!isEditing) {
        postData.createdAt = new Date().toISOString();
      }

      // merge: true ensures we don't accidentally overwrite existing properties
      await setDoc(doc(db, docType, slug), postData, { merge: true });
      
      setMessage(`✅ ${isEditing ? 'Updated' : 'Published'} successfully to ${docType}!`);
      
      // If it's a new post, clear the form so you can write the next one
      if (!isEditing) {
        setTimeout(() => {
          setTitle("");
          setSlug("");
          setImage("");
          setContent("Write your next article here...");
          setMessage("");
        }, 3000);
      }
      
    } catch (error) {
      console.error("Error publishing:", error);
      setMessage("❌ Failed to save article. Check console.");
    }
    setIsPublishing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" data-color-mode="light">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? "Edit Content" : "Draft New Content"}
        </h1>
        <button 
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800 disabled:opacity-50"
        >
          {isPublishing ? "Saving..." : (isEditing ? "Update Site" : "Publish to Site")}
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg font-bold ${message.includes("✅") ? "bg-green-100 text-green-800" : message.includes("⏳") ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">URL Slug</label>
            <input 
              type="text" 
              value={slug}
              disabled={isEditing}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 outline-none text-gray-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Content Type</label>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              disabled={isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-stone-100 font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="posts">Blog Post</option>
              <option value="reviews">Product Review</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="book-nooks">Book Nooks</option>
              <option value="dollhouses">Dollhouses</option>
              <option value="metal-models">Metal Models</option>
              <option value="tutorials">Tutorials</option>
              <option value="tools-supplies">Tools & Supplies</option>
              <option value="buying-guides">Buying Guides</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
           <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image</label>
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                placeholder="Image URL will appear here"
              />
              <label className="w-full bg-stone-100 border border-stone-300 text-stone-700 font-bold py-2 px-4 rounded-lg text-center cursor-pointer hover:bg-stone-200 transition text-sm">
                {isUploading ? "Uploading..." : "Upload from Computer"}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <MDEditor
          value={content}
          onChange={setContent}
          height={600}
          preview="live"
        />
      </div>
    </div>
  );
}

// Ensure the page safely loads the URL parameters without crashing Next.js
export default function AdminWritePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500 font-bold">Loading Editor...</div>}>
      <WriteForm />
    </Suspense>
  );
}