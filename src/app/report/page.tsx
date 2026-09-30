"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MapPin,
  Camera,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Building,
  ShieldAlert,
  Send,
  X,
  FileCheck,
  Lock,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { AIAnalysisResult } from "@/types/complaint";
import { PriorityBadge, CategoryBadge } from "@/components/StatusBadge";
import { uploadComplaintImage } from "@/lib/firebaseStorage";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { VoiceInputButton } from "@/components/VoiceInputButton";

export default function ReportComplaintPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Form states
  const [description, setDescription] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [citizenName, setCitizenName] = useState("");
  const [citizenPhone, setCitizenPhone] = useState("");

  // Pre-fill user profile if logged in
  React.useEffect(() => {
    if (user) {
      if (!citizenName) setCitizenName(user.name);
      if (!citizenPhone && user.phoneNumber) setCitizenPhone(user.phoneNumber);
    }
  }, [user]);

  // Image states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  // Flow states
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Browser Geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser. Please enter address manually.");
      return;
    }

    setIsDetectingLocation(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);

        try {
          // Reverse geocode via server-side compliant geocode endpoint
          const res = await fetch(`/api/geocode?lat=${lat}&lon=${lon}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.address) {
              setLocationAddress(data.address);
            } else {
              setLocationAddress(`Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`);
            }
          } else {
            setLocationAddress(`Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`);
          }
        } catch {
          setLocationAddress(`Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`);
        } finally {
          setIsDetectingLocation(false);
          setLocationError(false);
        }
      },
      (err) => {
        setIsDetectingLocation(false);
        console.warn("Geolocation error:", err);
        setErrorMessage("Location permission was denied or unavailable. Please enter address manually.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // High-performance client-side image compression (prevents 413 Payload Too Large & Firestore 1MB limits)
  const compressImage = (file: File, maxWidth = 1200, quality = 0.75): Promise<{ compressedFile: File; dataUrl: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            const rawUrl = e.target?.result as string;
            resolve({ compressedFile: file, dataUrl: rawUrl });
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressed = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                  type: "image/jpeg",
                });
                resolve({ compressedFile: compressed, dataUrl });
              } else {
                resolve({ compressedFile: file, dataUrl });
              }
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = () => resolve({ compressedFile: file, dataUrl: e.target?.result as string });
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve({ compressedFile: file, dataUrl: "" });
      reader.readAsDataURL(file);
    });
  };

  // Image Upload Handler with Automatic Compression
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("Image file size should be less than 15MB.");
      return;
    }

    try {
      const { compressedFile, dataUrl } = await compressImage(file, 1200, 0.75);
      setImageFile(compressedFile);
      setImagePreview(dataUrl);
      setImageBase64(dataUrl);
      setErrorMessage(null);
    } catch (err) {
      console.warn("Image compression fallback:", err);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = reader.result as string;
        setImagePreview(b64);
        setImageBase64(b64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageBase64(null);
  };

  // Step 1: AI Analysis
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setErrorMessage("Please describe the civic issue before analyzing.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisStep(1);

    // Stagger visual progress steps
    const timer1 = setTimeout(() => setAnalysisStep(2), 500);
    const timer2 = setTimeout(() => setAnalysisStep(3), 1000);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          location: locationAddress.trim(),
          imageBase64: imageBase64 || undefined,
          imageMimeType: imageFile?.type || "image/jpeg",
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to analyze complaint.");
      }

      setAiAnalysis(json.data);

      if (json.data.locationRequired && (!locationAddress || locationAddress.trim().length === 0)) {
        setLocationError(true);
      } else {
        setLocationError(false);
      }
    } catch (err: any) {
      console.error("AI analysis failed:", err);
      setErrorMessage(
        err.message || "We couldn't analyze your complaint right now. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Step 2: Confirm and Submit Complaint
  const handleConfirmSubmit = async () => {
    if (!aiAnalysis) return;

    if (!locationAddress.trim()) {
      setLocationError(true);
      setErrorMessage("Please provide a location or landmark before final submission.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Step 2a: If image was uploaded, send to Firebase Storage
      let finalImageUrl: string | null = null;
      if (imageFile || imagePreview) {
        try {
          const uploadRes = await uploadComplaintImage(imageFile || imagePreview!);
          finalImageUrl = uploadRes.url;
        } catch (imgErr) {
          console.warn("Firebase Storage upload fallback:", imgErr);
          finalImageUrl = imagePreview || null;
        }
      }

      const payload = {
        title: aiAnalysis.issue || "Reported Civic Problem",
        description: description.trim(),
        category: aiAnalysis.category,
        issue: aiAnalysis.issue,
        priority: aiAnalysis.priority,
        department: aiAnalysis.department,
        summary: aiAnalysis.summary,
        recommendedAction: aiAnalysis.recommendedAction,
        location: {
          address: locationAddress.trim(),
          latitude,
          longitude,
        },
        imageUrl: finalImageUrl,
        citizenName: citizenName.trim() || "Anonymous Citizen",
        citizenPhone: citizenPhone.trim() || "",
        status: "REPORTED",
      };

      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to save complaint.");
      }

      const createdComplaint = json.data;
      setSubmittedId(createdComplaint.id);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMessage(
        err.message || "Failed to submit complaint to the municipal server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center shadow-lg">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            e-Governance Security Standard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Citizen Authentication Required
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            To prevent fraudulent reports and ensure municipal field engineers can contact you with live resolution updates, please sign in or register your citizen account.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
          <Link
            href="/login?returnUrl=/report"
            className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In (OTP / Email)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/register?returnUrl=/report"
            className="py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <span>Create New Account</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Verified Citizen Header */}
      <div className="p-3.5 mb-6 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-2xs">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300">
            Filing as Verified Citizen: <strong className="text-slate-900 dark:text-white font-bold">{user.name}</strong> ({user.city || user.phoneNumber || user.email})
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Identity Verified
        </span>
      </div>

      {/* Page Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
          <Building className="w-3.5 h-3.5" />
          <span>{t("citizenPortal")}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t("reportProblem")}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t("subtitle")}
        </p>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice</p>
            <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Submission Success Modal / Banner */}
      {submittedId && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <FileCheck className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Complaint Registered Successfully
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                Grievance Reference ID: {submittedId}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Your complaint has been structured by Gemini and logged into the Municipal Grievance Register. You can track ground dispatch progress in real-time.
              </p>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/complaints/${submittedId}`)}
                  className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs shadow-md hover:bg-emerald-50 transition-all flex items-center gap-2"
                >
                  <span>Track Complaint Live</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedId(null);
                    setAiAnalysis(null);
                    setDescription("");
                    setLocationAddress("");
                    setImagePreview(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold text-xs border border-white/20 transition-all"
                >
                  Report Another Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Flow: Form & AI Result */}
      <div className="space-y-8">
        {/* Step 1: Input Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* Description Input */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label
                  htmlFor="description"
                  className="block text-sm font-bold text-slate-900 dark:text-white"
                >
                  1. {t("describeIssue")} <span className="text-rose-500">*</span>
                </label>
                <VoiceInputButton
                  onTranscript={(spoken) =>
                    setDescription((prev) => (prev ? `${prev} ${spoken}` : spoken))
                  }
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Explain in your own words, or click the Voice Input button to speak in your language.
              </p>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (aiAnalysis) setAiAnalysis(null);
                }}
                placeholder="e.g. There is a deep pothole near the college main gate. It has already caused two bike accidents yesterday..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-y"
                required
              />
            </div>

            {/* Location Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="location"
                  className="text-sm font-bold text-slate-900 flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>2. Location & Landmark</span>
                  {locationError && (
                    <span className="text-xs font-semibold text-rose-600 ml-2">
                      (Location required)
                    </span>
                  )}
                </label>

                {/* Geolocation Button */}
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors disabled:opacity-50"
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Detecting GPS...</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Use My Current Location</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-2">
                Street name, colony, landmark, or ward. Gemini will use this to dispatch the closest municipal squad.
              </p>
              <input
                id="location"
                type="text"
                value={locationAddress}
                onChange={(e) => {
                  setLocationAddress(e.target.value);
                  setLocationError(false);
                }}
                placeholder="e.g. Near Gate 2, Government Engineering College, MG Road, Ward 14"
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  locationError ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder-slate-400`}
              />

              {latitude && longitude && (
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  GPS Coordinates captured: {latitude.toFixed(5)}, {longitude.toFixed(5)}
                </p>
              )}
            </div>

            {/* Optional Photo Attachment */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                3. Attach Photo Evidence (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-2">
                A photo helps Gemini verify visual severity and enables municipal ground workers to locate the exact spot.
              </p>

              {imagePreview ? (
                <div className="relative inline-block mt-1">
                  <img
                    src={imagePreview}
                    alt="Problem preview"
                    className="w-48 h-36 object-cover rounded-xl border border-slate-300 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-rose-600 transition-colors shadow-sm"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all text-center">
                  <Camera className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">
                    Click to upload photo of civic damage
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    PNG, JPG, WebP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Citizen Contact (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Number (Optional - for SMS updates)
                </label>
                <input
                  type="tel"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  placeholder="e.g. +91 98234 11201"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>

            {/* AI Analyze Trigger Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isAnalyzing || !description.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing your complaint with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Complaint with Gemini AI</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Animated AI Analysis Status Indicator */}
          {isAnalyzing && (
            <div className="mt-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Gemini Civic Triage Engine at work...</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-blue-700">
                <div
                  className={`p-2 rounded-lg ${
                    analysisStep >= 1 ? "bg-white font-semibold shadow-xs" : "opacity-50"
                  }`}
                >
                  ✓ Understanding civic context
                </div>
                <div
                  className={`p-2 rounded-lg ${
                    analysisStep >= 2 ? "bg-white font-semibold shadow-xs" : "opacity-50"
                  }`}
                >
                  ✓ Categorizing municipal department
                </div>
                <div
                  className={`p-2 rounded-lg ${
                    analysisStep >= 3 ? "bg-white font-semibold shadow-xs" : "opacity-50"
                  }`}
                >
                  ✓ Assessing safety & action plan
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: AI Result Preview Card */}
        {aiAnalysis && (
          <div className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl border-2 border-blue-500/80 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Gemini AI Civic Analysis
                  </h3>
                  <p className="text-xs text-slate-500">
                    Structured classification verified and ready for municipal submission
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <PriorityBadge priority={aiAnalysis.priority} />
                <CategoryBadge category={aiAnalysis.category} />
              </div>
            </div>

            {/* AI Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Specific Issue Identified
                </span>
                <p className="font-bold text-slate-900 text-sm">{aiAnalysis.issue}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Assigned Municipal Department
                </span>
                <p className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-600 shrink-0" />
                  {aiAnalysis.department}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs md:col-span-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Executive Summary
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {aiAnalysis.summary}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs md:col-span-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Recommended Engineering / Operational Action
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {aiAnalysis.recommendedAction}
                </p>
              </div>
            </div>

            {/* Location Check Alert if Gemini detected missing location */}
            {aiAnalysis.locationRequired && (!locationAddress || locationAddress.trim().length === 0) && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Location Required: </span>
                  Gemini noted that this civic complaint lacks a specific location or landmark. Please type a landmark above or click "Use My Current Location".
                </div>
              </div>
            )}

            {/* Confirm & Submit CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Review the AI classification above. Once submitted, a work ticket is assigned to {aiAnalysis.department}.
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setAiAnalysis(null)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Edit Input
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Submit Complaint</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
