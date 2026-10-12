
"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionTransitionsProps = {
  children: ReactNode;
};

export default function SectionTransitions({
  children,
}: SectionTransitionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".sl-transition")
    );

    if (sections.length < 2) return;

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        // As seções posteriores ficam acima das anteriores.
        gsap.set(section, {
          position: "relative",
          zIndex: index + 1,
        });

        // A última seção não precisa cobrir outra.
        if (index === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
    }, container);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
