import { useSound } from "./useSound";

export function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Mute all sketchbook sounds" : "Enable sketchbook sounds"}
      title={enabled ? "Sounds ON — click to mute" : "Sounds OFF — click to enable"}
      className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-card/70 px-3 py-1.5 font-label text-sm text-foreground backdrop-blur-sm transition-opacity"
      style={{
        border: "1.5px solid var(--color-border)",
        filter: "url(#sketch-wobble)",
        opacity: 1,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10 L4 14 L8 14 L13 18 L13 6 L8 10 Z" />
        {enabled ? (
          <>
            <path d="M16 9 Q 18 12 16 15" />
            <path d="M18.5 7 Q 22 12 18.5 17" />
          </>
        ) : (
          <>
            <line x1="16" y1="9" x2="21" y2="15" />
            <line x1="21" y1="9" x2="16" y2="15" />
          </>
        )}
      </svg>
      <span>{enabled ? "sounds on" : "sounds off"}</span>
    </button>
  );
}
