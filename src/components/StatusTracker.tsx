import React from "react";
import { ComplaintStatus, ComplaintTimelineEvent } from "@/types/complaint";
import { Check, Clock, UserCheck, Wrench, CheckCircle } from "lucide-react";

interface StatusTrackerProps {
  currentStatus: ComplaintStatus;
  timeline?: ComplaintTimelineEvent[];
}

const STEPS: { status: ComplaintStatus; label: string; desc: string; icon: any }[] = [
  {
    status: "REPORTED",
    label: "Reported",
    desc: "Citizen grievance logged & AI triaged",
    icon: Clock,
  },
  {
    status: "ASSIGNED",
    label: "Assigned",
    desc: "Routed to responsible ward department",
    icon: UserCheck,
  },
  {
    status: "IN_PROGRESS",
    label: "In Progress",
    desc: "Ground crew actively resolving",
    icon: Wrench,
  },
  {
    status: "RESOLVED",
    label: "Resolved",
    desc: "Issue verified & closed",
    icon: CheckCircle,
  },
];

export function StatusTracker({ currentStatus, timeline = [] }: StatusTrackerProps) {
  const statusOrder: Record<ComplaintStatus, number> = {
    REPORTED: 0,
    ASSIGNED: 1,
    IN_PROGRESS: 2,
    RESOLVED: 3,
  };

  const currentIdx = statusOrder[currentStatus] ?? 0;

  return (
    <div className="w-full py-4">
      {/* Stepper bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isPending = idx > currentIdx;
          const Icon = step.icon;

          // Find timeline entry matching this step
          const event = timeline.find((e) => e.status === step.status);

          return (
            <div
              key={step.status}
              className={`flex flex-col p-4 rounded-xl border transition-all ${
                isCurrent
                  ? "bg-white border-blue-500 shadow-md ring-2 ring-blue-100"
                  : isCompleted
                  ? "bg-emerald-50/50 border-emerald-200 text-slate-800"
                  : "bg-slate-50/60 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div>
                  <h4
                    className={`font-semibold text-sm ${
                      isCurrent
                        ? "text-blue-900"
                        : isCompleted
                        ? "text-emerald-950"
                        : "text-slate-500"
                    }`}
                  >
                    {step.label}
                  </h4>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    {step.desc}
                  </span>
                </div>
              </div>

              {event && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-xs">
                  <p className="text-slate-700 font-medium line-clamp-2">{event.note}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {new Date(event.timestamp).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
