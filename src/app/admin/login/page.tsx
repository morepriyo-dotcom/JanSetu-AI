"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UserCheck,
  Award,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/user";

export default function AdminOfficerLoginPage() {
  const router = useRouter();
  const { signInWithEmail, sendPhoneOtp, verifyPhoneOtp } = useAuth();

  const [selectedRole, setSelectedRole] = useState<"ADMIN" | "FIELD_OFFICER">("ADMIN");
  const [selectedDepartment, setSelectedDepartment] = useState("Municipal Roads & Infrastructure Department");
  const [authMode, setAuthMode] = useState<"OFFICIAL_EMAIL" | "STAFF_PHONE">("OFFICIAL_EMAIL");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [simulatedOtpNotice, setSimulatedOtpNotice] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter your official email and password.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await signInWithEmail(email, password, selectedRole);
      router.push("/admin");
    } catch (err: any) {
      setErrorMessage(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage("Please enter a valid 10-digit registered staff mobile number.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const fullPhone = phoneNumber.startsWith("+91")
        ? phoneNumber
        : `+91 ${phoneNumber.replace(/\D/g, "")}`;
      const res = await sendPhoneOtp(fullPhone);
      setOtpSent(true);
      setSimulatedOtpNotice(res.simulatedOtp);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to dispatch staff OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setErrorMessage("Please enter the 6-digit staff OTP.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const fullPhone = phoneNumber.startsWith("+91")
        ? phoneNumber
        : `+91 ${phoneNumber.replace(/\D/g, "")}`;
      await verifyPhoneOtp(
        fullPhone,
        otpCode.trim(),
        selectedRole,
        selectedRole === "ADMIN" ? "Municipal Administrator" : "Ward Field Inspector"
      );
      router.push("/admin");
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid OTP code. Enter 123456.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white">
      <div className="max-w-xl w-full space-y-6">
        {/* National e-Governance Emblem Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-500/20 mb-2 border border-white/20">
            <Building2 className="w-9 h-9" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white">
              JanSetu<span className="text-blue-400">.Gov</span>
            </h1>
            <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
              अधिकारी पोर्टल
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            National Municipal Grievance Redressal & Triage Gateway
          </p>
          <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>e-Governance Municipal Staff Security Zone</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Official Form Card */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Step 1: Select Clearance Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. Designated Authority Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole("ADMIN")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedRole === "ADMIN"
                    ? "bg-blue-600 border-blue-400 text-white shadow-md"
                    : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Municipal Commissioner</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("FIELD_OFFICER")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedRole === "FIELD_OFFICER"
                    ? "bg-blue-600 border-blue-400 text-white shadow-md"
                    : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Ward Field Officer</span>
              </button>
            </div>
          </div>

          {/* Step 2: Department Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              2. Municipal Department Clearance
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Municipal Roads & Infrastructure Department">
                Municipal Roads & Infrastructure (PWD)
              </option>
              <option value="Solid Waste Management Department">
                Solid Waste Management & Sanitation
              </option>
              <option value="Water Supply & Sewerage Board">
                Water Supply & Sewerage Board
              </option>
              <option value="Electrical & Public Lighting Department">
                Electrical & Public Lighting Department
              </option>
              <option value="Drainage & Sewerage Department">
                Drainage & Stormwater Management
              </option>
              <option value="Town Planning & Anti-Encroachment Cell">
                Town Planning & Anti-Encroachment
              </option>
              <option value="Central Municipal Governance & Operations">
                Central Command & Operations Control
              </option>
            </select>
          </div>

          {/* Auth Mode Tabs: Official Email vs Staff Mobile OTP */}
          <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl text-xs font-bold text-slate-400">
            <button
              type="button"
              onClick={() => {
                setAuthMode("OFFICIAL_EMAIL");
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                authMode === "OFFICIAL_EMAIL"
                  ? "bg-slate-700 text-white shadow-xs"
                  : "hover:text-white"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Official Email</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("STAFF_PHONE");
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                authMode === "STAFF_PHONE"
                  ? "bg-slate-700 text-white shadow-xs"
                  : "hover:text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Staff Mobile OTP</span>
            </button>
          </div>

          {/* Tab 1: Official Email */}
          {authMode === "OFFICIAL_EMAIL" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Email or Staff ID
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. commissioner@municipal.gov.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Security Passkey
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Official Clearance...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Command Desk</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Tab 2: Staff Mobile OTP */}
          {authMode === "STAFF_PHONE" && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Registered Staff Mobile
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-700 bg-slate-950 text-slate-400 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="98100 23456"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-700 bg-slate-900 text-sm font-mono text-white focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phoneNumber.length < 10}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching Staff OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Official OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyPhoneOtp} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs">
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>Official Staff OTP Dispatched</span>
                      <span className="font-mono bg-slate-900 px-2 py-0.5 rounded text-amber-300 border border-slate-700">
                        OTP: {simulatedOtpNotice || "123456"}
                      </span>
                    </div>
                    <p className="text-[11px]">
                      Enter verification code above or standard code <strong>123456</strong>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      6-Digit Official Passcode
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      className="w-full text-center px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-lg font-mono font-bold tracking-widest text-white focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Clearance & Enter Desk</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Return to Citizen Public Portal */}
        <div className="text-center pt-2">
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Citizen Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
