import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Sparkles,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileText,
  User,
  Phone,
} from "lucide-react";
import { getComplaintById } from "@/lib/complaintsStore";
import { PriorityBadge, StatusBadge, CategoryBadge } from "@/components/StatusBadge";
import { StatusTracker } from "@/components/StatusTracker";

export default async function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complaint = await getComplaintById(id);

  if (!complaint) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/complaints"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Complaints</span>
        </Link>
      </div>

      {/* Main Grievance Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-black text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
                {complaint.id}
              </span>
              <CategoryBadge category={complaint.category} />
              <PriorityBadge priority={complaint.priority} />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {complaint.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Submitted on{" "}
                {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {complaint.citizenName && (
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Filed by {complaint.citizenName}
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0">
            <StatusBadge status={complaint.status} />
          </div>
        </div>

        {/* Visual 4-Step Progress Tracker */}
        <div className="py-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live Resolution Timeline
            </h3>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
              Current: {complaint.status.replace("_", " ")}
            </span>
          </div>
          <StatusTracker currentStatus={complaint.status} timeline={complaint.timeline} />
        </div>

        {/* Gemini AI Breakdown Card */}
        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:from-slate-800/80 dark:to-indigo-950/40 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Gemini AI Civic Triage & Analysis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-4 rounded-xl border border-blue-100 dark:border-slate-800 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Designated Municipal Department
              </span>
              <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                {complaint.department}
              </p>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-4 rounded-xl border border-blue-100 dark:border-slate-800 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Specific Issue Identified
              </span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{complaint.issue}</p>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-4 rounded-xl border border-blue-100 dark:border-slate-800 shadow-2xs md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Executive AI Summary
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {complaint.summary || complaint.description}
              </p>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-4 rounded-xl border border-blue-100 dark:border-slate-800 shadow-2xs md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                Recommended Action by Gemini
              </span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {complaint.recommendedAction}
              </p>
            </div>
          </div>
        </div>

        {/* Citizen's Original Complaint Description */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Original Complaint Description</span>
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            "{complaint.description}"
          </div>
        </div>

        {/* Location & Image Proof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Location Details */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Location Details</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <p className="font-semibold text-slate-900 dark:text-white">
                {complaint.location?.address || "Location not provided"}
              </p>
              {complaint.location?.landmark && (
                <p className="text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Landmark:</span> {complaint.location.landmark}
                </p>
              )}
              {complaint.location?.latitude && complaint.location?.longitude && (
                <p className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                  Coordinates: {complaint.location.latitude.toFixed(4)},{" "}
                  {complaint.location.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>

          {/* Photo Evidence */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Photo Evidence</h3>
            {complaint.imageUrl ? (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xs max-h-48">
                <img
                  src={complaint.imageUrl}
                  alt={complaint.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                No photo attached to this complaint.
              </div>
            )}
          </div>
        </div>

        {/* Action button to return to dashboard */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            ← View all your complaints on Dashboard
          </Link>
          <Link
            href="/report"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold transition-all"
          >
            Report Another Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
