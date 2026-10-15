
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = Array.from({ length: 10 }, (_, i) => i);

export default function LogoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;

    if (!track || !group) return;

    const animation = gsap.to(track, {
      x: () => -group.offsetWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="w-full overflow-hidden border-y border-white/10 bg-black py-5">
      <div
        ref={trackRef}
        className="flex w-max items-center"
      >
        {[0, 1].map((group, index) => (
          <div
            key={group}
            ref={index === 0 ? groupRef : undefined}
            aria-hidden={index === 1}
            className="flex shrink-0 items-center gap-2 pr-2"
          >
            {logos.map((logo) => (
              <img
                key={logo}
                src="/navbar icons/SL.png"
                alt={index === 0 ? "Saint Lovers" : ""}
                className="h-6 w-20 shrink-0 object-contain"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
