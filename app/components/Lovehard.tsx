
export default function Lovehard() {
  return (
    <section
      className="
        sl-transition relative isolate
        min-h-screen min-h-[100svh]
        w-full overflow-hidden bg-black
      "
    >
      {/* Vídeo de background */}
      <video
        className="
          absolute inset-0 z-0
          h-full w-full
          object-cover object-center
          pointer-events-none
        "
        src="/Loops%20Pt3/Storm.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Overlay cinematográfico */}
      <div
        className="
          absolute inset-0 z-[1]
          bg-black/30
          pointer-events-none
        "
        aria-hidden="true"
      />

      {/* Conteúdo centralizado */}
      <div
        className="
          relative z-10
          flex min-h-screen min-h-[100svh]
          w-full items-center justify-center
          px-4 py-6
        "
      >
        <img
          className="
            block h-auto
            w-[140px] max-w-full
            sm:w-[160px]
            md:w-[180px]
            lg:w-[200px]
            object-contain
          "
          src="/love%20hard/Love%20Hard.png"
          alt="Love Hard"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}