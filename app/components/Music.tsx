
export default function Music() {
  return (
    <section className="sl-transition relative w-full overflow-hidden bg-black px-6 py-20 text-white md:px-16">

      {/* Playlist Spotify */}

<iframe
  src="https://open.spotify.com/embed/playlist/0yLJ3yIhbWLcgJ0ajJpEJ3?theme=0"
  width="100%"
  height="600"
  style={{ borderRadius: "12px", border: 0 }}
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="eager"
  title="Love Hard Spotify Playlist"
/>


    </section>
  );
}
