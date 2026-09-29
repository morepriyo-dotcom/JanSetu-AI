"use client";

import React, { useState, useEffect } from "react";
import {
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ExternalLink,
  Flame,
  HardDrive,
  Copy,
  Check,
} from "lucide-react";
import {
  getActiveFirebaseConfig,
  isConfigValid,
  testFirebaseConnection,
  saveFirebaseConfigClient,
  clearFirebaseConfigClient,
} from "@/lib/firebase";

interface FirebaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigured?: () => void;
}

export function FirebaseModal({ isOpen, onClose, onConfigured }: FirebaseModalProps) {
  const [config, setConfig] = useState(getActiveFirebaseConfig());
  const [pasteSnippet, setPasteSnippet] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    storageSuccess?: boolean;
    message: string;
  } | null>(null);
  const [copiedRules, setCopiedRules] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getActiveFirebaseConfig());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isCurrentConfigured = isConfigValid(config);

  // Parse pasted Firebase snippet
  const handleParseSnippet = (text: string) => {
    setPasteSnippet(text);
    try {
      const apiKeyMatch = text.match(/apiKey:\s*["']([^"']+)["']/);
      const authDomainMatch = text.match(/authDomain:\s*["']([^"']+)["']/);
      const projectIdMatch = text.match(/projectId:\s*["']([^"']+)["']/);
      const storageBucketMatch = text.match(/storageBucket:\s*["']([^"']+)["']/);
      const messagingSenderIdMatch = text.match(/messagingSenderId:\s*["']([^"']+)["']/);
      const appIdMatch = text.match(/appId:\s*["']([^"']+)["']/);

      if (apiKeyMatch || projectIdMatch) {
        const parsed = {
          apiKey: apiKeyMatch ? apiKeyMatch[1] : config.apiKey,
          authDomain: authDomainMatch ? authDomainMatch[1] : config.authDomain,
          projectId: projectIdMatch ? projectIdMatch[1] : config.projectId,
          storageBucket: storageBucketMatch ? storageBucketMatch[1] : config.storageBucket,
          messagingSenderId: messagingSenderIdMatch
            ? messagingSenderIdMatch[1]
            : config.messagingSenderId,
          appId: appIdMatch ? appIdMatch[1] : config.appId,
        };
        setConfig(parsed);
      }
    } catch (e) {
      console.warn("Could not parse snippet", e);
    }
  };

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    try {
      const res = await testFirebaseConnection(config);

      if (res.firestoreSuccess) {
        // Save to client
        saveFirebaseConfigClient(config);

        // Also persist to server .env.local via API
        try {
          await fetch("/api/config/firebase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(config),
          });
        } catch (serverErr) {
          console.warn("Server .env.local save note:", serverErr);
        }

        setTestResult({
          success: true,
          storageSuccess: res.storageSuccess,
          message: `Successfully connected to Firebase Project: ${config.projectId}! Cloud Firestore is online. ${
            res.storageSuccess
              ? "Firebase Storage is also active for photos."
              : "Storage notice: Check Firebase Storage rules if photo uploads are restricted."
          }`,
        });

        if (onConfigured) {
          onConfigured();
        }
      } else {
        setTestResult({
          success: false,
          message: res.error || "Could not connect to Firebase Firestore. Check project ID and rules.",
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || "Connection failed. Please check network and permissions.",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleDisconnect = () => {
    clearFirebaseConfigClient();
    setConfig({});
    setTestResult({
      success: true,
      message: "Reset to Zero-Config Local Persistence Mode.",
    });
    if (onConfigured) onConfigured();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Flame className="w-6 h-6 fill-amber-500 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Firebase Database & Storage Connect
              </h2>
              <p className="text-xs text-slate-500">
                Connect Cloud Firestore database and Firebase Storage for real-time synchronization.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Pill */}
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between ${
            isCurrentConfigured
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isCurrentConfigured ? "bg-emerald-500 animate-pulse" : "bg-blue-500"
              }`}
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                {isCurrentConfigured ? "Cloud Firebase Connected" : "Local Demo Storage Active"}
              </p>
              <p className="text-xs opacity-80 mt-0.5">
                {isCurrentConfigured
                  ? `Active project: ${config.projectId} (Firestore & Storage enabled)`
                  : "Currently running with resilient zero-config demo store (seed complaints loaded)."}
              </p>
            </div>
          </div>

          {isCurrentConfigured && (
            <button
              onClick={handleDisconnect}
              className="text-xs font-semibold text-rose-700 hover:text-rose-800 underline"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
              testResult.success
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "bg-rose-50 border-rose-300 text-rose-800"
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{testResult.success ? "Success" : "Connection Notice"}</p>
              <p className="mt-0.5 leading-relaxed">{testResult.message}</p>
            </div>
          </div>
        )}

        {/* Configuration Form */}
        <form onSubmit={handleTestAndSave} className="space-y-4">
          {/* Quick Paste Field */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Option 1: Paste Firebase SDK Snippet (Instant Auto-Fill)
            </label>
            <textarea
              rows={3}
              value={pasteSnippet}
              onChange={(e) => handleParseSnippet(e.target.value)}
              placeholder={`Paste from Firebase Console -> Project Settings -> General -> SDK setup and configuration:
const firebaseConfig = {
  apiKey: "AIzaSy...",
  projectId: "jansetu-ai",
  ...
};`}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Or Edit Individual Fields
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Project ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={config.projectId || ""}
                onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                placeholder="e.g. jansetu-ai"
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                API Key <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={config.apiKey || ""}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-[11px]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Storage Bucket</label>
              <input
                type="text"
                value={config.storageBucket || ""}
                onChange={(e) => setConfig({ ...config, storageBucket: e.target.value })}
                placeholder="e.g. jansetu-ai.appspot.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Auth Domain</label>
              <input
                type="text"
                value={config.authDomain || ""}
                onChange={(e) => setConfig({ ...config, authDomain: e.target.value })}
                placeholder="e.g. jansetu-ai.firebaseapp.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Test & Save Button */}
          <div className="pt-2 flex items-center justify-between">
            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Firebase Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={testing || !config.projectId || !config.apiKey}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {testing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Testing Connection...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    <span>Connect & Test Firebase</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Firebase Rules Tip Accordion */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <p className="font-bold text-slate-800 flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-blue-600" />
            Firebase Security Rules for Hackathon / Testing Mode:
          </p>
          <p className="text-[11px] leading-relaxed">
            In Firebase Console, ensure <strong>Cloud Firestore</strong> and <strong>Firebase Storage</strong> allow read/write in test mode:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-900 text-amber-300 font-mono text-[11px] overflow-x-auto relative">
            <pre>{`// Firestore Rules:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
