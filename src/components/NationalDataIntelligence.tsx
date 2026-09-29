"use client";

import React, { useState } from "react";
import {
  Database,
  Satellite,
  CloudRain,
  Activity,
  Wheat,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  NATIONAL_OPEN_DATA_METRICS,
  WARD_PROFILES,
  generateNationalPolicyRecommendations,
  NationalDataMetric,
  WardInfrastructureProfile,
  PolicyRecommendation,
} from "@/lib/nationalData";
import { useLanguage } from "@/context/LanguageContext";

interface NationalDataProps {
  totalComplaints?: number;
  className?: string;
}

export function NationalDataIntelligence({ totalComplaints = 18, className = "" }: NationalDataProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"METRICS" | "WARDS" | "POLICY">("POLICY");
  const recommendations = generateNationalPolicyRecommendations(totalComplaints);

  const getSourceIcon = (source: NationalDataMetric["source"]) => {
    switch (source) {
      case "data.gov.in":
        return <Database className="w-4 h-4 text-blue-500" />;
      case "ISRO/Bhuvan":
        return <Satellite className="w-4 h-4 text-purple-500" />;
      case "IMD":
        return <CloudRain className="w-4 h-4 text-sky-500" />;
      case "WHO/MoHFW":
        return <Activity className="w-4 h-4 text-rose-500" />;
      case "FAO/MoA":
        return <Wheat className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: NationalDataMetric["status"]) => {
    switch (status) {
      case "CRITICAL":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            CRITICAL
          </span>
        );
      case "WARNING":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            ALERT
          </span>
        );
      case "NORMAL":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            OPERATIONAL
          </span>
        );
    }
  };

  return (
    <div className={`civic-card rounded-3xl p-6 sm:p-8 space-y-6 ${className}`}>
      {/* Masthead */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Digital Public Good • Open Government Data Alignment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            National Infrastructure & Geospatial Intelligence Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Correlating citizen feedback with open datasets from <strong>data.gov.in</strong>, <strong>ISRO Bhuvan</strong>, <strong>IMD Weather</strong>, <strong>WHO Health</strong>, and <strong>FAO Agriculture</strong> to surface municipal demand hotspots and advise policymakers.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("POLICY")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "POLICY"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Policy AI (MoHUA)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("METRICS")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "METRICS"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Open Datasets ({NATIONAL_OPEN_DATA_METRICS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("WARDS")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "WARDS"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>Ward Geospatial Risk</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Policy Recommendations */}
      {activeTab === "POLICY" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Generated using Gemini AI & National Multi-Dataset Correlation Engine
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              ● Active Synthesis
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {rec.id}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {rec.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      National Priority:
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                      {rec.priorityScore} / 100
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Analytical Justification:</strong> {rec.justification}
                </p>

                <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900 text-xs text-blue-950 dark:text-blue-200">
                  <span className="font-bold block mb-0.5">Mandated Action for Field Units:</span>
                  <span>{rec.actionRequired}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[11px]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-400 dark:text-slate-500 font-semibold">
                      Datasets Combined:
                    </span>
                    {rec.crossDatasets.map((ds, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {ds}
                      </span>
                    ))}
                  </div>

                  <span className="text-slate-500 dark:text-slate-400 font-semibold">
                    Fund: <strong className="text-slate-800 dark:text-white">{rec.budgetScheme}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Open Datasets Telemetry */}
      {activeTab === "METRICS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NATIONAL_OPEN_DATA_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(metric.source)}
                    <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {metric.source}
                    </span>
                  </div>
                  {getStatusBadge(metric.status)}
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {metric.datasetName}
                </h4>
                <div className="text-xl font-black text-slate-900 dark:text-white font-mono mt-2">
                  {metric.value}
                </div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">
                  {metric.indicator}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Citizen Grievance Impact:
                </span>
                <p className="line-clamp-2">{metric.correlation}</p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-2">
                  Telemetry: {metric.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Ward Geospatial Profiles */}
      {activeTab === "WARDS" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Ward</th>
                <th className="px-4 py-3">Location & City</th>
                <th className="px-4 py-3">Bhuvan Flood Risk</th>
                <th className="px-4 py-3">Impervious Surface</th>
                <th className="px-4 py-3">IMD Alert</th>
                <th className="px-4 py-3">WHO Water Risk</th>
                <th className="px-4 py-3">Pothole Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {WARD_PROFILES.map((w) => (
                <tr key={`${w.city}-${w.wardNumber}`} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">
                    Ward {w.wardNumber}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {w.wardName}, {w.city} ({w.state})
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        w.bhuvanFloodRisk === "Severe"
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                          : w.bhuvanFloodRisk === "High"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      }`}
                    >
                      {w.bhuvanFloodRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {w.bhuvanImperviousRatio}%
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-[11px]">
                      {w.imdMonsoonAlert}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className={w.whoWaterRiskScore > 7 ? "text-rose-600 dark:text-rose-400 font-bold" : ""}>
                      {w.whoWaterRiskScore} / 10
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold">
                    {w.potholeVulnerabilityIndex} / 100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
