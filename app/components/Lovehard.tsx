
export default function Lovehard() {
  return (
    <section className="sl-transition relative isolate min-h-75 w-full overflow-hidden bg-black">

        {/* Conteúdo */}
      <div className="relative z-7 flex items-center justify-center py-3">
        <img
          className="h-10 w-auto"
          src="/love%20hard/Love%20Hard.png"
          alt="Love Hard"
        />
      </div>


      {/* Vídeo de background */}
      <video
        className=""
        src="/Loops Pt3/Storm.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

    </section>
  );
}
