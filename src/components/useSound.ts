import { createContext, useContext } from "react";

export type SoundName =
  | "pageFlip"
  | "meow"
  | "wheel"
  | "rustle"
  | "crumple"
  | "toggle"
  | "navClick"
  | "keyPress"
  | "tingle";

export interface SoundCtx {
  enabled: boolean;
  bgMusicEnabled: boolean;
  toggle: () => void;
  toggleBgMusic: () => void;
  play: (name: SoundName) => void;
  pauseBg: () => void;
  resumeBg: () => void;
}

export const Ctx = createContext<SoundCtx | null>(null);

export function useSound() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSound must be used inside SoundProvider");
  return v;
}
