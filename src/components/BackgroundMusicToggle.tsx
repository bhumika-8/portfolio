import { useSound } from "./useSound";

export function BackgroundMusicToggle() {
  const { enabled, bgMusicEnabled, toggleBgMusic } = useSound();

  // Greyed out and non-interactive when master sound is off
  const inactive = !enabled;

  return (
    <button
      type="button"
      onClick={toggleBgMusic}
      disabled={inactive}
      aria-label={bgMusicEnabled ? "Turn background music off" : "Turn background music on"}
      title={
        inactive
          ? "Enable sounds first"
          : bgMusicEnabled
          ? "BG music ON — click to mute"
          : "BG music OFF — click to play"
      }
      className="fixed right-4 top-14 z-50 flex items-center gap-2 rounded-full bg-card/70 px-3 py-1.5 font-label text-sm text-foreground backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-40 transition-opacity"
      style={{ border: "1.5px solid var(--color-border)", filter: "url(#sketch-wobble)" }}
    >
      <span aria-hidden className="font-hand text-lg leading-none">
        {bgMusicEnabled ? "♫" : "♪"}
      </span>
      <span>{bgMusicEnabled ? "bg music on" : "bg music off"}</span>
    </button>
  );
}
