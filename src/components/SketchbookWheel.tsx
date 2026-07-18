import { motion, useAnimate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSound } from "./useSound";
import { RunningCat } from "./RunningCat";
import portfolio from "@/content/portfolio.json";

export type SectionKey =
  | "home"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "resume"
  | "contact";

interface Props {
  onSelect: (key: SectionKey) => void;
  size?: number;
}

interface SectorInfo {
  key: SectionKey;
  label: string;
  sublabel: string;
  startAngle: number;
  endAngle: number;
  color: string;
  icon: string;
  rot: number; // custom hand-drawn wobble angle for text
  iconColor: string;
}

const SECTOR_DATA: SectorInfo[] = [
  {
    key: "about",
    label: portfolio.wheel.about.label,
    sublabel: portfolio.wheel.about.sublabel,
    startAngle: -90,
    endAngle: -30,
    color: "var(--color-cream)",
    icon: "butterfly",
    rot: 12,
    iconColor: "var(--color-lavender)",
  },
  {
    key: "projects",
    label: portfolio.wheel.projects.label,
    sublabel: portfolio.wheel.projects.sublabel,
    startAngle: -30,
    endAngle: 30,
    color: "var(--color-sage)",
    icon: "star",
    rot: 1.5,
    iconColor: "var(--color-mustard)",
  },
  {
    key: "experience",
    label: portfolio.wheel.experience.label,
    sublabel: portfolio.wheel.experience.sublabel,
    startAngle: 30,
    endAngle: 90,
    color: "var(--color-dusty-blue)",
    icon: "mountains",
    rot: -12,
    iconColor: "var(--color-terracotta)",
  },
  {
    key: "skills",
    label: portfolio.wheel.skills.label,
    sublabel: portfolio.wheel.skills.sublabel,
    startAngle: 90,
    endAngle: 150,
    color: "var(--color-lavender)",
    icon: "fish",
    rot: 15,
    iconColor: "var(--color-sage)",
  },
  {
    key: "resume",
    label: portfolio.wheel.resume.label,
    sublabel: portfolio.wheel.resume.sublabel,
    startAngle: 150,
    endAngle: 210,
    color: "var(--color-peach)",
    icon: "paper",
    rot: -15,
    iconColor: "var(--color-terracotta)",
  },
  {
    key: "contact",
    label: portfolio.wheel.contact.label,
    sublabel: portfolio.wheel.contact.sublabel,
    startAngle: 210,
    endAngle: 270,
    color: "color-mix(in oklab, var(--color-mustard) 75%, var(--color-cream))",
    icon: "paw",
    rot: -8,
    iconColor: "var(--color-terracotta)",
  },
];

export function SketchbookWheel({ onSelect, size = 460 }: Props) {
  const [speed, setSpeed] = useState<"idle" | "hover" | "sprint">("idle");
  const [hoveredSector, setHoveredSector] = useState<SectionKey | null>(null);
  const [wheelRef, animate] = useAnimate();
  const rotationRef = useRef(0);
  const spinningRef = useRef(false);
  const { play } = useSound();

  // Responsive size handling (scales down beautifully on mobile)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentSize = windowWidth < 500 ? 350 : size;

  // Wheel parameters based on current responsive size
  const cx = currentSize / 2;
  const cy = currentSize / 2;
  const outerR = currentSize / 2 - 30;
  const innerR = currentSize === 350 ? 82 : 115;
  const rCenter = (innerR + outerR) / 2;

  // Continuous idle rotation loop (constant audio click removed)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (spinningRef.current) {
        last = now;
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = (now - last) / 1000;
      last = now;
      const dps = speed === "hover" ? 45 : 12; // degrees per second
      rotationRef.current = (rotationRef.current + dps * dt) % 360;
      if (wheelRef.current) {
        (wheelRef.current as HTMLElement).style.transform = `rotate(${rotationRef.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, wheelRef]);

  const handleSelect = useCallback(
    async (key: SectionKey) => {
      if (spinningRef.current) return;
      const idx = SECTOR_DATA.findIndex((s) => s.key === key);
      if (idx === -1) return;

      // Pointer lands at top (12 o'clock / -90 degrees).
      // Center of idx sector is at -60 + idx * 60.
      // To bring it to the top (-90 degrees), wheel rotation must be:
      // targetAngle = -30 - idx * 60
      const targetAngle = -30 - idx * 60;
      const currentAngle = rotationRef.current;
      
      const spins = 3;
      const normalizedTarget = ((targetAngle % 360) + 360) % 360;
      const normalizedCurrent = ((currentAngle % 360) + 360) % 360;
      let delta = normalizedTarget - normalizedCurrent;
      if (delta <= 0) delta += 360;
      const finalRotation = currentAngle + delta + spins * 360;

      spinningRef.current = true;
      setSpeed("sprint");
      play("wheel");

      await animate(
        wheelRef.current,
        { rotate: finalRotation },
        { duration: 2.0, ease: [0.2, 0.85, 0.3, 1.0] }
      );

      rotationRef.current = finalRotation;
      spinningRef.current = false;
      setSpeed("idle");
      setTimeout(() => onSelect(key), 180);
    },
    [animate, onSelect, play, wheelRef]
  );

  // Helper to generate sector SVG paths
  const getSectorPath = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1_outer = cx + outerR * Math.cos(startRad);
    const y1_outer = cy + outerR * Math.sin(startRad);
    const x2_outer = cx + outerR * Math.cos(endRad);
    const y2_outer = cy + outerR * Math.sin(endRad);

    const x1_inner = cx + innerR * Math.cos(startRad);
    const y1_inner = cy + innerR * Math.sin(startRad);
    const x2_inner = cx + innerR * Math.cos(endRad);
    const y2_inner = cy + innerR * Math.sin(endRad);

    return `
      M ${x1_inner} ${y1_inner}
      L ${x1_outer} ${y1_outer}
      A ${outerR} ${outerR} 0 0 1 ${x2_outer} ${y2_outer}
      L ${x2_inner} ${y2_inner}
      A ${innerR} ${innerR} 0 0 0 ${x1_inner} ${y1_inner}
      Z
    `.trim();
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "paw":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 1 3 3 3s3-1 3-3c0-1.66-1.34-3-3-3z" />
            <circle cx="7.5" cy="11.5" r="2.2" />
            <circle cx="10.5" cy="8.5" r="2.2" />
            <circle cx="13.5" cy="8.5" r="2.2" />
            <circle cx="16.5" cy="11.5" r="2.2" />
          </svg>
        );
      case "butterfly":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8c-1-3-4-3-5-1a3 3 0 0 0 1 4c1 1 3 0 4-3z" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 8c1-3 4-3 5-1a3 3 0 0 1-1 4c-1 1-3 0-4-3z" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 11c-1 3-4 2-4-1a3 3 0 0 1 3-2c1 1 1 3 1 3z" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 11c1 3 4 2 4-1a3 3 0 0 0-3-2c-1 1-1 3-1 3z" fill="currentColor" fillOpacity="0.2" />
            <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.2" />
            <path d="M11 6a3 3 0 0 0-2-2" />
            <path d="M13 6a3 3 0 0 1 2-2" />
          </svg>
        );
      case "star":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M12 2l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fillOpacity="0.35" />
          </svg>
        );
      case "mountains":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20L10 9l7 11" fill="currentColor" fillOpacity="0.2" />
            <path d="M11 20l5-7 5 7" fill="currentColor" fillOpacity="0.1" />
            <path d="M8 12l2-3 2 3" fill="white" stroke="currentColor" strokeWidth="1" />
            <path d="M14 15l2-3 2 3" fill="white" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
      case "fish":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s4-5 10-5 8 5 8 5-2 5-8 5-10-5-10-5z" fill="currentColor" fillOpacity="0.2" />
            <path d="M18 12l4-3v6z" fill="currentColor" fillOpacity="0.3" />
            <circle cx="6" cy="11" r="1.5" fill="currentColor" />
          </svg>
        );
      case "paper":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="3" width="14" height="18" rx="1.5" fill="currentColor" fillOpacity="0.2" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="13" y2="16" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: currentSize, height: currentSize }}
      onMouseEnter={() => !spinningRef.current && setSpeed("hover")}
      onMouseLeave={() => !spinningRef.current && setSpeed("idle")}
    >
      {/* Downward pointer at the top edge of the wheel indicates active section */}

      {/* Rotating wheel graphic (containing sectors, borders, labels and icons) */}
      <div
        ref={wheelRef as React.RefObject<HTMLDivElement>}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        {/* Draw the sectors in SVG */}
        <svg
          width={currentSize}
          height={currentSize}
          viewBox={`0 0 ${currentSize} ${currentSize}`}
          style={{ overflow: "visible" }}
        >
          <g style={{ filter: "url(#sketch-wobble)" }}>
            {/* Draw sector backgrounds */}
            {SECTOR_DATA.map((s) => {
              const isHovered = hoveredSector === s.key;
              return (
                <path
                  key={s.key}
                  d={getSectorPath(s.startAngle, s.endAngle)}
                  fill={isHovered ? `color-mix(in oklab, var(--color-ink) 7%, ${s.color})` : s.color}
                  stroke="var(--color-ink)"
                  strokeWidth="2.2"
                  onClick={() => handleSelect(s.key)}
                  onMouseEnter={() => {
                    if (!spinningRef.current) {
                      setHoveredSector(s.key);
                      setSpeed("hover");
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredSector(null);
                    setSpeed("idle");
                  }}
                  className="cursor-pointer transition-all duration-150"
                />
              );
            })}

            {/* Continuous outer circle border */}
            <circle
              cx={cx}
              cy={cy}
              r={outerR}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="2.5"
              className="pointer-events-none"
            />

            {/* Continuous inner circle border (defines center cat area) */}
            <circle
              cx={cx}
              cy={cy}
              r={innerR}
              fill="var(--color-paper)"
              stroke="var(--color-ink)"
              strokeWidth="2.5"
              className="pointer-events-none"
            />
          </g>
        </svg>

        {/* Labels and icons inside the sectors (rotate with parent div) */}
        {SECTOR_DATA.map((s) => {
          const midAngle = (s.startAngle + s.endAngle) / 2;
          const rad = (midAngle * Math.PI) / 180;
          const x = cx + rCenter * Math.cos(rad);
          const y = cy + rCenter * Math.sin(rad);

          return (
            <div
              key={s.key}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
                width: currentSize === 350 ? 80 : 100,
                textAlign: "center",
                pointerEvents: "none",
              }}
              className="flex flex-col items-center justify-center font-hand select-none text-foreground"
            >
              <span
                className="font-bold leading-tight"
                style={{
                  fontSize: currentSize === 350 ? "1.05rem" : "1.25rem",
                  textShadow: "0.5px 0.5px 0px var(--color-paper)"
                }}
              >
                {s.label}
              </span>
              <span
                className="opacity-80 font-marker leading-none mt-0.5"
                style={{ fontSize: currentSize === 350 ? "0.65rem" : "0.75rem" }}
              >
                {s.sublabel}
              </span>
              <div
                className="mt-1 flex items-center justify-center"
                style={{
                  color: s.iconColor,
                  transform: currentSize === 350 ? "scale(0.8)" : "none"
                }}
              >
                {renderIcon(s.icon)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Downward triangle pointer at the top edge of the wheel */}
      <div
        style={{
          position: "absolute",
          top: currentSize === 350 ? 20 : 18,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ filter: "url(#sketch-wobble)" }}>
          <path
            d="M 4 2 L 20 2 L 12 18 Z"
            fill="var(--color-terracotta)"
            stroke="var(--color-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Cat positioned so paws rest on the inner ring bottom */}
      <div
        style={{
          position: "absolute",
          left: cx - (currentSize === 350 ? 60 : 80),
          top: cy + innerR - (currentSize === 350 ? 86 : 98),
          width: currentSize === 350 ? 120 : 160,
          height: currentSize === 350 ? 86 : 115,
          pointerEvents: "none",
          zIndex: 6,
        }}
      >
        <RunningCat speed={speed} />
      </div>

    </div>
  );
}
