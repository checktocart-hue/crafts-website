"use client";

import { marked } from "marked";
import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg animate-pulse">
      Loading Editor...
    </div>
  ),
});

const BLOG_CATEGORIES = ["Buying Guides", "Tutorials", "Tools"];
const REVIEW_CATEGORIES = ["Book Nooks", "Dollhouses", "Metal Models"];

interface PostSummary {
  id: string;
  col: "blog" | "reviews";
  title: string;
  slug: string;
  type: string;
  category: string;
  status: string;
  updatedAt: string;
}

function EditorForm() {
  const searchParams = useSearchParams();
  const initialEditId = searchParams.get("edit");
  const initialEditCol = (searchParams.get("col") as "blog" | "reviews") || "reviews";

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sidebar & Workspace States
  const [allPosts, setAllPosts] = useState<PostSummary[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "published" | "draft" | "blog" | "reviews">("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active Document Tracking (null = brand new unsaved post)
  const [activeId, setActiveId] = useState<string | null>(initialEditId);
  const [activeCol, setActiveCol] = useState<"blog" | "reviews">(initialEditCol);

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("Product Review");
  const [category, setCategory] = useState(REVIEW_CATEGORIES[0]);
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [status, setStatus] = useState("draft");

  // UI Feedback States
  const [isFetchingDoc, setIsFetchingDoc] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  // Fetch all posts from both collections for the left sidebar
  const fetchAllPosts = useCallback(async () => {
    setIsLoadingList(true);
    try {
      const [blogSnap, reviewSnap] = await Promise.all([
        getDocs(collection(db, "blog")),
        getDocs(collection(db, "reviews")),
      ]);

      const list: PostSummary[] = [];

      blogSnap.forEach((d) => {
        const data = d.data();
        list.push({
          id: d.id,
          col: "blog",
          title: data.title || "Untitled Post",
          slug: data.slug || "",
          type: data.type || "Blog Post",
          category: data.category || "Buying Guides",
          status: data.status || "draft",
          updatedAt: data.updatedAt || data.createdAt || "",
        });
      });

      reviewSnap.forEach((d) => {
        const data = d.data();
        list.push({
          id: d.id,
          col: "reviews",
          title: data.title || "Untitled Review",
          slug: data.slug || "",
          type: data.type || "Product Review",
          category: data.category || "Book Nooks",
          status: data.status || "draft",
          updatedAt: data.updatedAt || data.createdAt || "",
        });
      });

      // Sort most recently updated first
      list.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
      setAllPosts(list);
    } catch (err) {
      console.error("Error loading sidebar posts:", err);
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  // Load a specific post into the editor without leaving the page
  const loadPostIntoEditor = useCallback(async (id: string, col: "blog" | "reviews") => {
    setIsFetchingDoc(true);
    setSaveBanner(null);
    try {
      const docRef = doc(db, col, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setActiveId(id);
        setActiveCol(col);
        setTitle(data.title || "");
        setSlug(data.slug || "");
        const docType = data.type || (col === "blog" ? "Blog Post" : "Product Review");
        setType(docType);
        setCategory(
          data.category || (docType === "Blog Post" ? BLOG_CATEGORIES[0] : REVIEW_CATEGORIES[0])
        );
        setCoverImage(data.coverImage || "");
        setSeoTitle(data.seoTitle || "");
        setMetaDescription(data.metaDescription || "");
        setAffiliateLink(data.affiliateLink || "");
        setStatus(data.status || "draft");

        const rawContent = data.content || "";
        const formattedContent = await marked.parse(rawContent);
        setContent(formattedContent as string);

        // Keep URL query params in sync without triggering a page reload
        window.history.replaceState(null, "", `/admin/write?edit=${id}&col=${col}`);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setIsFetchingDoc(false);
    }
  }, []);

  // Load initial URL param post if present
  useEffect(() => {
    if (initialEditId) {
      loadPostIntoEditor(initialEditId, initialEditCol);
    }
  }, [initialEditId, initialEditCol, loadPostIntoEditor]);

  // Reset form for a brand new article
  const handleCreateNew = () => {
    setActiveId(null);
    setActiveCol("reviews");
    setTitle("");
    setSlug("");
    setType("Product Review");
    setCategory(REVIEW_CATEGORIES[0]);
    setCoverImage("");
    setContent("");
    setSeoTitle("");
    setMetaDescription("");
    setAffiliateLink("");
    setStatus("draft");
    setSaveBanner(null);
    window.history.replaceState(null, "", "/admin/write");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Auto-generate slug only when creating a new post
    if (!activeId) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

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

  // Insert custom shortcodes at the bottom of the current editor content
  const insertShortcode = (shortcode: string) => {
    setContent((prev) => `${prev}\n<p>${shortcode}</p>\n`);
  };

  // Upsert in place without leaving the page
  const executeSave = async (targetStatus: "draft" | "published") => {
    if (!title || !slug || !content) {
      alert("Please provide at least a title, slug, and content.");
      return;
    }

    setIsSaving(true);
    setSaveBanner(null);

    try {
      const desiredCollection: "blog" | "reviews" =
        type === "Blog Post" ? "blog" : "reviews";

      const isNewDoc = !activeId;
      const isCollectionChanged = activeId && activeCol !== desiredCollection;

      // Determine target Document Reference
      const docRef = activeId
        ? doc(db, desiredCollection, activeId)
        : doc(collection(db, desiredCollection));

      const nowIso = new Date().toISOString();

      await setDoc(
        docRef,
        {
          title,
          slug,
          type,
          category,
          coverImage,
          seoTitle,
          metaDescription,
          affiliateLink,
          content,
          status: targetStatus,
          updatedAt: nowIso,
          ...(isNewDoc ? { createdAt: nowIso } : {}),
        },
        { merge: true }
      );

      // If the user switched a post from Blog <-> Review, remove the old collection duplicate
      if (isCollectionChanged && activeId) {
        await deleteDoc(doc(db, activeCol, activeId));
      }

      // Lock the studio onto this saved document so subsequent edits update in place
      setActiveId(docRef.id);
      setActiveCol(desiredCollection);
      setStatus(targetStatus);
      window.history.replaceState(
        null,
        "",
        `/admin/write?edit=${docRef.id}&col=${desiredCollection}`
      );

      const timeStr = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setSaveBanner(
        targetStatus === "published"
          ? `✓ Published live at ${timeStr}`
          : `✓ Draft saved at ${timeStr}`
      );

      // Refresh sidebar list in the background
      fetchAllPosts();
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
    const targetCol = activeId ? activeCol : type === "Blog Post" ? "blog" : "reviews";
    window.open(`/preview?slug=${slug}&col=${targetCol}`, "_blank");
  };

  // Filter posts in the left drawer
  const filteredPosts = allPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterTab === "published") return p.status === "published";
    if (filterTab === "draft") return p.status !== "published";
    if (filterTab === "blog") return p.col === "blog";
    if (filterTab === "reviews") return p.col === "reviews";
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* LEFT SIDEBAR: PERSISTENT ARTICLE DRAWER */}
      <aside
        className={`${
          sidebarOpen ? "w-80 border-r" : "w-0 overflow-hidden"
        } bg-white border-gray-200 flex-shrink-0 flex flex-col transition-all duration-200 sticky top-0 h-screen`}
      >
        {/* Top Sidebar Header & + New Post Button */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between gap-2">
          <span className="font-extrabold text-gray-900 text-sm tracking-tight">
            📚 All Articles ({allPosts.length})
          </span>
          <button
            onClick={handleCreateNew}
            className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm transition cursor-pointer"
          >
            + New Post
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-gray-100">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or slug..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-green-700 outline-none"
          />
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 mt-2">
            {(["all", "published", "draft", "blog", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-2 py-1 rounded text-[11px] font-semibold capitalize transition cursor-pointer ${
                  filterTab === tab
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Post List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {isLoadingList ? (
            <div className="p-6 text-center text-xs text-gray-400 animate-pulse">
              Loading articles from Firestore...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-400">
              No matching articles found.
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isSelected = post.id === activeId;
              return (
                <button
                  key={`${post.col}-${post.id}`}
                  onClick={() => loadPostIntoEditor(post.id, post.col)}
                  className={`w-full text-left p-3.5 transition hover:bg-gray-50 flex flex-col gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-green-50/80 border-l-4 border-green-700"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {post.col === "blog" ? "Blog" : "Review"} • {post.category}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug mt-0.5">
                    {post.title}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    /{post.slug}
                  </p>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* RIGHT WORKSPACE: MAIN EDITOR */}
      <main className="flex-1 min-w-0 pb-20">
        {/* Sticky Action Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle Article Drawer"
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold cursor-pointer"
            >
              {sidebarOpen ? "◀ Hide List" : "▶ All Posts"}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">
                  {activeId ? "Editing Article" : "New Unsaved Article"}
                </h1>
                <span
                  className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {status}
                </span>
              </div>
              {saveBanner && (
                <p className="text-xs text-green-700 font-bold mt-0.5">
                  {saveBanner}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {slug && status === "published" && (
              <a
                href={`/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-50 text-blue-700 border border-blue-200 px-3.5 py-2 rounded-lg font-bold hover:bg-blue-100 transition text-xs"
              >
                View Live ↗
              </a>
            )}
            <button
              onClick={handlePreview}
              className="bg-gray-200 text-gray-800 px-3.5 py-2 rounded-lg font-bold hover:bg-gray-300 transition text-xs cursor-pointer"
            >
              Preview
            </button>
            <button
              onClick={() => executeSave("draft")}
              disabled={isSaving}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition text-xs shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => executeSave("published")}
              disabled={isSaving}
              className="bg-green-700 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-800 transition text-xs shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSaving
                ? "Saving..."
                : activeId && status === "published"
                ? "Update Live Post"
                : "Publish Live"}
            </button>
          </div>
        </div>

        {/* Main Form Body */}
        <div className="max-w-5xl mx-auto py-8 px-6">
          {isFetchingDoc ? (
            <div className="py-24 text-center text-gray-500 font-medium animate-pulse">
              Loading article into studio...
            </div>
          ) : (
            <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      URL Slug
                    </label>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Content Type
                    </label>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm bg-white"
                    >
                      {type === "Blog Post"
                        ? BLOG_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))
                        : REVIEW_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Cover Image
                    </label>
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
                      onClick={(e) => {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }}
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
                    >
                      Upload from Computer
                    </button>
                  </div>
                </div>
              </div>

              {/* SEO Metadata with Live Character Counters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-semibold text-gray-700">
                      SEO Title (Optional)
                    </label>
                    <span
                      className={`text-xs font-bold ${
                        seoTitle.length > 60
                          ? "text-red-600"
                          : seoTitle.length >= 45
                          ? "text-green-700"
                          : "text-gray-400"
                      }`}
                    >
                      {seoTitle.length}/60 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Leave blank to use main title..."
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm bg-white"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-semibold text-gray-700">
                      Meta Description
                    </label>
                    <span
                      className={`text-xs font-bold ${
                        metaDescription.length > 158
                          ? "text-red-600"
                          : metaDescription.length >= 120
                          ? "text-green-700"
                          : "text-gray-400"
                      }`}
                    >
                      {metaDescription.length}/155 chars
                    </span>
                  </div>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief summary for Google search results..."
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 outline-none text-sm bg-white resize-none"
                  />
                </div>
              </div>

              {/* Primary Affiliate Link Input Block */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <label className="block text-sm font-extrabold text-gray-900 mb-1">
                  🛒 Primary Affiliate Link
                </label>
                <input
                  type="url"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  placeholder="https://amzn.to/..."
                  className="w-full border border-amber-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-white"
                />
                <p className="text-xs text-amber-700 mt-2 font-medium">
                  Paste your primary product link here. This automatically generates the &ldquo;Check Price&rdquo; sticky CTA bar for mobile users.
                </p>
              </div>

              {/* 1-Click Shortcode Helper Bar */}
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
                    Insert Shortcode:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      insertShortcode(
                        "[WINNER_BOX || The Short Answer || Clear, punchy verdict comparing the options.]"
                      )
                    }
                    className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-1.5 rounded-md transition cursor-pointer"
                  >
                    + Winner Box
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertShortcode(
                        "[QUICK_PICK || Product Name || 1-2 sentence explanation of why this is the #1 choice. || https://www.amazon.com/dp/YOUR-LINK]"
                      )
                    }
                    className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold px-3 py-1.5 rounded-md transition cursor-pointer"
                  >
                    + Quick Pick
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertShortcode(
                        "[AMAZON_CARD || Product Title || Best Value || https://m.media-amazon.com/... || https://www.amazon.com/dp/YOUR-LINK]"
                      )
                    }
                    className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold px-3 py-1.5 rounded-md transition cursor-pointer"
                  >
                    + Amazon Card
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertShortcode(
                        "[BOUNTY_BUTTON || Check Price on Amazon ↗ || https://amzn.to/...]"
                      )
                    }
                    className="text-xs bg-green-100 hover:bg-green-200 text-green-900 font-bold px-3 py-1.5 rounded-md transition cursor-pointer"
                  >
                    + Bounty Button
                  </button>
                  <button
                    type="button"
                    onClick={() => insertShortcode("ADVERTISEMENT")}
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-3 py-1.5 rounded-md transition cursor-pointer"
                  >
                    + Ad Slot
                  </button>
                </div>

                <div className="border border-gray-300 rounded-lg overflow-hidden shadow-xs">
                  <CustomEditor value={content} onChange={setContent} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-gray-500">Loading workspace...</div>
      }
    >
      <EditorForm />
    </Suspense>
  );
}