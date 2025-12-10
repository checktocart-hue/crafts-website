"use client";

import Link from "next/link";

export default function TableOfContents({ body }: { body: any[] }) {
  // Filter the body content to find only H2 headings
  const headings = body?.filter((block) => block.style === "h2") || [];

  if (headings.length === 0) return null;

  return (
    <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 mb-10">
      <h3 className="text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-dancing)] text-2xl">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading: any) => {
          // Create a safe ID from the text (e.g., "Wood Quality" -> "wood-quality")
          const text = heading.children[0].text;
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          return (
            <li key={heading._key}>
              <Link 
                href={`#${id}`} 
                className="text-green-700 hover:text-green-900 hover:underline text-sm font-medium transition-colors"
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