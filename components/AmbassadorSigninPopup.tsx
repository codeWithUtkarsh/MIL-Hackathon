"use client";

import { useState } from "react";
import { useAuth } from "../lib/auth-context";

interface AmbassadorSigninPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AmbassadorSigninPopup({
  isOpen,
  onClose,
  onSuccess,
}: AmbassadorSigninPopupProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }

      if (!formData.email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }

      // Authenticate with the auth service
      const response = await login(formData.email, formData.password);

      if (response.success) {
        console.log("Ambassador signed in successfully:", response.user?.name);
        onSuccess();
        // Reset form
        setFormData({ email: "", password: "" });
        setError("");
      } else {
        setError(response.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-500"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl border border-amber-400/30 shadow-2xl shadow-purple-900/50 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 via-purple-400/20 to-amber-400/20 blur-sm animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-amber-400/20 relative">
            {/* Header Glow Effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎓</div>
                <div>
                  <h2 className="text-xl font-bold text-amber-400">
                    Ambassador Sign In
                  </h2>
                  <p className="text-sm text-slate-400">
                    Access your educator dashboard
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ambassador@institution.edu"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none focus:bg-slate-900/70 transition-all duration-300 hover:border-slate-500"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                    📧
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your secure password"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none focus:bg-slate-900/70 transition-all duration-300 hover:border-slate-500"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                    🔒
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                  <span className="animate-bounce">⚠️</span>
                  {error}
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-400 border-slate-600 rounded focus:ring-amber-400 focus:ring-offset-0 bg-slate-900"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2 overflow-hidden"
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              <div className="relative">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="animate-pulse">Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="group-hover:animate-bounce">🎓</span>
                    <span>Sign In as Ambassador</span>
                  </>
                )}
              </div>
            </button>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg relative overflow-hidden">
              {/* Info Box Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-amber-400/10 to-amber-400/5 animate-pulse"></div>
              <p className="text-xs text-amber-400 flex items-center gap-2 relative">
                <span className="animate-pulse">ℹ️</span>
                <span>
                  Demo credentials: Use email from admin list with password
                  "secure123"
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
