"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Building,
  RefreshCw,
  Search,
} from "lucide-react";
import { Complaint } from "@/types/complaint";
import { PriorityBadge, StatusBadge, CategoryBadge } from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { UserCheck, LogIn } from "lucide-react";

export default function CitizenDashboardPage() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/complaints");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setComplaints(json.data);
      }
    } catch (err) {
      console.error("Failed to load citizen complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const total = complaints.length;
  const inProgress = complaints.filter(
    (c) => c.status === "IN_PROGRESS" || c.status === "ASSIGNED"
  ).length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const reported = complaints.filter((c) => c.status === "REPORTED").length;

  const filteredComplaints = complaints.filter((c) => {
    if (filterStatus !== "ALL" && c.status !== filterStatus) return false;
    if (
      searchQuery &&
      !c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* User Greeting or Guest Sign-In Notice */}
      {user ? (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">
                Namaste, {user.name}
              </p>
              <p className="text-slate-600 text-[11px]">
                Verified Citizen Account • {user.phoneNumber || user.email} {user.ward ? `• ${user.ward}` : ""}
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
            Citizen Active Status
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold text-amber-950">
              Browsing as Citizen Guest
            </p>
            <p className="text-amber-800 text-[11px] mt-0.5">
              Sign in with your mobile number to link and track all your personal complaints across devices.
            </p>
          </div>
          <Link
            href="/login"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition-colors shrink-0"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Citizen Sign In / OTP</span>
          </Link>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Citizen Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Civic Grievances Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Monitor real-time resolution stages and municipal ward actions for your submitted requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchComplaints}
            className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Refresh dashboard"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report New Issue</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Filed</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{total}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">All registered grievances</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sky-200 bg-sky-50/30 shadow-xs">
          <div className="flex items-center justify-between text-sky-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">New Reported</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-sky-950 font-mono">{reported}</div>
          <span className="text-[11px] text-sky-700 mt-1 block">Awaiting ward assignment</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-950 font-mono">{inProgress}</div>
          <span className="text-[11px] text-amber-700 mt-1 block">Ground crew active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-950 font-mono">{resolved}</div>
          <span className="text-[11px] text-emerald-700 mt-1 block">Successfully closed</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, issue or area..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["ALL", "REPORTED", "ASSIGNED", "IN_PROGRESS", "RESOLVED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                filterStatus === st
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {st === "ALL" ? "All Statuses" : st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-xs text-slate-500 font-medium">Loading complaints from repository...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-800">No complaints match your filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't filed any complaints matching this filter or search query.
            </p>
            <div className="pt-2">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Submit a Complaint</span>
              </Link>
            </div>
          </div>
        ) : (
          filteredComplaints.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all p-5 sm:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {c.id}
                    </span>
                    <CategoryBadge category={c.category} />
                    <PriorityBadge priority={c.priority} />
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(c.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {c.summary || c.description}
                  </p>

                  {/* Metadata line */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    {c.location?.address && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-xs">{c.location.address}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {c.department}
                    </span>
                  </div>
                </div>

                {/* Right: Status badge & Action */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <StatusBadge status={c.status} />

                  <Link
                    href={`/complaints/${c.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <span>Track Live</span>
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
