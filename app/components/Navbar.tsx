
"use client";

import Image from "next/image";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  return (
    <nav className="absolute top-0 left-0 z-110 flex w-full items-start justify-between px-2 py-2 md:px-2">
      {/* Logo — canto superior esquerdo */}
      <div>
        <img
          src="/navbar icons/Monograma Serifado SL Interligado 1.png"
          alt="Saint Aiyra"
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* Menu — canto superior direito */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        className="flex h-9 w-9 items-center justify-center"
      >
        <Image
          src="/navbar icons/Menu.png"
          alt=""
          width={32}
          height={32}
          priority
          className="h-8 w-8 object-contain"
        />
      </button>
    </nav>
  );
}