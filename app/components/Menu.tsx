"use client";

import { useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import gsap from "gsap";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const menuItems = [
  {
    label: "Home",
    href: "/",
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/saintaiyra",
    external: true,
  },
  {
    label: "Sketchbook",
    href: "#sketchbook",
    external: false,
  },
  {
    label: "Music",
    href: "https://open.spotify.com/",
    external: true,
  },
  {
    label: "Contact",
    href: "https://wa.me/5517999999999",
    external: true,
  },
];

export default function Menu({
  isOpen,
  setIsOpen,
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);

  // Animação de abertura e fechamento
  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current;

    if (!menu || !links) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";

        gsap.set(menu, {
          pointerEvents: "auto",
        });

        gsap.to(menu, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.65,
          ease: "power4.inOut",
        });

        gsap.fromTo(
          links.children,
          {
            y: 35,
            opacity: 0,
          },
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
    }, menu);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fechar com a tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

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
      inert={!isOpen}
    >
      <p className="mb-8 text-xs uppercase tracking-[0.3em] text-black">
        Saint Lovers — Navigation
      </p>

      <nav
        ref={linksRef}
        className="flex flex-col items-start"
        aria-label="Navegação principal"
      >
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            target={
              item.external ? "_blank" : undefined
            }
            rel={
              item.external
                ? "noopener noreferrer"
                : undefined
            }
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
            className="
              text-5xl font-light tracking-tight text-black
              transition-opacity duration-200 hover:opacity-50
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