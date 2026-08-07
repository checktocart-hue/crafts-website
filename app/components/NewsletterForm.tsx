"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setStatus("loading");
    try {
      await addDoc(collection(db, "subscribers"), {
        email: email.trim(),
        subscribedAt: new Date().toISOString(),
        source: "homepage_sidebar"
      });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error adding subscriber:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#fdf3b8] p-6 rounded-sm border-b-4 border-[#ebd657]">
      <h3 className="font-bold text-gray-900 text-lg mb-3 leading-tight">
        Subscribe for unlimited access to the Crafts & Kits newsletter
      </h3>
      
      {status === "success" ? (
        <div className="bg-green-100 border border-green-300 text-green-800 px-3 py-2 rounded text-sm font-bold text-center">
          Success! You're on the list.
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-gray-900 bg-white"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-sm text-sm transition disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
          {status === "error" && (
            <p className="text-xs text-red-600 font-semibold mt-1">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}