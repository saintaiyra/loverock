
"use client";

import { useState } from "react";
import Image from "next/image";

export default function Sketchbook() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="sketchbook"
      className="sl-transition relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-6"
    >
      <div className="relative flex w-full max-w-4xl -translate-y-70 flex-col items-center justify-center">
        {/* Caderno fechado / aberto */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={
            isOpen ? "Fechar sketchbook" : "Abrir sketchbook"
          }
          aria-expanded={isOpen}
          
className="relative block w-[90%] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400">

          {/* Capa fechada */}
          <Image
            src="/sketchbook/sddpt2.png"
            alt="Capa do sketchbook Saint Lovers"
            width={1024}
            height={1536}
            priority
            draggable={false}
            className={`h-140 w-full object-contain transition-all duration-200 ease-in-out ${
              isOpen
                ? "pointer-events-none absolute inset-0 scale-95 opacity-0"
                : "relative scale-100 opacity-100"
            }`}
          />

          {/* Caderno aberto */}
          <Image
            src="/sketchbook/lovept2.png"
            alt="Sketchbook aberto com colagens, fotografias e poema"
            width={1536}
            height={1024}
            draggable={false}
            className={`h-auto w-full object-contain transition-all duration-500 ease-in-out ${
              isOpen
                ? "relative scale-100 opacity-100"
                : "pointer-events-none absolute inset-0 scale-95 opacity-0"
            }`}
          />
        </button>

        {/* Instrução */}
        <p className="mt-5 text-center text-xs uppercase tracking-[0.3em] text-white/60">
          {isOpen
            ? "Clique para fechar"
            : "Clique para abrir"}
        </p>
      </div>
    </section>
  );
}
