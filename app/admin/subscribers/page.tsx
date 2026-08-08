"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

export default function SubscribersAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        // Fetch subscribers, newest first
        const subQuery = query(collection(db, "subscribers"), orderBy("subscribedAt", "desc"));
        const snapshot = await getDocs(subQuery);
        
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Subscriber[];
        
        setSubscribers(data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscribers();
  }, []);

  // One-click export to CSV for Mailchimp/ConvertKit/etc.
  const downloadCSV = () => {
    if (subscribers.length === 0) return;
    
    const headers = ["Email", "Date Subscribed", "Source"];
    const rows = subscribers.map(sub => [
      sub.email,
      sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : "Unknown",
      sub.source || "direct"
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `craftsandkits-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header & Actions */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Newsletter Subscribers</h1>
          <p className="text-gray-500">Manage and export your mailing list.</p>
        </div>
        <button 
          onClick={downloadCSV}
          disabled={subscribers.length === 0 || loading}
          className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-sm text-sm font-bold disabled:opacity-50 transition shadow-sm"
        >
          Download CSV
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 font-medium animate-pulse">
            Loading subscribers...
          </div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No subscribers yet. They will appear here once people sign up!
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
                <th className="p-4 font-bold">Email Address</th>
                <th className="p-4 font-bold">Date Subscribed</th>
                <th className="p-4 font-bold">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{sub.email}</td>
                  <td className="p-4 text-gray-600 text-sm">
                    {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : "Unknown"}
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {sub.source || "direct"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}