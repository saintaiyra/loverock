
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const videos = [
  { src: "/Loops%20Pt4/244.mp4", name: "244" },
  { src: "/Loops%20Pt4/Drift.mp4", name: "Drift" },
];

export default function Spirits() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let animation: gsap.core.Tween | undefined;

    const createCarousel = () => {
      animation?.kill();

      const cards = Array.from(track.children).slice(0, 3);

      const distance = cards.reduce(
        (total, card) =>
          total + (card as HTMLElement).getBoundingClientRect().width,
        0
      );

      if (!distance) return;

      gsap.set(track, { x: 0 });

      animation = gsap.to(track, {
        x: -distance,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    };

    createCarousel();

    const observer = new ResizeObserver(createCarousel);
    observer.observe(section);

    return () => {
      observer.disconnect();
      animation?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
    >
      <div
        ref={trackRef}
        className="flex w-full flex-nowrap gap-0"
      >
        {[...videos, ...videos].map((video, index) => (
          <div
            key={`${video.name}-${index}`}
            className="relative h-[55vh] w-screen shrink-0 overflow-hidden sm:h-[65vh] sm:w-1/2 lg:h-[75vh] lg:w-1/3"
          >
            <video
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={() =>
                console.error("Não foi possível carregar:", video.src)
              }
              className="absolute inset-0 block h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
