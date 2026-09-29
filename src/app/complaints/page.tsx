"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileSearch,
  Search,
  Filter,
  ArrowRight,
  MapPin,
  Calendar,
  Building,
  RefreshCw,
  PlusCircle,
  AlertCircle,
} from "lucide-react";
import { Complaint, CivicCategory, ComplaintStatus, ComplaintPriority } from "@/types/complaint";
import { PriorityBadge, StatusBadge, CategoryBadge } from "@/components/StatusBadge";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function PublicComplaintsDirectoryPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/complaints");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setComplaints(json.data);
      }
    } catch (err) {
      console.error("Failed to load complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const filtered = complaints.filter((c) => {
    if (categoryFilter !== "ALL" && c.category !== categoryFilter) return false;
    if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
    if (priorityFilter !== "ALL" && c.priority !== priorityFilter) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        (c.location?.address && c.location.address.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const reportHref = user ? "/report" : "/auth/gate?returnUrl=/report";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <FileSearch className="w-3.5 h-3.5" />
            <span>{t("publicTracker") || "Public Civic Directory"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("trackStatus") || "Track Civic Grievances"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Search any registered municipal grievance by Reference ID, location, or department to check live dispatch and resolution progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadComplaints}
            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Refresh feed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href={reportHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t("reportProblem") || "Report Problem"}</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Complaint ID (e.g. JS-2026-1001), keyword, road name, or area..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t("category") || "Category"}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800"
            >
              <option value="ALL">All Civic Categories</option>
              <option value="ROADS">{t("roads") || "Roads & Pavements"}</option>
              <option value="WATER">{t("water") || "Water Supply"}</option>
              <option value="SANITATION">{t("sanitation") || "Sanitation & Waste"}</option>
              <option value="ELECTRICITY">{t("electricity") || "Electricity & Wiring"}</option>
              <option value="STREETLIGHT">{t("streetlight") || "Streetlights"}</option>
              <option value="DRAINAGE">{t("drainage") || "Drainage & Sewerage"}</option>
              <option value="PUBLIC_SAFETY">{t("publicSafety") || "Public Safety"}</option>
              <option value="OTHER">{t("other") || "Other Amenities"}</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t("status") || "Resolution Status"}
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800"
            >
              <option value="ALL">All Statuses</option>
              <option value="REPORTED">{t("reported") || "Reported (New)"}</option>
              <option value="ASSIGNED">{t("assigned") || "Assigned to Ward"}</option>
              <option value="IN_PROGRESS">{t("inProgress") || "In Progress (Active)"}</option>
              <option value="RESOLVED">{t("resolved") || "Resolved"}</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t("priority") || "Priority Level"}
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">{t("critical") || "Critical (Emergency)"}</option>
              <option value="HIGH">{t("high") || "High Priority"}</option>
              <option value="MEDIUM">{t("medium") || "Medium Priority"}</option>
              <option value="LOW">{t("low") || "Low Priority"}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>Showing {filtered.length} complaints</span>
          {(categoryFilter !== "ALL" || statusFilter !== "ALL" || priorityFilter !== "ALL" || search) && (
            <button
              onClick={() => {
                setCategoryFilter("ALL");
                setStatusFilter("ALL");
                setPriorityFilter("ALL");
                setSearch("");
              }}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600 dark:text-blue-400 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Loading complaints directory...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No matching grievances found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try adjusting your search keyword or clearing category and status filters.
            </p>
          </div>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all p-5 sm:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                      {c.id}
                    </span>
                    <CategoryBadge category={c.category} />
                    <PriorityBadge priority={c.priority} />
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(c.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {c.summary || c.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    {c.location?.address && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-xs">{c.location.address}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                      <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      {c.department}
                    </span>
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <StatusBadge status={c.status} />

                  <Link
                    href={`/complaints/${c.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 dark:bg-blue-950/60 dark:hover:bg-blue-600 text-blue-700 hover:text-white dark:text-blue-300 dark:hover:text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>View Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
