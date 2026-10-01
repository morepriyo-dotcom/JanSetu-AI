import React from "react";

interface JanSetuLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export function JanSetuLogo({
  size = 40,
  className = "",
  showText = false,
  textClassName = "",
}: JanSetuLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-md"
      >
        <defs>
          <linearGradient id="logoShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="logoBridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          <linearGradient id="logoStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="logoSaffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="logoGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Outer Rounded Shield */}
        <rect
          x="4"
          y="4"
          width="120"
          height="120"
          rx="30"
          fill="url(#logoShieldGrad)"
          stroke="#38BDF8"
          strokeWidth="3.5"
          strokeOpacity="0.7"
        />

        {/* Subtle Inner Ring */}
        <rect
          x="10"
          y="10"
          width="108"
          height="108"
          rx="24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.15"
        />

        {/* Saffron Civic Accent Arc (Top Left) */}
        <path
          d="M 22 28 C 36 18, 52 18, 64 20"
          fill="none"
          stroke="url(#logoSaffronGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* India Green Civic Accent Arc (Bottom Right) */}
        <path
          d="M 64 108 C 78 108, 94 106, 106 96"
          fill="none"
          stroke="url(#logoGreenGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Bridge Pillars */}
        <rect x="26" y="56" width="8" height="42" rx="4" fill="#38BDF8" opacity="0.9" />
        <rect x="94" y="56" width="8" height="42" rx="4" fill="#60A5FA" opacity="0.9" />

        {/* Suspension Cables */}
        <line x1="30" y1="56" x2="64" y2="40" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3,2" opacity="0.8" />
        <line x1="98" y1="56" x2="64" y2="40" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3,2" opacity="0.8" />
        <line x1="44" y1="62" x2="64" y2="40" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
        <line x1="84" y1="62" x2="64" y2="40" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />

        {/* The Grand Bridge Arch (Setu) */}
        <path
          d="M 22 84 C 40 50, 88 50, 106 84"
          fill="none"
          stroke="url(#logoBridgeGrad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Road Deck Span */}
        <path d="M 20 86 Q 64 78 108 86" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* River Reflection */}
        <path d="M 38 98 C 50 94, 78 94, 90 98" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M 46 104 C 54 101, 74 101, 82 104" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

        {/* Central AI Neural Star (Intelligence Node) */}
        <g transform="translate(64, 40)">
          <circle cx="0" cy="0" r="14" fill="#F59E0B" opacity="0.3" />
          <circle cx="0" cy="0" r="8" fill="#FDE047" opacity="0.5" />
          <path d="M 0 -13 Q 0 0 13 0 Q 0 0 0 13 Q 0 0 -13 0 Q 0 0 0 -13 Z" fill="url(#logoStarGrad)" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
        </g>
      </svg>

      {showText && (
        <div className={textClassName}>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
              JanSetu<span className="text-blue-600 dark:text-blue-400">.AI</span>
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            Digital Public Good • जनसेतु
          </p>
        </div>
      )}
    </div>
  );
}
