
"use client";

import { useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import gsap from "gsap";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "GitHub", href: "#github" },
  { label: "Sketchbook", href: "#sketchbook" },
  { label: "Music", href: "#music" },
  { label: "Contact", href: "#contact" },
];

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current;

    if (!menu || !links) return;

    const animations = gsap.context(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";

        gsap.to(menu, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.65,
          ease: "power4.inOut",
          onStart: () => {
            if (menuRef.current) {
              menuRef.current.style.pointerEvents = "auto";
            }
          },
        });

        gsap.fromTo(
          links.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.09,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      } else {
        document.body.style.overflow = "";

        gsap.to(menu, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => {
            if (menuRef.current) {
              menuRef.current.style.pointerEvents = "none";
            }
          },
        });
      }
    });

    return () => {
      animations.revert();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="
        fixed inset-0 z-100
        flex flex-col justify-center
        bg-black/20
        backdrop-blur-xl
        px-8 md:px-20
      "
      style={{
        clipPath: "inset(0% 0% 100% 0%)",
        pointerEvents: "none",
      }}
      aria-hidden={!isOpen}
    >
      <p className="mb-8 text-xs uppercase tracking-[0.3em] text-black">
        Saint Lovers — Navigation
      </p>

      <nav ref={linksRef} className="flex flex-col items-start">
        {menuItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
            className="
              text-5xl font-light tracking-tight text-black
              transition-opacity hover:opacity-50
              sm:text-6xl md:text-8xl
            "
          >
            <span className="mr-4 align-top text-xs md:text-sm">
              0{index + 1}
            </span>
            {item.label}
          </a>
        ))}
      </nav>

      <p className="absolute bottom-8 left-8 text-xs uppercase tracking-widest text-black md:left-20">
        Saint Aiyra © 2026
      </p>
    </div>
  );
}
