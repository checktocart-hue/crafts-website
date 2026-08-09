"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // We use a small timeout to ensure the Markdown has finished rendering to the DOM
    const timeoutId = setTimeout(() => {
      // Find the container holding your markdown content (update this selector if needed)
      const article = document.querySelector(".prose") || document.querySelector("article");
      if (!article) return;

      const headingElements = article.querySelectorAll("h2, h3");
      const items: Heading[] = [];

      headingElements.forEach((heading, index) => {
        const text = heading.textContent || "";
        let id = heading.id;

        // If marked didn't generate an ID, create a clean one and inject it into the HTML
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
          heading.id = id; 
        }

        items.push({
          id: id || `heading-${index}`,
          text: text,
          level: heading.tagName === "H2" ? 2 : 3,
        });
      });

      setHeadings(items);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, []);

  if (headings.length === 0) {
    return null; // If no headings found, hide the box
  }

  return (
    <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 mb-10">
      <h3 className="font-bold text-gray-900 mb-4 font-[family-name:var(--font-dancing)] text-2xl">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => {
          const isH3 = heading.level === 3;

          return (
            <li key={heading.id} className={`${isH3 ? "ml-4" : ""}`}>
              {/* Note: Using standard <a> tag instead of <Link> for smoother on-page anchoring */}
              <a 
                href={`#${heading.id}`} 
                className={`text-sm font-medium transition-colors hover:underline ${
                  isH3 ? "text-gray-600 hover:text-green-700" : "text-green-700 hover:text-green-900"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}