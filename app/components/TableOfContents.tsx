"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function TableOfContents({ body }: { body: any[] }) {
  // Debugging: This will log your headings to the browser console (F12)
  // so you can see if the website is actually detecting them.
  useEffect(() => {
    console.log("TOC Body Data:", body);
  }, [body]);

  // Filter the body content to find only H2 and H3 headings
  // We check for _type == 'block' to ensure we don't crash on images/videos
  const headings = body?.filter((block) => 
    block._type === 'block' && (block.style === "h2" || block.style === "h3")
  ) || [];

  if (headings.length === 0) {
    return null; // If no headings found, hide the box
  }

  return (
    <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 mb-10">
      <h3 className="text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-dancing)] text-2xl">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading: any) => {
          // Safety check: ensure children exists
          if (!heading.children || heading.children.length === 0) return null;
          
          const text = heading.children[0].text;
          // Create safe ID
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const isH3 = heading.style === "h3";

          return (
            // Indent H3s with margin-left (ml-4)
            <li key={heading._key} className={`${isH3 ? "ml-4" : ""}`}>
              <Link 
                href={`#${id}`} 
                className={`text-sm font-medium transition-colors hover:underline ${
                  isH3 ? "text-gray-600 hover:text-green-700" : "text-green-700 hover:text-green-900"
                }`}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}