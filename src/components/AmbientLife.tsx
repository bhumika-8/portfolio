import { useEffect, useState } from "react";

/**
 * Little butterflies and doodles fluttering across the whole viewport.
 * Independent of section content — always alive.
 * Hidden when any element with class `hide-butterflies` exists in the DOM.
 */

interface Butterfly {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  color: string;
  scale: number;
}

const PALETTE = [
  "var(--color-lavender)",
  "var(--color-peach)",
  "var(--color-dusty-blue)",
  "var(--color-mustard)",
];

export function AmbientLife() {
  const [flies, setFlies] = useState<Butterfly[]>([]);
  const [hidden, setHidden] = useState(false);

  // Watch for hide-butterflies class on the page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      setHidden(!!document.querySelector(".hide-butterflies"));
    };
    check();

    const obs = new MutationObserver(check);
    obs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"], childList: true });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;
    let nextId = 0;

    const spawn = () => {
      if (!mounted) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const fromLeft = Math.random() > 0.5;
      const bf: Butterfly = {
        id: nextId++,
        startX: fromLeft ? -60 : w + 60,
        endX: fromLeft ? w + 60 : -60,
        startY: 80 + Math.random() * (h - 200),
        endY: 80 + Math.random() * (h - 200),
        duration: 14 + Math.random() * 10,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        scale: 0.7 + Math.random() * 0.6,
      };
      setFlies((f) => [...f, bf]);
      setTimeout(() => {
        setFlies((f) => f.filter((x) => x.id !== bf.id));
      }, bf.duration * 1000);
    };

    // stagger initial + interval spawn
    const t1 = setTimeout(spawn, 1200);
    const t2 = setTimeout(spawn, 5000);
    const interval = setInterval(spawn, 9000);

    return () => {
      mounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      data-ambient-butterflies
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        overflow: "hidden",
      }}
    >
      {flies.map((b) => (
        <FlyingButterfly key={b.id} b={b} />
      ))}
    </div>
  );
}

function FlyingButterfly({ b }: { b: Butterfly }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 30,
        transform: `translate(${b.startX}px, ${b.startY}px) scale(${b.scale})`,
        animation: `bf-${b.id} ${b.duration}s linear forwards`,
      }}
    >
      <style>{`
        @keyframes bf-${b.id} {
          0%   { transform: translate(${b.startX}px, ${b.startY}px) scale(${b.scale}); }
          25%  { transform: translate(${(b.startX + b.endX) / 2}px, ${b.startY - 80}px) scale(${b.scale}); }
          50%  { transform: translate(${(b.startX + b.endX) / 2 + 40}px, ${(b.startY + b.endY) / 2}px) scale(${b.scale}); }
          75%  { transform: translate(${(b.startX + b.endX) / 2 + 80}px, ${b.endY - 60}px) scale(${b.scale}); }
          100% { transform: translate(${b.endX}px, ${b.endY}px) scale(${b.scale}); }
        }
      `}</style>
      <svg viewBox="0 0 40 30" width="40" height="30">
        <g transform="translate(20 15)">
          <g className="wing-flap">
            <path
              d="M0 0 Q -12 -10 -16 -2 Q -14 8 -2 6 Z"
              fill={b.color}
              stroke="var(--color-ink)"
              strokeWidth="1"
              opacity="0.9"
            />
          </g>
          <g className="wing-flap-r">
            <path
              d="M0 0 Q 12 -10 16 -2 Q 14 8 2 6 Z"
              fill={b.color}
              stroke="var(--color-ink)"
              strokeWidth="1"
              opacity="0.9"
            />
          </g>
          <ellipse cx="0" cy="1" rx="1" ry="5" fill="var(--color-ink)" />
          <line x1="-1" y1="-4" x2="-3" y2="-8" stroke="var(--color-ink)" strokeWidth="0.8" />
          <line x1="1" y1="-4" x2="3" y2="-8" stroke="var(--color-ink)" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}
