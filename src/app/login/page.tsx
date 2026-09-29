"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function CitizenLoginPage() {
  const router = useRouter();
  const { signInWithEmail, sendPhoneOtp, verifyPhoneOtp, quickDemoLogin } = useAuth();

  const [authMode, setAuthMode] = useState<"PHONE" | "EMAIL">("PHONE");

  // Phone states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [simulatedOtpNotice, setSimulatedOtpNotice] = useState<string | null>(null);

  // Email states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading & error states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle Phone OTP Request
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
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
      setErrorMessage(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Phone OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const fullPhone = phoneNumber.startsWith("+91")
        ? phoneNumber
        : `+91 ${phoneNumber.replace(/\D/g, "")}`;
      await verifyPhoneOtp(fullPhone, otpCode.trim(), "CITIZEN");
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid OTP code. Please enter 123456.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Email Sign In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await signInWithEmail(email, password, "CITIZEN");
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Fast Citizen Login for Hackathon
  const handleQuickCitizenLogin = async () => {
    setLoading(true);
    try {
      await quickDemoLogin("CITIZEN");
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMessage("Quick sign-in encountered an issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              JanSetu<span className="text-blue-600">.AI</span>
            </h1>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
              नागरिक पोर्टल
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Citizen Grievance & Public Service Access
          </p>
        </div>

        {/* 1-Click Demo Evaluation Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/90 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-950">
                Evaluation Quick Access
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-900">
              Instant
            </span>
          </div>
          <p className="text-[11px] text-blue-700 mt-1 leading-relaxed">
            Evaluating the citizen flow? Sign in with a verified demo citizen profile in one click:
          </p>
          <button
            type="button"
            onClick={handleQuickCitizenLogin}
            disabled={loading}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <User className="w-3.5 h-3.5" />
            <span>1-Click Demo Citizen Login (Aarav Sharma)</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Auth Mode Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => {
                setAuthMode("PHONE");
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                authMode === "PHONE"
                  ? "bg-white text-blue-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("EMAIL");
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                authMode === "EMAIL"
                  ? "bg-white text-blue-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* TAB 1: PHONE NUMBER & OTP */}
          {authMode === "PHONE" && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Mobile Number (भारत)
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Enter your 10-digit mobile number to receive a secure SMS OTP.
                    </p>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="98234 11201"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 text-sm font-semibold tracking-wider text-slate-900 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phoneNumber.length < 10}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Get 6-Digit OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {/* Simulated OTP banner */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>SMS Gateway Simulation</span>
                      <span className="font-mono bg-white px-2 py-0.5 rounded text-emerald-700 border border-emerald-200">
                        OTP: {simulatedOtpNotice || "123456"}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      We simulated an SMS sent to +91 {phoneNumber}. Enter the code above or standard code <strong>123456</strong>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Enter 6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      className="w-full text-center px-4 py-3 rounded-xl border border-slate-300 text-lg font-mono font-bold tracking-widest text-slate-900 focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-blue-600 hover:underline"
                    >
                      Change Mobile Number
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpCode(simulatedOtpNotice || "123456")}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Auto-fill Code
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: EMAIL & PASSWORD */}
          {authMode === "EMAIL" && (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In with Email</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Navigation Links */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-center text-xs text-slate-500">
            <p>
              Don't have a citizen account yet?{" "}
              <Link href="/register" className="font-bold text-blue-600 hover:underline">
                Register as Citizen
              </Link>
            </p>
          </div>
        </div>

        {/* Official Staff Portal Callout */}
        <div className="text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl border border-slate-200 transition-colors"
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Municipal Staff & Officer Login Portal →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
