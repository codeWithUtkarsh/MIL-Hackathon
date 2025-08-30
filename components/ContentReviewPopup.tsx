"use client";

import { useState } from "react";
import { useStore } from "../lib/store";
import type { Asset, AssetReview } from "../lib/types";

interface ContentReviewPopupProps {
  asset: Asset;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContentReviewPopup({
  asset,
  isOpen,
  onClose,
}: ContentReviewPopupProps) {
  const { approveAsset, rejectAsset, currentUser } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewData, setReviewData] = useState({
    accuracy: 3,
    context: 1,
    citations: 3,
    notes: "",
  });

  if (!isOpen) return null;

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      console.log("Starting approval process for asset:", asset.id);
      console.log("Current asset status:", asset.status);

      const review: AssetReview = {
        ...reviewData,
        overall: Math.round(
          (reviewData.accuracy + reviewData.context + reviewData.citations) / 3,
        ),
        reviewerId: currentUser?.id || "admin",
        reviewedAt: new Date().toISOString(),
      };

      console.log("Review data:", review);

      // Call approveAsset and wait for completion
      console.log("Calling approveAsset...");
      await approveAsset(asset.id, review);

      console.log("Asset approved successfully, waiting for UI update...");

      // Add a small delay to ensure the store updates propagate
      await new Promise((resolve) => setTimeout(resolve, 200));

      console.log("Closing popup...");
      onClose();
    } catch (error) {
      console.error("Error approving asset:", error);
      alert(
        "Error approving asset: " +
          (error instanceof Error ? error.message : String(error)),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      console.log("Starting rejection process for asset:", asset.id);
      console.log("Current asset status:", asset.status);

      const review: AssetReview = {
        ...reviewData,
        overall: Math.round(
          (reviewData.accuracy + reviewData.context + reviewData.citations) / 3,
        ),
        reviewerId: currentUser?.id || "admin",
        reviewedAt: new Date().toISOString(),
      };

      console.log("Review data:", review);

      // Call rejectAsset and wait for completion
      console.log("Calling rejectAsset...");
      await rejectAsset(asset.id, review);

      console.log("Asset rejected successfully, waiting for UI update...");

      // Add a small delay to ensure the store updates propagate
      await new Promise((resolve) => setTimeout(resolve, 200));

      console.log("Closing popup...");
      onClose();
    } catch (error) {
      console.error("Error rejecting asset:", error);
      alert(
        "Error rejecting asset: " +
          (error instanceof Error ? error.message : String(error)),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTopicLabel = (topic: string) => {
    const labels: Record<string, string> = {
      "ad-transparency": "Ad Transparency",
      "before-after": "Before/After",
      deepfake: "Deepfake Detection",
      "verify-30s": "30-Second Verification",
    };
    return labels[topic] || topic;
  };

  const getTypeEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      video: "🎥",
      carousel: "🖼️",
      script: "📄",
    };
    return emojis[type] || "📄";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-purple-900/30 rounded-xl border border-amber-400/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{getTypeEmoji(asset.type)}</div>
              <div>
                <h2 className="text-2xl font-bold text-amber-400">
                  Content Review
                </h2>
                <p className="text-slate-300">
                  Review and approve or reject this submission
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-6">
          {/* Asset Info */}
          <div className="bg-slate-900/30 rounded-lg p-4 border border-slate-700/30">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-slate-400">Title</label>
                <p className="text-slate-200 font-medium">{asset.title}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Type & Topic</label>
                <p className="text-slate-200">
                  {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)} •{" "}
                  {getTopicLabel(asset.topic)}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-slate-400">Link</label>
              <a
                href={asset.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 transition-colors truncate"
              >
                {asset.link}
              </a>
            </div>

            <div className="mb-4">
              <label className="text-sm text-slate-400">Caption</label>
              <p className="text-slate-200 leading-relaxed">{asset.caption}</p>
            </div>

            <div className="mb-4">
              <label className="text-sm text-slate-400">
                Citations ({asset.citations.length})
              </label>
              <div className="space-y-2 mt-2">
                {asset.citations.map((citation, index) => (
                  <a
                    key={index}
                    href={citation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 hover:text-blue-300 transition-colors text-sm truncate"
                  >
                    {index + 1}. {citation}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Captions:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    asset.accessibility.captions
                      ? "bg-green-900/50 text-green-400"
                      : "bg-red-900/50 text-red-400"
                  }`}
                >
                  {asset.accessibility.captions ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Submitted:</span>
                <span className="text-slate-300">
                  {new Date(asset.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <div className="bg-slate-900/30 rounded-lg p-4 border border-slate-700/30">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">
              Review Scores
            </h3>

            <div className="space-y-4">
              {/* Accuracy */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Accuracy (0-4)</span>
                  <span className="text-amber-400 font-medium">
                    {reviewData.accuracy}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={reviewData.accuracy}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      accuracy: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Context */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Context (0-2)</span>
                  <span className="text-amber-400 font-medium">
                    {reviewData.context}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={reviewData.context}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      context: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Poor</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Citations */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">
                    Citations Quality (0-4)
                  </span>
                  <span className="text-amber-400 font-medium">
                    {reviewData.citations}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={reviewData.citations}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      citations: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Overall Score Display */}
              <div className="pt-2 border-t border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">
                    Overall Score
                  </span>
                  <span className="text-2xl font-bold text-amber-400">
                    {Math.round(
                      (reviewData.accuracy +
                        reviewData.context +
                        reviewData.citations) /
                        3,
                    )}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-300 mb-2">
                  Review Notes (Optional)
                </label>
                <textarea
                  value={reviewData.notes}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Add any additional feedback or comments..."
                  className="w-full h-20 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400/50 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Reject"}
              </button>

              <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
