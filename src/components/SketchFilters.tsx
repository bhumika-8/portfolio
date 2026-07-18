/**
 * Global SVG filters used to make things look hand-drawn.
 * We keep a single hidden SVG at the root so every component can just
 * apply `filter: url(#sketch-wobble)` to get wobbly, imperfect edges.
 */
export function SketchFilters() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter id="sketch-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
        <filter id="sketch-wobble-strong" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>
        <filter id="pencil-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.45 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
