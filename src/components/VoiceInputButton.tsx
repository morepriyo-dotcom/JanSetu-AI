"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export function VoiceInputButton({ onTranscript, className = "" }: VoiceInputButtonProps) {
  const { currentLangMeta, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [interimText, setInterimText] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = currentLangMeta.speechCode;

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          onTranscript(finalTranscript);
          setInterimText("");
        } else if (interimTranscript) {
          setInterimText(interimTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        setInterimText("");
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimText("");
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("Speech recognition initialization failed:", e);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, [currentLangMeta.speechCode, onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(
        "Voice input is supported in Google Chrome, Microsoft Edge, and modern mobile browsers. Please type your grievance if mic access is restricted."
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimText("");
    } else {
      try {
        recognitionRef.current.lang = currentLangMeta.speechCode;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start voice recognition:", err);
      }
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={toggleListening}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
          isListening
            ? "bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/20"
            : "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60"
        }`}
        title={`Speak in ${currentLangMeta.nativeName} (${currentLangMeta.name})`}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 text-white animate-bounce" />
            <span>{t("stopListening")}</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>
              {t("voiceInput")} ({currentLangMeta.nativeName})
            </span>
          </>
        )}
      </button>

      {/* Floating listening feedback pill */}
      {isListening && (
        <div className="absolute left-0 -top-10 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] shadow-lg whitespace-nowrap animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>
            {interimText ? `"${interimText}"` : `${t("listening")} (${currentLangMeta.nativeName})`}
          </span>
        </div>
      )}
    </div>
  );
}
