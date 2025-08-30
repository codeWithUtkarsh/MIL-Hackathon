"use client";

import { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { sendInvitationAction } from "../lib/invitation-actions";
import type { MemberRole } from "../lib/types";

interface InviteAmbassadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InviteAmbassadorModal({
  isOpen,
  onClose,
  onSuccess,
}: InviteAmbassadorModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    role: "ambassador" as MemberRole,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to send invitations");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await sendInvitationAction(
        formData.email,
        formData.role,
        user.name,
      );

      if (result.success) {
        onSuccess();
        setFormData({ email: "", role: "ambassador" });
        onClose();
      } else {
        setError(result.error || "Failed to send invitation");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error sending invitation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-600 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✉️</div>
            <h2 className="text-xl font-bold text-amber-400">
              Invite Ambassador
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="professor@university.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as MemberRole })
              }
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="ambassador">Ambassador</option>
              <option value="creator">Content Creator</option>
              <option value="reviewer">Content Reviewer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
            <h4 className="text-sm font-medium text-slate-300 mb-2">
              {getRoleTitle(formData.role)}
            </h4>
            <p className="text-xs text-slate-400">
              {getRoleDescription(formData.role)}
            </p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-300 hover:text-slate-200 border border-slate-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.email}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isLoading || !formData.email
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                "Send Invitation"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-600">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Invitation will expire in 30 days</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Recipient will receive an email with setup instructions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoleTitle(role: MemberRole): string {
  const titles: Record<MemberRole, string> = {
    ambassador: "Senior Ambassador",
    creator: "Content Creator",
    reviewer: "Content Reviewer",
    admin: "Platform Administrator",
  };
  return titles[role];
}

function getRoleDescription(role: MemberRole): string {
  const descriptions: Record<MemberRole, string> = {
    ambassador:
      "Mentor creators, curate content, and lead community initiatives. Invitation only.",
    creator:
      "Create educational content, submit materials for review, and engage with the community.",
    reviewer:
      "Review submitted content, provide feedback, and maintain platform quality standards.",
    admin:
      "Manage platform settings, user accounts, and oversee system operations.",
  };
  return descriptions[role];
}
