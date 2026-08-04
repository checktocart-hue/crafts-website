"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid email or password.");
    }
    
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // Show a blank screen briefly while checking auth status
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Loading Secure Area...</div>;
  }

  // If not logged in, render the Login Form
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Admin Login
          </h2>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-sm text-center font-bold">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition disabled:opacity-50"
            >
              {isLoggingIn ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If logged in, render the Admin Header AND the CMS Page
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white py-3 px-6 flex justify-between items-center">
        <div className="text-xs font-bold tracking-widest uppercase text-green-400">
          🟢 Secure Admin Session Active
        </div>
        <button 
          onClick={handleLogout} 
          className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-full transition font-bold"
        >
          Logout
        </button>
      </header>
      
      {/* This renders whatever is inside write/page.tsx */}
      {children} 
    </div>
  );
}