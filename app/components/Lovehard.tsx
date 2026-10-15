
export default function Lovehard() {
  return (
    <section
      className="
        sl-transition relative isolate
        min-h-screen
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
          absolute inset-0 z-1
          bg-black/30
          pointer-events-none
        "
        aria-hidden="true"
      />

      {/* Conteúdo centralizado */}
      <div
        className="
          relative z-10
          flex min-h-screen
          w-full items-center justify-center
          px-4 py-6
        "
      >
        <img
          className="
            block h-auto
            w-35 max-w-full
            sm:w-40
            md:w-45
            lg:w-50
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