import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Droplets,
  Trash2,
  Lightbulb,
  Waves,
  Zap,
  Building2,
  Search,
} from "lucide-react";
import { getAllComplaints, computeComplaintStats } from "@/lib/complaintsStore";
import { PriorityBadge, StatusBadge, CategoryBadge } from "@/components/StatusBadge";

export default async function HomePage() {
  const complaints = await getAllComplaints();
  const stats = computeComplaintStats(complaints);
  const recentComplaints = complaints.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white border-b border-slate-200/70">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Code for Communities 2.0 • AI-Powered Citizen Triage</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Report. Understand.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                Resolve.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              JanSetu AI uses Google Gemini to turn everyday civic complaints into structured, actionable municipal service requests.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/report"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Report a Civic Problem</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/complaints"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base border border-slate-300 shadow-xs transition-all"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Track Complaint Status</span>
              </Link>
            </div>
          </div>

          {/* Real-time KPI Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-5xl mx-auto">
            <div className="civic-card p-5 rounded-2xl border border-slate-200/90 text-center">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-mono">
                {stats.total}
              </span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1 block">
                Total Complaints
              </span>
            </div>

            <div className="civic-card p-5 rounded-2xl border border-amber-200/80 bg-amber-50/40 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-700 block font-mono">
                {stats.inProgress + stats.assigned}
              </span>
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider mt-1 block">
                Active & Dispatched
              </span>
            </div>

            <div className="civic-card p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 block font-mono">
                {stats.resolved}
              </span>
              <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider mt-1 block">
                Resolved Issues
              </span>
            </div>

            <div className="civic-card p-5 rounded-2xl border border-rose-200/80 bg-rose-50/40 text-center">
              <span className="text-2xl sm:text-3xl font-black text-rose-700 block font-mono">
                {stats.criticalOrHigh}
              </span>
              <span className="text-xs font-semibold text-rose-900 uppercase tracking-wider mt-1 block">
                High / Critical Priority
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Step Gemini Civic Intelligence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Intelligent Citizen Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            How JanSetu AI Closes the Civic Gap
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Eliminating the confusion of which government desk handles what.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg mb-4">
                01
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                1. Citizen Describes in Natural Words
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No complex bureaucratic forms. A citizen simply enters what happened in normal conversational language with optional photo and GPS location.
              </p>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 border border-slate-200">
              "Huge pothole near my college and two people almost fell yesterday."
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-b from-blue-50/60 to-white p-6 rounded-2xl border-2 border-blue-500/80 shadow-md relative flex flex-col justify-between">
            <div className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Gemini AI Engine
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg mb-4">
                02
              </div>
              <h3 className="font-bold text-base text-blue-950 mb-2">
                2. AI Structures & Triages Instantly
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gemini processes the complaint, extracts the department, categorizes severity (Low to Critical), validates location, and generates engineering actions.
              </p>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg text-xs font-mono text-blue-900 border border-blue-200 space-y-1">
              <div>Dept: <span className="font-bold">Municipal Roads Dept</span></div>
              <div>Priority: <span className="font-bold text-amber-600">HIGH</span></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-4">
                03
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                3. Dispatch & Transparent Tracking
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ward officers receive categorized work orders immediately. The citizen tracks live milestone updates from Reported to Resolved.
              </p>
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-xs font-mono text-emerald-900 border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Live 4-Stage Civic Stepper</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Civic Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Civic Complaint Domains Handled
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              AI automatically classifies complaints across Indian municipal departments
            </p>
          </div>
          <Link
            href="/report"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Submit a grievance now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: "Roads & Potholes", icon: Truck, color: "text-slate-700", bg: "bg-slate-100" },
            { name: "Water Supply", icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-50" },
            { name: "Waste Management", icon: Trash2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { name: "Street Lighting", icon: Lightbulb, color: "text-yellow-600", bg: "bg-yellow-50" },
            { name: "Drainage & Sewer", icon: Waves, color: "text-teal-600", bg: "bg-teal-50" },
            { name: "Electrical Wire Hazards", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center gap-2 hover:border-blue-400 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg ${cat.bg} ${cat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Public Grievances Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Live Transparency Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Recently triaged civic grievances and live municipal progress
            </p>
          </div>
          <Link
            href="/complaints"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View all complaints ({stats.total})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentComplaints.map((c) => (
            <Link
              key={c.id}
              href={`/complaints/${c.id}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {c.id}
                    </span>
                    <CategoryBadge category={c.category} />
                  </div>
                  <PriorityBadge priority={c.priority} />
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {c.summary || c.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[200px]">{c.location?.address || c.department}</span>
                <StatusBadge status={c.status} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Admin Fast-Track Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Municipal Administrative Interface</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Are you evaluating the Municipal Control Desk?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Access the Admin Portal to view aggregated department statistics, filter complaints by priority and category, and transition grievance workflows from Reported to Resolved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
            >
              <span>Launch Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
