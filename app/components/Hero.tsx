export default function Hero() {
  return (
    <section className="sl-transition relative isolate h-screen w-full overflow-hidden bg-[#8CFF00]">


      {/* Saint — lado esquerdo */}
      <img
        className="absolute left-[1%] top-1/2 z-20 h-auto w-[36%] -translate-y-1/2 object-contain"
        src="/hero png/Saint.png"
        alt="Saint"
      />

      {/* Aiyra — lado direito */}
      <img
        className="absolute right-[1%] top-1/2 z-30 h-auto w-[36%] -translate-y-1 object-contain"
        src="/hero png/Aiyra.png"
        alt="Aiyra"
      />

      {/* Retrato — centro */}
      <img
        className="
          absolute left-1/2 top-1/2 z-20
          h-[90%] w-auto max-w-none
          -translate-x-1/2 translate-y-[-42%]
          object-contain object-bottom
          max-sm:top-[30%]
          max-sm:h-[78%]
          max-sm:translate-y-[-5%]
        "
        src="/hero png/Face Cardpt3.png"
        alt="Retrato editorial com óculos espelhados"
      />

      {/* Texto poético — inferior esquerdo */}
      <img
        className="absolute bottom-[4%] left-[2%] z-40 h-auto w-[24%] object-contain"
        src="/hero png/clarice.png"
        alt="My strength lies in solitude"
      />

      {/* Localização — inferior direito */}
      <img
        className="absolute bottom-[4%] right-[1%] z-40 h-10 w-[10%] object-contain"
        src="/hero png/BURITAMA; SP.png"
        alt="Buritama, SP"
      />
    </section>
  );
}