import React from "react";
import { DEMO_PRESET_COMPLAINTS } from "@/lib/demoData";
import { Sparkles, ArrowRight } from "lucide-react";

interface TryDemoPresetsProps {
  onSelect: (preset: { description: string; location: string }) => void;
}

export function TryDemoPresets({ onSelect }: TryDemoPresetsProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 mb-6">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
            Try Demo Civic Scenarios
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">
              Instant Fill
            </span>
          </h3>
          <p className="text-xs text-blue-700">
            Click any realistic Indian civic complaint below to test Gemini AI structuring & triage immediately:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-3">
        {DEMO_PRESET_COMPLAINTS.map((preset, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect({ description: preset.description, location: preset.location })}
            className="group text-left p-3 rounded-xl bg-white border border-blue-100 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>{preset.title}</span>
                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  {preset.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                "{preset.description}"
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-2 group-hover:text-blue-700">
              <span>Use this scenario</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
