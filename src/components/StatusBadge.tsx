import React from "react";
import { CivicCategory, ComplaintPriority, ComplaintStatus } from "@/types/complaint";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertCircle,
  Truck,
  Droplets,
  Trash2,
  Zap,
  Lightbulb,
  Waves,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

export function PriorityBadge({ priority }: { priority: ComplaintPriority }) {
  switch (priority) {
    case "CRITICAL":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          CRITICAL
        </span>
      );
    case "HIGH":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
          HIGH
        </span>
      );
    case "MEDIUM":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
          MEDIUM
        </span>
      );
    case "LOW":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          LOW
        </span>
      );
    default:
      return null;
  }
}

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  switch (status) {
    case "REPORTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          <Clock className="w-3.5 h-3.5" />
          Reported
        </span>
      );
    case "ASSIGNED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <UserCheck className="w-3.5 h-3.5" />
          Assigned
        </span>
      );
    case "IN_PROGRESS":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping mr-0.5" />
          In Progress
        </span>
      );
    case "RESOLVED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Resolved
        </span>
      );
    default:
      return null;
  }
}

export function CategoryBadge({ category }: { category: CivicCategory }) {
  const getCategoryDetails = () => {
    switch (category) {
      case "ROADS":
        return {
          label: "Roads & Pavements",
          icon: Truck,
          className: "bg-slate-100 text-slate-800 border-slate-200",
        };
      case "WATER":
        return {
          label: "Water Supply",
          icon: Droplets,
          className: "bg-cyan-50 text-cyan-800 border-cyan-200",
        };
      case "SANITATION":
        return {
          label: "Sanitation & Waste",
          icon: Trash2,
          className: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case "ELECTRICITY":
        return {
          label: "Power & Wiring",
          icon: Zap,
          className: "bg-amber-50 text-amber-800 border-amber-200",
        };
      case "STREETLIGHT":
        return {
          label: "Public Streetlight",
          icon: Lightbulb,
          className: "bg-yellow-50 text-yellow-800 border-yellow-200",
        };
      case "DRAINAGE":
        return {
          label: "Drainage & Sewerage",
          icon: Waves,
          className: "bg-teal-50 text-teal-800 border-teal-200",
        };
      case "PUBLIC_SAFETY":
        return {
          label: "Public Safety",
          icon: ShieldAlert,
          className: "bg-rose-50 text-rose-800 border-rose-200",
        };
      default:
        return {
          label: "Civic Amenities",
          icon: HelpCircle,
          className: "bg-slate-100 text-slate-700 border-slate-200",
        };
    }
  };

  const { label, icon: Icon, className } = getCategoryDetails();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
