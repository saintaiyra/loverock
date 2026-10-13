"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "saint-lovers-preloader-seen-v3";
const PROGRESS_DURATION = 3500;
const EXIT_DURATION = 850;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const siteContent = document.getElementById("site-content");

    const revealSite = () => {
      siteContent?.classList.remove("invisible");
      siteContent?.classList.remove("opacity-0");
      siteContent?.removeAttribute("aria-hidden");
    };

    if (!overlay) {
      revealSite();
      setVisible(false);
      return;
    }

    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        revealSite();
        setVisible(false);
        return;
      }
    } catch {
      // Continue even when localStorage is unavailable.
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const duration = reducedMotion ? 150 : PROGRESS_DURATION;
    const startTime = performance.now();
    let frameId = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const animateProgress = (now: number) => {
      if (cancelled) return;

      const elapsed = now - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(animateProgress);
        return;
      }

      exitTimer = setTimeout(() => {
        if (cancelled) return;
        setExiting(true);

        finishTimer = setTimeout(() => {
          if (cancelled) return;

          try {
            localStorage.setItem(STORAGE_KEY, "true");
          } catch {
            // The intro still completes without storage.
          }

          revealSite();
          setVisible(false);
        }, reducedMotion ? 50 : EXIT_DURATION);
      }, reducedMotion ? 0 : 200);
    };

    frameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      if (exitTimer) clearTimeout(exitTimer);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label={`Carregando experiência Saint Lovers: ${progress}%`}
      className="fixed inset-0 z-2147483647 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#080808] px-6 text-[#8CFF00]"
      style={{
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: exiting
          ? `transform ${EXIT_DURATION}ms cubic-bezier(0.77, 0, 0.175, 1)`
          : "none",
        willChange: "transform",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #8CFF00 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <span className="mb-7 text-[9px] uppercase tracking-[0.42em] text-[#8CFF00] sm:text-[10px]">
          Independent Creative Studio
        </span>

        <h1 className="whitespace-nowrap text-center text-3xl font-light uppercase tracking-[0.16em] sm:text-5xl sm:tracking-[0.22em]">
          Saint Lovers
        </h1>

        <div className="mt-14 w-full">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8CFF00] sm:text-[10px]">
              Initializing experience
            </span>

            <span className="font-mono text-sm tabular-nums text-[#8CFF00]">
              {String(progress).padStart(2, "0")}%
            </span>
          </div>

          <div className="h-px w-full overflow-hidden bg-[#302A24]">
            <div
              className="h-full bg-[#8CFF00]"
              style={{
                width: `${progress}%`,
                transition: "width 35ms linear",
              }}
            />
          </div>
        </div>

        <span className="mt-6 text-[8px] uppercase tracking-[0.35em] text-[#8CFF00] sm:text-[9px]">
          Design · Sound · Culture
        </span>
      </div>

      <span className="absolute bottom-7 text-[8px] tracking-[0.3em] text-[#5F5A54]">
        SAINT LOVERS ©
      </span>
    </div>
  );
}
