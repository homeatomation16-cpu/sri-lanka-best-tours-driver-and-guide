"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/admin"); // Login සාර්ථක නම් Admin Dashboard එකට යවන්න
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#1A1714] p-8 text-center">
          <div className="w-16 h-16 bg-[#B5541A]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#B5541A]/30">
            <Lock className="text-[#F4A96B]" size={28} />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-medium">Sri Lanka Best Tours</p>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5541A]/20 focus:border-[#B5541A] transition-all text-gray-800"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5541A]/20 focus:border-[#B5541A] transition-all text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1714] hover:bg-[#B5541A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-8">
            © {new Date().getFullYear()} Protected Area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}