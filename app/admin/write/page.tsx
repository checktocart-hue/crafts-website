"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  // Reviews
  "Book Nooks",
  "Dollhouses",
  "Metal Models",
  // Blog & Guides
  "Guides",
  "Tutorials",
  "Tools"
];

export default function WritePostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: CATEGORIES[0], // Defaults to Book Nooks
    coverImage: "",
    excerpt: "",
    content: "",
    status: "published"
  });

  // Automatically generate an SEO-friendly slug when typing the title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "blog"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/manage');
      }, 1500);
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Check console for details.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Draft New Article</h1>
        <p className="text-gray-500">Publish a new review or guide to the database.</p>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 font-bold">
          Post published successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
        
        {/* Row 1: Title and Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Article Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
              placeholder="e.g., The Ultimate Rolife Book Nook Review"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">URL Slug</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 text-gray-600 outline-none"
              placeholder="the-ultimate-rolife-book-nook-review"
            />
          </div>
        </div>

        {/* Row 2: Category and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none bg-white cursor-pointer"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image URL</label>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            placeholder="https://res.cloudinary.com/.../image.jpg"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Short Excerpt (For Grid Cards)</label>
          <textarea
            required
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none resize-none"
            placeholder="A brief summary of the article..."
          />
        </div>

        {/* Markdown Content */}
        <div>
          <div className="flex justify-between items-end mb-1">
            <label className="block text-sm font-bold text-gray-700">Article Content (Markdown)</label>
            <span className="text-xs text-gray-500">Supports # headings, **bold**, and *italics*</span>
          </div>
          <textarea
            required
            rows={15}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-gray-900 outline-none font-mono text-sm"
            placeholder="## Introduction&#10;&#10;Write your review here..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#111827] hover:bg-black text-white font-bold py-3 px-8 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
}