"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function ManageToolsPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [vendor, setVendor] = useState("Amazon");
  const [image, setImage] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");

  // Fetch existing tools from Firebase
  const fetchTools = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "tools"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const toolsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTools(toolsData);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // Save new tool to Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "tools"), {
        title,
        price,
        originalPrice,
        vendor,
        image,
        affiliateLink,
        createdAt: new Date().toISOString(),
      });
      
      // Clear the form
      setTitle(""); setPrice(""); setOriginalPrice(""); setVendor("Amazon"); setImage(""); setAffiliateLink("");
      
      // Refresh the list
      fetchTools();
    } catch (error) {
      console.error("Error adding tool: ", error);
      alert("Failed to add tool. Check console.");
    }
    setIsSubmitting(false);
  };

  // Delete a tool
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this tool from the homepage?")) {
      await deleteDoc(doc(db, "tools", id));
      fetchTools();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Affiliate Tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT: Add New Tool Form */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Tool</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Product Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g. Precision Craft Knife" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Price</label>
                <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g. $18.99" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Original Price (Optional)</label>
                <input type="text" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g. $25.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Vendor</label>
                <input type="text" required value={vendor} onChange={(e) => setVendor(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g. Amazon" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL (Cloudinary)</label>
                <input type="url" required value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="https://res.cloudinary.com/..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Affiliate Link</label>
              <input type="url" required value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="https://amazon.com/dp/..." />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md transition">
              {isSubmitting ? "Saving..." : "Add to Homepage Sidebar"}
            </button>
          </form>
        </div>

        {/* RIGHT: Active Tools List */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Active Tools ({tools.length})</h2>
          {isLoading ? (
            <p className="text-gray-500">Loading tools...</p>
          ) : tools.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
              No tools added yet. Fill out the form to feature your first product!
            </div>
          ) : (
            <div className="space-y-4">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4 items-center">
                  <img src={tool.image} alt={tool.title} className="w-16 h-16 object-cover rounded bg-gray-100 border border-gray-200" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{tool.title}</h3>
                    <p className="text-sm text-gray-600 font-medium">
                      <span className="text-green-700">{tool.price}</span> from {tool.vendor}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(tool.id)} className="text-red-500 hover:bg-red-50 p-2 rounded text-sm font-bold transition">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}