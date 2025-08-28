"use client";

import { useState } from "react";

interface CreatorSignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatorSignupPopup({
  isOpen,
  onClose,
  onSuccess,
}: CreatorSignupPopupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    expertise: "",
    bio: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const expertiseOptions = [
    "Digital Literacy",
    "Media Studies",
    "Information Science",
    "Education Technology",
    "Critical Thinking",
    "Journalism",
    "Communication",
    "Psychology",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email) {
          setError("Please fill in all required fields");
          return false;
        }
        if (!formData.email.includes("@")) {
          setError("Please enter a valid email address");
          return false;
        }
        break;
      case 2:
        if (!formData.password || !formData.confirmPassword) {
          setError("Please enter and confirm your password");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters long");
          return false;
        }
        break;
      case 3:
        if (!formData.expertise || !formData.bio.trim()) {
          setError("Please complete your profile information");
          return false;
        }
        if (!formData.agreeToTerms) {
          setError("Please agree to the terms and conditions");
          return false;
        }
        break;
    }
    setError("");
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - replace with actual registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Creator signing up:", formData);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-amber-400 mb-2">
          Personal Information
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="creator@email.com"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
            required
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">
            ✍️
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Institution/Organization (Optional)
        </label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleInputChange}
          placeholder="University, School, or Organization"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-amber-400 mb-2">
          Account Security
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto"></div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Password *
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a secure password"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
            required
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">
            🔒
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Must be at least 8 characters long
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
            required
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">
            🔐
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-3">
        <p className="text-xs text-blue-400 flex items-center gap-2">
          <span>🛡️</span>
          Your password is encrypted and secure. We never store passwords in
          plain text.
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-amber-400 mb-2">
          Creator Profile
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto"></div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Area of Expertise *
        </label>
        <select
          name="expertise"
          value={formData.expertise}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
          required
        >
          <option value="">Select your primary expertise</option>
          {expertiseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Bio/Description *
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about yourself, your experience, and what kind of content you plan to create..."
          rows={4}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none resize-none transition-all duration-300"
          required
        />
        <p className="text-xs text-slate-500 mt-1">
          {formData.bio.length}/500 characters
        </p>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          className="w-5 h-5 text-amber-400 border-slate-600 rounded focus:ring-amber-400 focus:ring-offset-0 bg-slate-900 mt-0.5"
          required
        />
        <label className="text-sm text-slate-300 cursor-pointer">
          I agree to the{" "}
          <button
            type="button"
            className="text-amber-400 hover:text-amber-300 underline"
          >
            Terms and Conditions
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="text-amber-400 hover:text-amber-300 underline"
          >
            Privacy Policy
          </button>
          . I understand that my content will be reviewed before publication.
        </label>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-500"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div className="relative w-full max-w-lg mx-4 bg-gradient-to-br from-slate-800 to-amber-900 rounded-2xl border border-amber-400/30 shadow-2xl shadow-amber-900/50 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-400/20 blur-sm animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-slate-800 to-amber-900 rounded-2xl">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-amber-400/20 relative">
            {/* Header Glow Effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">✍️</div>
                <div>
                  <h2 className="text-xl font-bold text-amber-400">
                    Join as Creator
                  </h2>
                  <p className="text-sm text-slate-400">
                    Step {currentStep} of 3 - Create your account
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

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-400 to-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Step Content */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                <span className="animate-bounce">⚠️</span>
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg transition-all duration-200"
                >
                  ← Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 group relative px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      <span className="animate-pulse">Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span className="group-hover:animate-bounce">🚀</span>
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Welcome Message */}
            {currentStep === 1 && (
              <div className="mt-4 p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-amber-400/10 to-amber-400/5 animate-pulse"></div>
                <p className="text-xs text-amber-400 flex items-center gap-2 relative">
                  <span className="animate-pulse">🌟</span>
                  <span>
                    Welcome to MIL-CAN! Join thousands of creators making a
                    difference in media literacy education.
                  </span>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
