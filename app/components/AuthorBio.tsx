"use client";

import Image from "next/image";

export default function AuthorBio() {
  return (
    <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 my-12 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      
      {/* Author Image / Avatar */}
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-green-600 shadow-sm bg-white">
        {/* Using the logo for now as the "Team" avatar. 
            If you have a personal photo, name it 'author.jpg', put it in 'public', and update the src below. */}
        <Image
          src="/logo.png" 
          alt="CraftsAndKits Team"
          fill
          className="object-contain p-2" 
          sizes="80px"
        />
      </div>
      
      {/* Bio Text */}
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-dancing)] text-2xl">
          The Crafts & Kits Team
        </h3>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          We are a collective of obsessive miniature hobbyists who have built everything from tiny book nooks to complex mechanical gears. We've made every mistake in the book so you don't have to. Our goal is to save you from "instruction manual panic" and help you build worlds you are proud of.
        </p>
      </div>
    </div>
  );
}