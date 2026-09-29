"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Shield, ExternalLink, HelpCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export function GovTopBar() {
  const { t } = useLanguage();
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);

  const handleAdjustFontSize = (delta: number) => {
    const newLevel = Math.max(-1, Math.min(2, fontSizeLevel + delta));
    setFontSizeLevel(newLevel);
    const root = document.documentElement;
    if (newLevel === -1) {
      root.style.fontSize = "14px";
    } else if (newLevel === 0) {
      root.style.fontSize = "16px";
    } else if (newLevel === 1) {
      root.style.fontSize = "18px";
    } else if (newLevel === 2) {
      root.style.fontSize = "20px";
    }
  };

  return (
    <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 text-xs select-none">
      {/* Tricolor Accent Line */}
      <div className="gov-tricolor-bar w-full" />

      {/* Main Government Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Ministry Identification */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-amber-400 text-sm tracking-widest">
              🇮🇳
            </span>
            <div className="leading-tight">
              <span className="font-bold text-white block text-[11px] sm:text-xs">
                {t("govOfIndia")}
              </span>
              <span className="text-[10px] text-slate-400 hidden md:block">
                {t("ministry")}
              </span>
            </div>
          </div>

          <span className="hidden lg:inline text-slate-600">|</span>

          <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 text-[10px] font-semibold border border-blue-700/50">
            <Shield className="w-3 h-3 text-blue-400" />
            {t("digitalPublicGood")}
          </span>
        </div>

        {/* Right: Accessibility Controls, Language, Theme, Helplines */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Emergency Helpline */}
          <a
            href="tel:1913"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 font-semibold px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-800/60 transition-colors"
            title="National Municipal Grievance Helpline"
          >
            <Phone className="w-3 h-3" />
            <span>1913 / 112</span>
          </a>

          {/* GIGW Accessibility Font Size Adjuster */}
          <div className="hidden md:flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-800/80 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => handleAdjustFontSize(-1)}
              className="px-2 py-1 hover:bg-slate-700 text-slate-300 border-r border-slate-700"
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => handleAdjustFontSize(0 - fontSizeLevel)}
              className="px-2 py-1 hover:bg-slate-700 text-slate-300 border-r border-slate-700"
              title="Reset Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => handleAdjustFontSize(1)}
              className="px-2 py-1 hover:bg-slate-700 text-slate-300"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Multilingual Selector */}
          <LanguageSwitcher />

          {/* Light / Night Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
