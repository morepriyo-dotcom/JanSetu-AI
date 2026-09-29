"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  RefreshCw,
  Search,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Layers,
} from "lucide-react";
import { Complaint, ComplaintStatus, CivicCategory, ComplaintPriority } from "@/types/complaint";
import { PriorityBadge, StatusBadge, CategoryBadge } from "@/components/StatusBadge";
import { subscribeToComplaints } from "@/lib/complaintsStore";
import { useAuth } from "@/context/AuthContext";
import { NationalDataIntelligence } from "@/components/NationalDataIntelligence";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");

  // Status updating
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/complaints");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setComplaints(json.data);
      }
    } catch (err) {
      console.error("Failed to load admin complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();

    // Attach live Firestore listener
    const unsub = subscribeToComplaints((liveComplaints) => {
      if (Array.isArray(liveComplaints) && liveComplaints.length > 0) {
        setComplaints(liveComplaints);
        setLoading(false);
      }
    });

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  // Update Status handler
  const handleStatusChange = async (id: string, newStatus: ComplaintStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          note: `Municipal Admin updated status to ${newStatus}.`,
          updatedBy: "Municipal Control Desk",
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        // Optimistically update in state
        setComplaints((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      } else {
        alert(json.error || "Failed to update status.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  // KPI calculations
  const total = complaints.length;
  const reported = complaints.filter((c) => c.status === "REPORTED").length;
  const inProgress = complaints.filter(
    (c) => c.status === "IN_PROGRESS" || c.status === "ASSIGNED"
  ).length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const criticalOrHigh = complaints.filter(
    (c) => c.priority === "CRITICAL" || c.priority === "HIGH"
  ).length;

  // Filtered complaints
  const filtered = complaints.filter((c) => {
    if (categoryFilter !== "ALL" && c.category !== categoryFilter) return false;
    if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
    if (priorityFilter !== "ALL" && c.priority !== priorityFilter) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        (c.location?.address && c.location.address.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const isOfficerOrAdmin = user && (user.role === "ADMIN" || user.role === "FIELD_OFFICER");

  if (!isOfficerOrAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 border border-amber-300 flex items-center justify-center mx-auto shadow-md">
          <Building2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            e-Governance Security Protocol
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Official Municipal Clearance Required
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            The Administrative Grievance Operations Desk is restricted to verified Municipal Commissioners, Zonal Officers, and Ward Field Inspectors.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-lg mx-auto shadow-sm space-y-4">
          <Link
            href="/admin/login"
            className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          Citizen looking to file or track a problem?{" "}
          <Link href="/report" className="text-blue-600 font-bold hover:underline">
            Go to Citizen Portal
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Officer Active Clearance Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-semibold text-slate-300">
            Authenticated Clearance:{" "}
            <strong className="text-white font-bold">{user?.name}</strong>{" "}
            ({user?.designation || user?.role})
          </span>
        </div>
        <span className="text-[11px] text-blue-300 bg-blue-900/60 border border-blue-700/50 px-2.5 py-0.5 rounded-full font-mono">
          {user?.department || "Municipal Command Center"}
        </span>
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Municipal Control & Triage Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrative Grievance Operations
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real-time municipal triage, department dispatch, priority management, and resolution tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Refresh button */}
          <button
            onClick={fetchComplaints}
            className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Refresh database"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/admin/complaints"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Full Table View</span>
          </Link>
        </div>
      </div>

      {/* 5 Core Dashboard KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Total Complaints
          </span>
          <div className="text-3xl font-black text-slate-900 font-mono">{total}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Registered in system</span>
        </div>

        {/* Open (Reported) */}
        <div className="bg-white p-5 rounded-2xl border border-sky-200 bg-sky-50/40 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 block mb-1">
            Open (Reported)
          </span>
          <div className="text-3xl font-black text-sky-950 font-mono">{reported}</div>
          <span className="text-[10px] text-sky-700 mt-1 block">Awaiting ward assignment</span>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
            In Progress / Assigned
          </span>
          <div className="text-3xl font-black text-amber-950 font-mono">{inProgress}</div>
          <span className="text-[10px] text-amber-700 mt-1 block">Active on-ground work</span>
        </div>

        {/* Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            Resolved
          </span>
          <div className="text-3xl font-black text-emerald-950 font-mono">{resolved}</div>
          <span className="text-[10px] text-emerald-700 mt-1 block">Closed & confirmed</span>
        </div>

        {/* High/Critical Priority */}
        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/40 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            High / Critical
          </span>
          <div className="text-3xl font-black text-rose-950 font-mono">{criticalOrHigh}</div>
          <span className="text-[10px] text-rose-700 mt-1 block">Immediate action SLA</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, keyword, department, or location..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
            >
              <option value="ALL">All Categories</option>
              <option value="ROADS">Roads</option>
              <option value="WATER">Water</option>
              <option value="SANITATION">Sanitation</option>
              <option value="ELECTRICITY">Electricity</option>
              <option value="STREETLIGHT">Streetlight</option>
              <option value="DRAINAGE">Drainage</option>
              <option value="PUBLIC_SAFETY">Safety</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="REPORTED">Reported</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Admin Complaint Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900">
            Active Civic Complaints Registry ({filtered.length})
          </h3>
          <span className="text-xs text-slate-500">
            Click status dropdown to update state live
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Complaint & Issue</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Priority</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Current Status</th>
                <th className="px-4 py-3.5">Change Status (Admin)</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-blue-600 mb-2" />
                    <span>Loading complaints database...</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                    No complaints match current filters. Adjust your search or filter options.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* ID */}
                    <td className="px-4 py-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {c.id}
                    </td>

                    {/* Complaint */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="font-bold text-slate-900 line-clamp-1">{c.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {c.summary || c.description}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <CategoryBadge category={c.category} />
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <PriorityBadge priority={c.priority} />
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3.5 max-w-[180px] font-medium text-slate-800 line-clamp-2">
                      {c.department}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 max-w-[160px] text-slate-600 line-clamp-1">
                      {c.location?.address || "Unknown"}
                    </td>

                    {/* Current Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusBadge status={c.status} />
                    </td>

                    {/* Interactive Status Changer */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <select
                        value={c.status}
                        disabled={updatingId === c.id}
                        onChange={(e) =>
                          handleStatusChange(c.id, e.target.value as ComplaintStatus)
                        }
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white text-slate-800 hover:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                      >
                        <option value="REPORTED">REPORTED</option>
                        <option value="ASSIGNED">ASSIGNED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>

                    {/* Action Link */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <Link
                        href={`/complaints/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                        title="View citizen tracking view"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* National Infrastructure, Geospatial & Policy Synthesis Desk */}
      <NationalDataIntelligence totalComplaints={complaints.length} />
    </div>
  );
}
