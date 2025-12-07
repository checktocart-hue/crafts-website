"use client";

import { Facebook, Twitter, Link as LinkIcon, Mail } from "lucide-react";

interface ShareButtonsProps {
  slug: string;
  title: string;
}

export default function ShareButtons({ slug, title }: ShareButtonsProps) {
  // Ensure this matches your live domain for the links to work correctly
  const domain = "https://www.craftsandkits.com"; 
  const url = `${domain}/blog/${slug}`;
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    // Simple feedback without complex toast libraries
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-8 border-t border-b border-gray-100 my-10">
      <span className="font-bold text-xs uppercase tracking-widest text-gray-400">
        Share this guide:
      </span>
      
      <div className="flex gap-3">
        {/* Facebook */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Facebook"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
        >
          <Facebook size={18} />
        </a>

        {/* Twitter / X */}
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Twitter"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all transform hover:scale-110"
        >
          <Twitter size={18} />
        </a>

        {/* Email */}
        <a 
          href={`mailto:?subject=${encodedTitle}&body=Check out this article: ${url}`}
          title="Share via Email"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white transition-all transform hover:scale-110"
        >
          <Mail size={18} />
        </a>

        {/* Copy Link */}
        <button 
          onClick={handleCopy}
          title="Copy Link"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-all transform hover:scale-110"
        >
          <LinkIcon size={18} />
        </button>
      </div>
    </div>
  );
}