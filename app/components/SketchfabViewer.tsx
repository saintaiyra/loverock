export default function SketchfabViewer() {
  return (
    <section className="sl-transition w-full bg-[#8CFF00] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="relative w-full overflow-hidden">
          <div className="aspect-3/4 w-full">
            <iframe
              title="Saint-Sculpture"
              src="https://sketchfab.com/models/340bdc2085bf48e081c84bc5666405c7/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_hint=0&ui_theme=dark"
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}