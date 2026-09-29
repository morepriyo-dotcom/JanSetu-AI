"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  PlusCircle,
  LayoutDashboard,
  FileSearch,
  Building2,
  Menu,
  X,
  Sparkles,
  Home,
  Flame,
  User,
  LogOut,
  ChevronDown,
  UserCheck,
} from "lucide-react";
import { FirebaseModal } from "@/components/FirebaseModal";
import { isConfigValid, getActiveFirebaseConfig } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firebaseModalOpen, setFirebaseModalOpen] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const checkFirebaseStatus = () => {
    const config = getActiveFirebaseConfig();
    setIsFirebaseConnected(isConfigValid(config));
  };

  useEffect(() => {
    checkFirebaseStatus();
  }, []);

  const isAdminArea = pathname?.startsWith("/admin");

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/report", label: "Report Issue", icon: PlusCircle },
    { href: "/dashboard", label: "Citizen Dashboard", icon: LayoutDashboard },
    { href: "/complaints", label: "Public Tracker", icon: FileSearch },
    { href: "/admin", label: "Admin Portal", icon: Building2 },
  ];

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900">
                    JanSetu<span className="text-blue-600">.AI</span>
                  </span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded">
                    जनसेतु
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block leading-none">
                  AI Citizen Grievance & Public Service Assistant
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-blue-700 bg-blue-50/80 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {link.label}
                    {link.href === "/admin" && (
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-bold">
                        Staff
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs & Auth Badges */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Firebase Live Status Button */}
              <button
                type="button"
                onClick={() => setFirebaseModalOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isFirebaseConnected
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                    : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                }`}
                title="Manage Cloud Firestore and Storage"
              >
                <Flame
                  className={`w-3.5 h-3.5 ${
                    isFirebaseConnected
                      ? "text-emerald-600 fill-emerald-500"
                      : "text-amber-600 fill-amber-500"
                  }`}
                />
                <span>{isFirebaseConnected ? "Firebase: Live" : "Firebase: Connect"}</span>
              </button>

              {/* User Authentication Menu */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-800 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate max-w-[120px]">{user.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "FIELD_OFFICER"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {user.role === "ADMIN"
                        ? "Admin"
                        : user.role === "FIELD_OFFICER"
                        ? "Officer"
                        : "Citizen"}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user.email || user.phoneNumber}
                        </p>
                        {user.designation && (
                          <p className="text-[10px] text-blue-700 font-semibold mt-0.5">
                            {user.designation}
                          </p>
                        )}
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                          <span>My Grievance Dashboard</span>
                        </Link>
                        {user.role !== "CITIZEN" && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold"
                          >
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Municipal Operations Desk</span>
                          </Link>
                        )}
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Citizen Sign In
                  </Link>
                  <Link
                    href="/admin/login"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                  >
                    Official Portal
                  </Link>
                </div>
              )}

              <Link
                href="/report"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/30 transition-all hover:shadow-md"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report Issue</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setFirebaseModalOpen(true)}
                className="p-1.5 rounded-lg border border-slate-300 text-slate-700"
                title="Firebase Settings"
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              </button>
              <Link
                href="/report"
                className="p-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
              >
                Report
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {/* User profile summary on mobile if logged in */}
            {user ? (
              <div className="p-3 mb-2 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-slate-500">{user.role}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-bold text-rose-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-2 pb-2 border-b border-slate-100">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center rounded-lg border border-slate-300 text-xs font-bold text-slate-700"
                >
                  Citizen Login
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center rounded-lg bg-slate-900 text-white text-xs font-bold"
                >
                  Officer Login
                </Link>
              </div>
            )}

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "text-blue-700 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    {link.label}
                  </div>
                  {link.href === "/admin" && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                      Admin
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFirebaseModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>Configure Firebase</span>
                </div>
                <span>{isFirebaseConnected ? "Connected" : "Setup"}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Firebase Settings Modal */}
      <FirebaseModal
        isOpen={firebaseModalOpen}
        onClose={() => {
          setFirebaseModalOpen(false);
          checkFirebaseStatus();
        }}
        onConfigured={checkFirebaseStatus}
      />
    </>
  );
}
