"use client";

import { useState, useMemo } from "react";
import { useAuth } from "../lib/auth-context";
import { useStore } from "../lib/store";
import type { Member } from "../lib/types";

interface AddCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCreatorModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCreatorModalProps) {
  const { user } = useAuth();
  const { members, networks, addCreatorToNetwork, removeCreatorFromNetwork } =
    useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<Member | null>(null);

  type CreatorWithStatus = Member & {
    inNetwork: boolean;
    networkId?: string;
  };

  // Get all creators with network status
  const creatorsWithStatus = useMemo(() => {
    if (!user) return [];

    const networkCreatorIds = networks
      .filter(
        (n) => n.ambassadorId === user?.id.toString() && n.status === "active",
      )
      .map((n) => n.creatorId);

    return members
      .filter((member) => member.role === "creator" && member.isActive)
      .map((creator) => ({
        ...creator,
        inNetwork: networkCreatorIds.includes(creator.id),
        networkId: networks.find(
          (n) =>
            n.ambassadorId === user?.id.toString() &&
            n.creatorId === creator.id &&
            n.status === "active",
        )?.id,
      }))
      .filter((creator) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
          creator.name.toLowerCase().includes(term) ||
          creator.email.toLowerCase().includes(term) ||
          creator.handle.toLowerCase().includes(term) ||
          creator.campus.toLowerCase().includes(term) ||
          creator.languages.some((lang) => lang.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, networks, user, searchTerm]);

  const handleAddCreator = async (creator: CreatorWithStatus) => {
    if (!user) {
      setError("You must be logged in to manage network");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await addCreatorToNetwork(creator.id, user.id.toString());
      onSuccess();
      setSearchTerm("");
      setSelectedCreator(null);
    } catch (err) {
      setError("Failed to add creator to network");
      console.error("Error adding creator to network:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCreator = async (creator: CreatorWithStatus) => {
    if (!user || !creator.networkId) {
      setError("You must be logged in and creator must be in network");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await removeCreatorFromNetwork(creator.networkId);
      onSuccess();
      setSearchTerm("");
      setSelectedCreator(null);
    } catch (err) {
      setError("Failed to remove creator from network");
      console.error("Error removing creator from network:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-600 p-6 w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👥</div>
            <h2 className="text-xl font-bold text-amber-400">
              Manage Creator Network
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

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search creators by name, email, handle, campus, or language..."
              className="w-full px-4 py-3 pl-12 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Creators List */}
        <div className="flex-1 overflow-y-auto">
          {creatorsWithStatus.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <>
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-slate-300 mb-2">
                    No creators found
                  </h3>
                  <p className="text-slate-400">
                    Try adjusting your search terms
                  </p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-lg font-medium text-slate-300 mb-2">
                    No creators available
                  </h3>
                  <p className="text-slate-400">
                    No active creators found in the system
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {creatorsWithStatus.map((creator) => (
                <div
                  key={creator.id}
                  className={`p-4 bg-slate-700/30 rounded-lg border transition-all duration-200 ${
                    creator.inNetwork
                      ? "border-green-500/50 bg-green-900/10"
                      : "border-slate-600/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold">
                          {creator.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-slate-200 font-medium">
                              {creator.name}
                            </h3>
                            {creator.inNetwork && (
                              <span className="px-2 py-1 text-xs bg-green-600/20 text-green-400 rounded-full border border-green-500/30">
                                In Network
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">
                            {creator.handle}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">📧</span>
                          <span className="text-slate-300">
                            {creator.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">🏫</span>
                          <span className="text-slate-300">
                            {creator.campus}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">🌐</span>
                          <span className="text-slate-300">
                            {creator.languages.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">⭐</span>
                          <span className="text-slate-300">
                            {creator.points} points
                          </span>
                        </div>
                      </div>
                    </div>

                    {creator.inNetwork ? (
                      <button
                        onClick={() => handleRemoveCreator(creator)}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isLoading
                            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Removing...
                          </div>
                        ) : (
                          "Remove from Network"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddCreator(creator)}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isLoading
                            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white"
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Adding...
                          </div>
                        ) : (
                          "Add to Network"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-600">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              {creatorsWithStatus.length} creator
              {creatorsWithStatus.length !== 1 ? "s" : ""} total •{" "}
              {creatorsWithStatus.filter((c) => c.inNetwork).length} in network
              • {creatorsWithStatus.filter((c) => !c.inNetwork).length}{" "}
              available
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-300 hover:text-slate-200 border border-slate-600 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
