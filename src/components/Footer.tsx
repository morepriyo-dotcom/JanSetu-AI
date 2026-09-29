import React from "react";
import Link from "next/link";
import { ShieldCheck, PhoneCall, Award, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                JanSetu<span className="text-blue-400">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bridging citizens and local municipal administration through AI. Transforming natural language civic complaints into structured, actionable municipal work orders.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] text-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Built for Code for Communities 2.0</span>
            </div>
          </div>

          {/* Col 2: Citizen Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/report" className="hover:text-blue-400 transition-colors">
                  Report a Civic Problem
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                  Citizen Dashboard
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="hover:text-blue-400 transition-colors">
                  Track Grievance Status
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="hover:text-blue-400 transition-colors">
                  Public Transparency Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Municipal Administration */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Municipal Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors">
                  Admin Analytics & Triage Desk
                </Link>
              </li>
              <li>
                <Link href="/admin/complaints" className="hover:text-blue-400 transition-colors">
                  Department Grievance Manager
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Ward Dispatch System (Live)</span>
              </li>
              <li>
                <span className="text-slate-500">SLA Performance Metrics</span>
              </li>
            </ul>
          </div>

          {/* Col 4: National Civic Helplines */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Civic Helplines (India)
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>National Emergency:</span>
                <span className="text-white font-mono font-bold">112</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Municipal Grievances:</span>
                <span className="text-white font-mono font-bold">1913</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Swachh Bharat Helpline:</span>
                <span className="text-white font-mono font-bold">1969</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Electricity Breakdown:</span>
                <span className="text-white font-mono font-bold">1912</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 JanSetu AI. Open Citizen Technology Platform.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Powered by Google Gemini AI & Next.js <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
