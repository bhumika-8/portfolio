import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Ctx, type SoundName } from "./useSound";

// ---------------------------------------------------------------------------
// Singleton background audio — lives on window so HMR doesn't create dupes
// ---------------------------------------------------------------------------
type AudioWindow = Window & {
  __sketchbookBg?: HTMLAudioElement;
};

function getBgAudio(): HTMLAudioElement {
  if (typeof window === "undefined") return null as unknown as HTMLAudioElement;
  const w = window as AudioWindow;
  if (!w.__sketchbookBg) {
    const a = new Audio("/background.mp3");
    a.loop = true;
    a.volume = 0.28;
    w.__sketchbookBg = a;
  }
  return w.__sketchbookBg;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function SoundProvider({ children }: { children: ReactNode }) {
  // ── state ──────────────────────────────────────────────────────────────
  const [enabled, setEnabled] = useState(false);
  const [bgMusicEnabled, setBgMusicEnabled] = useState(false);

  // Always-current refs so callbacks never capture stale closure values
  const enabledRef = useRef(false);
  const bgMusicRef = useRef(false);
  const bgPausedByPage = useRef(false); // skills page temporarily silences bg

  enabledRef.current = enabled;
  bgMusicRef.current = bgMusicEnabled;

  // ── audio elements ──────────────────────────────────────────────────────
  const toggleAudioRef = useRef<HTMLAudioElement | null>(null);
  const pageFlipRef = useRef<HTMLAudioElement | null>(null);
  const crumpleRef = useRef<HTMLAudioElement | null>(null);
  const wheelRef = useRef<HTMLAudioElement | null>(null);
  const meowRef = useRef<HTMLAudioElement | null>(null);
  const navClickRef = useRef<HTMLAudioElement | null>(null);
  const keyPressRef = useRef<HTMLAudioElement | null>(null);
  const tingleRef = useRef<HTMLAudioElement | null>(null);

  // timers
  const pageFlipTimer = useRef<number | null>(null);
  const crumpleTimer = useRef<number | null>(null);
  const wheelTimer = useRef<number | null>(null);

  // ── AudioContext (for future Web Audio use) ─────────────────────────────
  const ctxRef = useRef<AudioContext | null>(null);
  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  // ── Restore persisted preferences on first mount ────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const soundOn = window.localStorage.getItem("sketchbook-sound") === "on";
    const bgOn = window.localStorage.getItem("sketchbook-bg-music") === "on";
    setEnabled(soundOn);
    // bg music is only on if sounds are also on
    setBgMusicEnabled(soundOn && bgOn);
  }, []);

  // ── Drive the background audio based on state ───────────────────────────
  // We use a single effect keyed on both flags. The `bgPausedByPage` ref is
  // checked inside the handler (not as a dep) because it's a transient page
  // override; pauseBg/resumeBg call syncBg() directly.
  const syncBg = useCallback(() => {
    const audio = getBgAudio();
    if (!audio) return;
    const shouldPlay =
      enabledRef.current && bgMusicRef.current && !bgPausedByPage.current && !document.hidden;

    if (shouldPlay) {
      if (audio.paused) {
        audio.play().catch(() => {
          // Autoplay blocked – hook into next user gesture
          const unlock = () => {
            audio.play().catch(() => {});
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
            window.removeEventListener("touchstart", unlock);
          };
          window.addEventListener("pointerdown", unlock, { passive: true });
          window.addEventListener("keydown", unlock);
          window.addEventListener("touchstart", unlock, { passive: true });
        });
      }
    } else {
      if (!audio.paused) audio.pause();
    }
  }, []);

  // Run whenever enabled or bgMusicEnabled changes
  useEffect(() => {
    syncBg();
  }, [enabled, bgMusicEnabled, syncBg]);

  // Pause bg when tab is hidden
  useEffect(() => {
    const onVisibility = () => syncBg();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [syncBg]);

  // ── toggle — master sound switch ────────────────────────────────────────
  const toggle = useCallback(() => {
    const nextEnabled = !enabledRef.current;

    // Play the click sound (works regardless of enabled state for feedback)
    if (typeof window !== "undefined") {
      if (!toggleAudioRef.current) {
        toggleAudioRef.current = new Audio("/toggle.mp3");
        toggleAudioRef.current.volume = 0.7;
      }
      toggleAudioRef.current.currentTime = 0;
      toggleAudioRef.current.play().catch(() => {});
    }

    if (nextEnabled) {
      // Turning ON → restore sounds + auto-enable bg music
      ensureCtx();
      window.localStorage.setItem("sketchbook-sound", "on");
      window.localStorage.setItem("sketchbook-bg-music", "on");
      setEnabled(true);
      setBgMusicEnabled(true);
    } else {
      // Turning OFF → mute everything immediately, then update state
      const bg = getBgAudio();
      if (bg && !bg.paused) bg.pause();
      pageFlipRef.current?.pause();
      crumpleRef.current?.pause();
      wheelRef.current?.pause();
      meowRef.current?.pause();
      navClickRef.current?.pause();
      keyPressRef.current?.pause();
      tingleRef.current?.pause();

      window.localStorage.setItem("sketchbook-sound", "off");
      window.localStorage.setItem("sketchbook-bg-music", "off");
      setEnabled(false);
      setBgMusicEnabled(false);
    }
  }, [ensureCtx]);

  // ── toggleBgMusic — only works when sounds are on ──────────────────────
  const toggleBgMusic = useCallback(() => {
    if (!enabledRef.current) return; // guard: bg music requires sounds on

    // Play toggle click for feedback
    if (typeof window !== "undefined") {
      if (!toggleAudioRef.current) {
        toggleAudioRef.current = new Audio("/toggle.mp3");
        toggleAudioRef.current.volume = 0.7;
      }
      toggleAudioRef.current.currentTime = 0;
      toggleAudioRef.current.play().catch(() => {});
    }

    const nextBg = !bgMusicRef.current;
    window.localStorage.setItem("sketchbook-bg-music", nextBg ? "on" : "off");
    setBgMusicEnabled(nextBg);
    // syncBg will fire via the useEffect once state updates, but let's also
    // call it synchronously so the audio stops/starts with no delay
    bgMusicRef.current = nextBg; // pre-update ref so syncBg sees new value
    syncBg();
  }, [syncBg]);

  // ── pauseBg / resumeBg — used by skills page ────────────────────────────
  const pauseBg = useCallback(() => {
    bgPausedByPage.current = true;
    const bg = getBgAudio();
    if (bg && !bg.paused) bg.pause();
  }, []);

  const resumeBg = useCallback(() => {
    bgPausedByPage.current = false;
    syncBg();
  }, [syncBg]);

  // ── play — all other sound effects ─────────────────────────────────────
  const play = useCallback(
    (name: SoundName) => {
      if (!enabledRef.current && name !== "toggle") return;

      switch (name) {
        case "toggle":
          break; // played directly in toggle() / toggleBgMusic()

        case "navClick": {
          if (!navClickRef.current) {
            navClickRef.current = new Audio("/nav-click.mp3");
            navClickRef.current.volume = 0.7;
          }
          navClickRef.current.currentTime = 0;
          navClickRef.current.play().catch(() => {});
          break;
        }

        case "keyPress": {
          if (!keyPressRef.current) {
            keyPressRef.current = new Audio("/key-press.mp3");
            keyPressRef.current.volume = 0.38;
          }
          keyPressRef.current.currentTime = 0;
          keyPressRef.current.play().catch(() => {});
          break;
        }

        case "tingle": {
          if (!tingleRef.current) {
            tingleRef.current = new Audio("/tinkle.mp3");
            tingleRef.current.volume = 0.48;
          }
          tingleRef.current.currentTime = 0;
          tingleRef.current.play().catch(() => {});
          break;
        }

        case "pageFlip": {
          if (!pageFlipRef.current) {
            pageFlipRef.current = new Audio("/page-turn.mp3");
            pageFlipRef.current.volume = 0.55;
          }
          if (pageFlipTimer.current) window.clearTimeout(pageFlipTimer.current);
          pageFlipRef.current.currentTime = 0;
          pageFlipRef.current.play().catch(() => {});
          pageFlipTimer.current = window.setTimeout(() => pageFlipRef.current?.pause(), 850);
          break;
        }

        case "crumple": {
          if (!crumpleRef.current) {
            crumpleRef.current = new Audio("/crumple.mp3");
            crumpleRef.current.volume = 0.55;
          }
          if (crumpleTimer.current) window.clearTimeout(crumpleTimer.current);
          crumpleRef.current.currentTime = 0;
          crumpleRef.current.play().catch(() => {});
          crumpleTimer.current = window.setTimeout(() => crumpleRef.current?.pause(), 1500);
          break;
        }

        case "rustle": {
          if (!crumpleRef.current) {
            crumpleRef.current = new Audio("/crumple.mp3");
            crumpleRef.current.volume = 0.55;
          }
          if (crumpleTimer.current) window.clearTimeout(crumpleTimer.current);
          crumpleRef.current.currentTime = 0.2;
          crumpleRef.current.play().catch(() => {});
          crumpleTimer.current = window.setTimeout(() => crumpleRef.current?.pause(), 380);
          break;
        }

        case "wheel": {
          if (!wheelRef.current) {
            wheelRef.current = new Audio("/wheel-spin.mp3");
            wheelRef.current.volume = 0.55;
          }
          if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
          wheelRef.current.currentTime = 0;
          wheelRef.current.play().catch(() => {});
          wheelTimer.current = window.setTimeout(() => wheelRef.current?.pause(), 2000);
          break;
        }

        case "meow": {
          if (!meowRef.current) {
            meowRef.current = new Audio("/cat-meow.mp3");
            meowRef.current.volume = 0.75;
          }
          meowRef.current.currentTime = 0;
          meowRef.current.play().catch(() => {});
          break;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ensureCtx],
  );

  const value = useMemo(
    () => ({ enabled, bgMusicEnabled, toggle, toggleBgMusic, play, pauseBg, resumeBg }),
    [enabled, bgMusicEnabled, toggle, toggleBgMusic, play, pauseBg, resumeBg],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
