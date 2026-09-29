"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  User,
  UserPlus,
  Building2,
  Lock,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function CitizenGateContent() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/report";
  const { t } = useLanguage();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-xl w-full space-y-8">
        {/* Emblem & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 border border-white/20">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Verified Citizen Access Gate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Citizen Authentication Required
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
              As per National Digital Public Good standards, filing a civic grievance requires verified citizen credentials (Mobile OTP or Email) to guarantee official department tracking and prevent spam.
            </p>
          </div>
        </div>

        {/* 2 Main Citizen Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option A: Login */}
          <Link
            href={`/login?returnUrl=${encodeURIComponent(returnUrl)}`}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Sign In to Account
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Already registered? Sign in instantly via registered Mobile Number (OTP) or Email.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Continue to Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Option B: Register */}
          <Link
            href={`/register?returnUrl=${encodeURIComponent(returnUrl)}`}
            className="group p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Create New Account
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  New citizen? Register your name, mobile, and municipal ward in 30 seconds.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-white pt-3 border-t border-white/20">
              <span>Register Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Benefits of Verified Citizen Account */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Why Verified Login is Required:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Real-time SMS & WhatsApp alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Official 4-stage tracking timeline</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Pre-filled ward & contact details</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct communication with Ward Inspector</span>
            </div>
          </div>
        </div>

        {/* Official Staff Portal Link */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          Municipal Officer or Field Engineer?{" "}
          <Link
            href="/admin/login"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Access Official e-Gov Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CitizenGatePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading access gate...</div>}>
      <CitizenGateContent />
    </Suspense>
  );
}
