
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const STORAGE_KEY = "saint-lovers-preloader-seen";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Verifica se o visitante já viu a introdução.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setVisible(false);
        return;
      }
    } catch {
      // Se o armazenamento estiver indisponível,
      // o preloader continua funcionando nesta visita.
    }

    setVisible(true);
  }, []);

  // Executa a animação somente quando o preloader aparece.
  useEffect(() => {
    if (!visible || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const progressBar = progressRef.current;
    const number = numberRef.current;

    const counter = { value: 0 };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set(overlay, { yPercent: 0, autoAlpha: 1 });

      const timeline = gsap.timeline({
        onComplete: () => {
          try {
            localStorage.setItem(STORAGE_KEY, "true");
          } catch {
            // Sem armazenamento, poderá aparecer novamente.
          }

          setVisible(false);
        },
      });

      timeline.to(counter, {
        value: 100,
        duration: reducedMotion ? 0.15 : 2.4,
        ease: "power2.inOut",
        onUpdate: () => {
          const value = Math.round(counter.value);

          setProgress(value);

          if (number) {
            number.textContent = String(value).padStart(2, "0");
          }

          if (progressBar) {
            progressBar.style.transform = `scaleX(${value / 100})`;
          }
        },
      });

      timeline.to(
        overlay,
        {
          yPercent: -100,
          duration: reducedMotion ? 0.1 : 0.85,
          ease: "power4.inOut",
        },
        "+=0.15"
      );
    }, overlay);

    return () => ctx.revert();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#080808] px-6 text-[#F4F0E9]"
      role="status"
      aria-label={`Carregando experiência Saint Lovers: ${progress}%`}
    >
      {/* Textura sutil de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #6B5236 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <span className="mb-7 text-[9px] uppercase tracking-[0.42em] text-[#B18A58] sm:text-[10px]">
          Independent Creative Studio
        </span>

        <h1 className="whitespace-nowrap text-center text-3xl font-light uppercase tracking-[0.16em] sm:text-5xl sm:tracking-[0.22em]">
          Saint Lovers
        </h1>

        <div className="mt-14 w-full">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8E8981] sm:text-[10px]">
              Initializing experience
            </span>

            <span className="font-mono text-sm tabular-nums text-[#B18A58]">
              <span ref={numberRef}>
                {String(progress).padStart(2, "0")}
              </span>
              <span>%</span>
            </span>
          </div>

          <div className="h-px w-full overflow-hidden bg-[#302A24]">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-[#B18A58]"
            />
          </div>
        </div>

        <span className="mt-6 text-[8px] uppercase tracking-[0.35em] text-[#77716A] sm:text-[9px]">
          Design · Sound · Culture
        </span>
      </div>

      <span className="absolute bottom-7 text-[8px] tracking-[0.3em] text-[#5F5A54]">
        SAINT LOVERS ©
      </span>
    </div>
  );
}
