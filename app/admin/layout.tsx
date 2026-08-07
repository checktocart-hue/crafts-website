import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* GLOBAL ADMIN NAVIGATION */}
      <nav className="bg-[#111827] text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-8">
          <span className="text-green-500 font-bold tracking-widest text-xs flex items-center gap-2 uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Secure Admin Session Active
          </span>
          
          {/* Page Links */}
          <div className="hidden sm:flex gap-6">
            <Link href="/admin" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/admin/write" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Draft New
            </Link>
            <Link href="/admin/manage" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Manage Content
            </Link>
            {/* NEW LINK ADDED HERE */}
            <Link href="/admin/tools" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Manage Tools
            </Link>
          </div>
        </div>
        
        <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2 rounded-lg text-sm font-bold transition">
          Logout
        </button>
      </nav>

      {/* Renders the specific page below the navbar */}
      <main>
        {children}
      </main>
    </div>
  );
}