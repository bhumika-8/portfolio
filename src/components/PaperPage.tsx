import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useSound } from "./useSound";

interface Props {
  /** unique per-section key so AnimatePresence can transition. */
  pageKey: string;
  children: ReactNode;
}

/**
 * Wraps a section in a full-page-flip animation. The page tilts on the
 * left binding, curls, and reveals the next page behind it.
 */
export function PaperPage({ pageKey, children }: Props) {
  const { play } = useSound();
  const playRef = useRef(play);
  const previousPageKey = useRef(pageKey);

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  useEffect(() => {
    if (previousPageKey.current !== pageKey) {
      playRef.current("pageFlip");
      previousPageKey.current = pageKey;
    }
  }, [pageKey]);

  return (
    <div className="page-3d relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          initial={{ rotateY: 95, opacity: 0.5, transformOrigin: "left center" }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -95, opacity: 0, transformOrigin: "left center" }}
          transition={{ duration: 0.75, ease: [0.7, 0, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          className="relative w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
