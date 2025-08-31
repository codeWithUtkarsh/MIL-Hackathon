"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  acceptInvitationAction,
  validateInvitationToken,
} from "../lib/invitation-actions";
import type { Invitation } from "../lib/types";
import Header from "../components/Header";

export default function AcceptInvitationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    campus: "",
    languages: ["English"],
  });

  useEffect(() => {
    if (!token) {
      setError("Invalid invitation link");
      setIsLoading(false);
      return;
    }

    validateInvitationToken(token).then((inv) => {
      if (!inv) {
        setError("Invalid or expired invitation");
      } else if (inv.status !== "pending") {
        setError("This invitation has already been used");
      } else if (new Date() > new Date(inv.expiresAt)) {
        setError("This invitation has expired");
      } else {
        setInvitation(inv);
      }
      setIsLoading(false);
    });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !invitation) return;

    setIsSubmitting(true);
    setError("");

    try {
      const result = await acceptInvitationAction(token, formData);

      if (result.success) {
        setSuccess(true);
        // Redirect to login after a delay
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(result.error || "Failed to accept invitation");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error accepting invitation:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, ""],
    });
  };

  const updateLanguage = (index: number, value: string) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = value;
    setFormData({
      ...formData,
      languages: newLanguages.filter((lang) => lang.trim() !== ""),
    });
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <Header />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <div className="bg-slate-800 rounded-xl border border-slate-600 p-8 w-full max-w-md text-center">
            <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">Validating invitation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <Header />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <div className="bg-slate-800 rounded-xl border border-red-500/50 p-8 w-full max-w-md text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Invalid Invitation
            </h1>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-lg transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <Header />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <div className="bg-slate-800 rounded-xl border border-green-500/50 p-8 w-full max-w-md text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-green-400 mb-4">
              Welcome to MIL-CAN!
            </h1>
            <p className="text-slate-300 mb-6">
              Your account has been created successfully. You'll be redirected
              to the login page shortly.
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-xl border border-slate-600 p-8 w-full max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h1 className="text-3xl font-bold text-amber-400 mb-2">
              Accept Your Invitation
            </h1>
            <p className="text-slate-300">
              You've been invited to join MIL-CAN as a{" "}
              <span className="font-semibold text-purple-400">
                {invitation?.role
                  ? invitation.role.charAt(0).toUpperCase() +
                    invitation.role.slice(1)
                  : "Member"}
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-amber-900/20 rounded-lg border border-amber-400/20 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">📧</div>
              <div>
                <p className="text-slate-200 font-medium">
                  {invitation?.email}
                </p>
                <p className="text-slate-400 text-sm">
                  Invited by {invitation?.invitedBy}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              Please complete the form below to set up your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Dr. Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Handle *
                </label>
                <input
                  type="text"
                  required
                  value={formData.handle}
                  onChange={(e) =>
                    setFormData({ ...formData, handle: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="@drjanesmith"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Campus/Institution *
              </label>
              <input
                type="text"
                required
                value={formData.campus}
                onChange={(e) =>
                  setFormData({ ...formData, campus: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="University of Toronto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Languages *
              </label>
              {formData.languages.map((language, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    required
                    value={language}
                    onChange={(e) => updateLanguage(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="English"
                  />
                  {formData.languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addLanguage}
                className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors duration-200"
              >
                + Add Language
              </button>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.name ||
                  !formData.handle ||
                  !formData.campus
                }
                className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform ${
                  isSubmitting ||
                  !formData.name ||
                  !formData.handle ||
                  !formData.campus
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white hover:scale-[1.02] shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Join MIL-CAN"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-600 text-center">
            <p className="text-slate-400 text-sm">
              By joining, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
