import Link from "next/link";
import { PenTool, LayoutList } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-xl text-gray-600">Welcome to your control center. What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/admin/write" 
          className="group bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <PenTool size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
            Draft New Content
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Open the visual editor to write and publish a new blog post or product review directly to the live site.
          </p>
        </Link>

        <Link 
          href="/admin/manage" 
          className="group bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <LayoutList size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
            Manage Content
          </h2>
          <p className="text-gray-600 leading-relaxed">
            View your published articles. Edit existing content, fix typos, or permanently delete older posts.
          </p>
        </Link>
      </div>
    </div>
  );
}