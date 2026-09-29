"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  Calendar,
  Building,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { Complaint, ComplaintStatus, CivicCategory, ComplaintPriority } from "@/types/complaint";
import { PriorityBadge, StatusBadge, CategoryBadge } from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";

export default function AdminComplaintsListPage() {
  const { user, quickDemoLogin } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
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
      console.error("Admin fetch complaints error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ComplaintStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          note: `Admin changed status to ${newStatus}.`,
          updatedBy: "Municipal Operations Staff",
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setComplaints((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      } else {
        alert(json.error || "Failed to update status.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

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
          <Building className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Official Security Protocol
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Municipal Master Ledger Restricted
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Viewing and editing the Master Civic Ledger requires official administrative clearance.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-lg mx-auto shadow-sm space-y-4">
          <Link
            href="/admin/login"
            className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Building className="w-4 h-4 text-blue-400" />
            <span>Official Officer Sign In</span>
          </Link>

          <button
            type="button"
            onClick={() => quickDemoLogin("ADMIN")}
            className="w-full py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <span>1-Click Test Clearance (Municipal Admin)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header and Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Overview</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-blue-600" />
            <span>Master Complaints Ledger</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Complete municipal database of all citizen grievances, priority queues, and ward dispatches.
          </p>
        </div>

        <button
          onClick={fetchComplaints}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Table</span>
        </button>
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

      {/* Complaints Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Issue & Description</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Priority</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Action Status</th>
                <th className="px-4 py-3.5 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-blue-600 mb-2" />
                    <span>Loading complaints...</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                    No complaints matching filters.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {c.id}
                    </td>

                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="font-bold text-slate-900 line-clamp-1">{c.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {c.summary || c.description}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <CategoryBadge category={c.category} />
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <PriorityBadge priority={c.priority} />
                    </td>

                    <td className="px-4 py-3.5 max-w-[180px] font-medium text-slate-800 line-clamp-2">
                      {c.department}
                    </td>

                    <td className="px-4 py-3.5 max-w-[160px] text-slate-600 line-clamp-1">
                      {c.location?.address || "Unknown"}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusBadge status={c.status} />
                    </td>

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

                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <Link
                        href={`/complaints/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
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
    </div>
  );
}
