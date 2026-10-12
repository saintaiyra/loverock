
"use client";

import { useState } from "react";

import SectionTransitions from "./components/SectionTransitions";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Lovehard from "./components/Lovehard";
import Sketchbook from "./components/Sketchbook";
import Spirits from "./components/Spirits";
import Music from "./components/Music";
import LogoCarousel from "./components/LogoCarousel";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative">
      {/* Navbar original com o PNG */}
      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Overlay com efeito de blur */}
      <Menu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Conteúdo e transições originais */}
      <SectionTransitions>
        <Hero />
        <Lovehard />
        <Sketchbook/>
        <LogoCarousel />
        <Spirits />
        <LogoCarousel />
        <Music />
        <LogoCarousel />
      </SectionTransitions>
    </main>
  );
}
