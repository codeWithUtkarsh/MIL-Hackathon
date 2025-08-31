"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { getCreatorAuthService } from "../lib/creator-auth-service";

interface CreatorSigninPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatorSigninPopup({
  isOpen,
  onClose,
  onSuccess,
}: CreatorSigninPopupProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    handle: "",
    campus: "",
    languages: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const creatorAuthService = getCreatorAuthService();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        // Sign up
        const signupData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          handle: formData.handle || "@" + formData.email.split("@")[0],
          campus: formData.campus,
          languages: formData.languages
            .split(",")
            .map((lang: string) => lang.trim())
            .filter(Boolean),
        };

        const response = await creatorAuthService.signup(signupData);
        if (response.success) {
          // Switch to sign in mode after successful signup
          setIsSignUp(false);
          setFormData({
            email: formData.email,
            password: "",
            confirmPassword: "",
            name: "",
            handle: "",
            campus: "",
            languages: "",
          });
          setError("");
          // Show success message
          alert("Account created successfully! Please sign in.");
        } else {
          setError(response.message || "Failed to create account");
        }
      } else {
        // Sign in
        const response = await creatorAuthService.signin(
          formData.email,
          formData.password,
        );

        if (response.success) {
          // Reset form
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            handle: "",
            campus: "",
            languages: "",
          });

          // Call success callback
          onSuccess();
        } else {
          setError(response.message || "Invalid email or password");
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      handle: "",
      campus: "",
      languages: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg max-w-md w-full border border-amber-400/20">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-amber-400">
              {isSignUp ? "Create Creator Account" : "Creator Sign In"}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
                {error}
              </div>
            )}

            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-amber-400"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-amber-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-amber-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                placeholder="Enter your password"
              />
            </div>

            {isSignUp && (
              <>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-2 text-amber-400"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                    placeholder="Confirm your password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="handle"
                    className="block text-sm font-medium mb-2 text-amber-400"
                  >
                    Social Media Handle (Optional)
                  </label>
                  <input
                    type="text"
                    id="handle"
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                    placeholder="@yourhandle"
                  />
                </div>

                <div>
                  <label
                    htmlFor="campus"
                    className="block text-sm font-medium mb-2 text-amber-400"
                  >
                    Campus/Institution
                  </label>
                  <input
                    type="text"
                    id="campus"
                    name="campus"
                    value={formData.campus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                    placeholder="Your university or institution"
                  />
                </div>

                <div>
                  <label
                    htmlFor="languages"
                    className="block text-sm font-medium mb-2 text-amber-400"
                  >
                    Languages (comma separated)
                  </label>
                  <input
                    type="text"
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                    placeholder="English, Spanish, French"
                  />
                </div>
              </>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-300">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-amber-400/30"
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
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded hover:from-amber-400 hover:to-orange-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? isSignUp
                  ? "Creating Account..."
                  : "Signing in..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-700 text-center">
            <p className="text-sm text-slate-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
