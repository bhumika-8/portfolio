import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SketchBox, SketchArrow, SketchButton } from "./sketch-ui";
import { useSound } from "./useSound";
import portfolio from "@/content/portfolio.json";

/* =============================================================== */
/* HOME */
/* =============================================================== */
export function HomeSection({ wheel }: { wheel: React.ReactNode }) {
  return (
    <div className="home-clean mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 pt-12 relative overflow-hidden">
      {/* === TOP LEFT: Cat in window frame === */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{ top: "4%", left: "3%", zIndex: 2 }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          style={{ filter: "url(#sketch-wobble)" }}
        >
          <rect
            x="8"
            y="8"
            width="94"
            height="80"
            rx="4"
            fill="color-mix(in oklab, var(--color-paper) 80%, var(--color-cream))"
            stroke="var(--color-ink)"
            strokeWidth="2"
          />
          <line x1="55" y1="8" x2="55" y2="88" stroke="var(--color-ink)" strokeWidth="1.5" />
          <line x1="8" y1="48" x2="102" y2="48" stroke="var(--color-ink)" strokeWidth="1.5" />
          <rect
            x="4"
            y="86"
            width="102"
            height="7"
            rx="2"
            fill="var(--color-ink)"
            opacity="0.15"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="55"
            cy="62"
            rx="16"
            ry="14"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
          />
          <circle
            cx="55"
            cy="44"
            r="10"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
          />
          <polygon
            points="46,36 42,26 52,34"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <polygon
            points="64,36 68,26 58,34"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <circle cx="51" cy="43" r="1.2" fill="var(--color-ink)" />
          <circle cx="59" cy="43" r="1.2" fill="var(--color-ink)" />
          <path d="M 53 48 Q 55 50 57 48" stroke="var(--color-ink)" strokeWidth="0.9" fill="none" />
          <ellipse
            cx="46"
            cy="75"
            rx="6"
            ry="4"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <ellipse
            cx="64"
            cy="75"
            rx="6"
            ry="4"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
        </svg>
        <p
          className="font-marker text-xs mt-1 text-center opacity-60"
          style={{ color: "var(--color-ink)" }}
        >
          meow?
        </p>
      </div>

      {/* === TOP RIGHT: Cat climbing curtains === */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{ top: "2%", right: "2%", zIndex: 2 }}
      >
        <div style={{ position: "relative" }}>
          <svg
            width="120"
            height="180"
            viewBox="0 0 120 180"
            style={{ overflow: "visible", filter: "url(#sketch-wobble)" }}
          >
            <path
              d="M 30 0 Q 20 30 28 60 Q 18 90 26 120 Q 16 150 24 180"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M 50 0 Q 42 35 48 65 Q 38 95 46 125 Q 36 155 44 180"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 70 0 Q 62 30 68 60 Q 58 90 66 120 Q 56 150 64 180"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.25"
            />
            <line
              x1="10"
              y1="2"
              x2="110"
              y2="2"
              stroke="var(--color-ink)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="10" cy="2" r="4" fill="var(--color-ink)" opacity="0.6" />
            <circle cx="110" cy="2" r="4" fill="var(--color-ink)" opacity="0.6" />
            <circle
              cx="90"
              cy="45"
              r="14"
              fill="var(--color-cat)"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />
            <polygon
              points="82,32 76,18 88,30"
              fill="var(--color-cat)"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
            />
            <polygon
              points="98,32 104,18 92,30"
              fill="var(--color-cat)"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
            />
            <circle cx="85" cy="44" r="1.5" fill="var(--color-ink)" />
            <circle cx="95" cy="44" r="1.5" fill="var(--color-ink)" />
            <path d="M 88 50 Q 90 52 92 50" stroke="var(--color-ink)" strokeWidth="1" fill="none" />
            <ellipse
              cx="80"
              cy="30"
              rx="5"
              ry="3.5"
              fill="var(--color-cat)"
              stroke="var(--color-ink)"
              strokeWidth="1"
              transform="rotate(-30 80 30)"
            />
            <ellipse
              cx="102"
              cy="28"
              rx="5"
              ry="3.5"
              fill="var(--color-cat)"
              stroke="var(--color-ink)"
              strokeWidth="1"
              transform="rotate(20 102 28)"
            />
            <path
              d="M 90 58 Q 108 75 102 88 Q 96 98 88 92"
              stroke="var(--color-cat)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 90 58 Q 108 75 102 88 Q 96 98 88 92"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <p
            className="font-marker text-xs absolute opacity-60"
            style={{ top: 85, left: -35, color: "var(--color-ink)", transform: "rotate(-8deg)" }}
          >
            hold on!
          </p>
        </div>
      </div>

      {/* === LEFT: Sticky note — bugs features coffee repeat === */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="pointer-events-none absolute hidden md:block"
        style={{ top: "32%", left: "3%", zIndex: 2 }}
      >
        <div
          style={{
            background: "color-mix(in oklab, var(--color-cream) 95%, var(--color-paper))",
            border: "1.5px solid var(--color-ink)",
            padding: "12px 16px",
            width: 140,
            boxShadow: "2px 3px 6px color-mix(in oklab, var(--color-ink) 18%, transparent)",
            transform: "rotate(-3deg)",
            filter: "url(#sketch-wobble)",
          }}
        >
          <p className="font-marker text-sm leading-relaxed" style={{ color: "var(--color-ink)" }}>
            bugs:
            <br />
            features:
            <br />
            coffee:
            <br />
            repeat:
          </p>
        </div>
      </motion.div>

      {/* === LEFT: Coffee cup === */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-60 hidden md:block"
        style={{ top: "17%", left: "15%", zIndex: 2 }}
      >
        <svg width="40" height="50" viewBox="0 0 40 50" style={{ filter: "url(#sketch-wobble)" }}>
          <path
            d="M 4 16 Q 4 40 20 40 Q 36 40 36 16 Z"
            fill="var(--color-terracotta)"
            opacity="0.55"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
          />
          <path d="M 4 16 L 36 16" stroke="var(--color-ink)" strokeWidth="1.2" />
          <path
            d="M 36 22 Q 46 22 46 28 Q 46 35 36 35"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 8 14 Q 10 10 12 6"
            stroke="var(--color-ink)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 18 12 Q 20 8 22 12 Q 24 16 26 12"
            stroke="var(--color-ink)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <rect
            x="2"
            y="40"
            width="36"
            height="5"
            rx="1"
            fill="var(--color-ink)"
            opacity="0.2"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
        </svg>
        <p className="font-marker text-xs mt-0.5 opacity-70" style={{ color: "var(--color-ink)" }}>
          coffee
        </p>
      </div>

      {/* === LEFT: Paper plane === */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-55 hidden md:block"
        style={{ top: "56%", left: "8%", zIndex: 2 }}
      >
        <svg
          width="60"
          height="40"
          viewBox="0 0 60 40"
          style={{ filter: "url(#sketch-wobble)", transform: "rotate(-15deg)" }}
        >
          <path
            d="M 2 20 L 58 4 L 38 20 L 58 36 Z"
            fill="var(--color-dusty-blue)"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <line
            x1="2"
            y1="20"
            x2="38"
            y2="20"
            stroke="var(--color-ink)"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* === RIGHT: Sticky note — don't forget to have fun === */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
        className="pointer-events-none absolute hidden md:block"
        style={{ top: "30%", right: "3%", zIndex: 2 }}
      >
        <div
          style={{
            background: "color-mix(in oklab, var(--color-mustard) 40%, var(--color-cream))",
            border: "1.5px solid var(--color-ink)",
            padding: "12px 14px",
            width: 130,
            boxShadow: "2px 3px 6px color-mix(in oklab, var(--color-ink) 18%, transparent)",
            transform: "rotate(4deg)",
            filter: "url(#sketch-wobble)",
          }}
        >
          <p className="font-marker text-sm leading-relaxed" style={{ color: "var(--color-ink)" }}>
            don't forget
            <br />
            to have fun
          </p>
        </div>
      </motion.div>

      {/* === RIGHT MID: Sleeping cat with zzz === */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-70 hidden md:block"
        style={{ top: "54%", right: "5%", zIndex: 2 }}
      >
        <div style={{ position: "relative" }}>
          <p
            className="font-marker text-sm absolute opacity-70"
            style={{ top: -14, right: 0, color: "var(--color-ink)" }}
          >
            zzz zzz zzz
          </p>
          <svg width="90" height="55" viewBox="0 0 90 55" style={{ filter: "url(#sketch-wobble)" }}>
            <ellipse
              cx="45"
              cy="40"
              rx="32"
              ry="15"
              fill="var(--color-paper-shade)"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />
            <circle
              cx="20"
              cy="30"
              r="13"
              fill="var(--color-paper-shade)"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />
            <polygon
              points="14,19 10,10 19,18"
              fill="var(--color-paper-shade)"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
            />
            <polygon
              points="26,19 30,10 21,18"
              fill="var(--color-paper-shade)"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
            />
            <path
              d="M 15 30 Q 18 28 21 30"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 19 30 Q 22 28 25 30"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 76 40 Q 86 30 82 22 Q 78 15 72 20"
              stroke="var(--color-ink)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* === BOTTOM RIGHT: Black cat peeking from box === */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{ bottom: "4%", right: "3%", zIndex: 2 }}
      >
        <svg
          width="115"
          height="100"
          viewBox="0 0 115 100"
          style={{ filter: "url(#sketch-wobble)" }}
        >
          <rect
            x="5"
            y="48"
            width="105"
            height="52"
            rx="3"
            fill="color-mix(in oklab, var(--color-mustard) 35%, var(--color-cream))"
            stroke="var(--color-ink)"
            strokeWidth="2"
          />
          <path
            d="M 5 48 L 20 20 L 55 38 L 5 48"
            fill="color-mix(in oklab, var(--color-mustard) 25%, var(--color-cream))"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
          />
          <path
            d="M 110 48 L 95 20 L 60 38 L 110 48"
            fill="color-mix(in oklab, var(--color-mustard) 25%, var(--color-cream))"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="57"
            cy="55"
            rx="22"
            ry="12"
            fill="#1a1a1a"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <circle
            cx="57"
            cy="42"
            r="14"
            fill="#1a1a1a"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
          />
          <polygon
            points="48,30 43,19 54,29"
            fill="#1a1a1a"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <polygon
            points="66,30 71,19 60,29"
            fill="#1a1a1a"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <ellipse
            cx="50"
            cy="41"
            rx="4.5"
            ry="5.5"
            fill="#ffd700"
            stroke="var(--color-ink)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="64"
            cy="41"
            rx="4.5"
            ry="5.5"
            fill="#ffd700"
            stroke="var(--color-ink)"
            strokeWidth="0.8"
          />
          <ellipse cx="50" cy="42" rx="2" ry="4.5" fill="#111" />
          <ellipse cx="64" cy="42" rx="2" ry="4.5" fill="#111" />
        </svg>
        <p
          className="font-marker text-xs text-center mt-0.5 opacity-60"
          style={{ color: "var(--color-ink)" }}
        >
          important
          <br />
          stuff (maybe)
        </p>
      </div>

      {/* === BOTTOM LEFT: psst... explore around === */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-55 hidden md:block"
        style={{ bottom: "10%", left: "12%", zIndex: 2, transform: "rotate(-3deg)" }}
      >
        <p className="font-marker text-sm" style={{ color: "var(--color-ink)" }}>
          psst... explore around
        </p>
      </div>

      {/* === Scattered doodles === */}
      <DoodleHeart style={{ top: "10%", left: "30%" }} rot={-10} />
      <DoodleHeart style={{ top: "70%", right: "22%" }} rot={15} />
      <DoodleStar style={{ top: "20%", left: "42%" }} rot={20} fill="var(--color-mustard)" />
      <DoodleStar style={{ bottom: "22%", left: "32%" }} rot={-15} fill="var(--color-peach)" />
      <DoodleStar style={{ top: "38%", right: "18%" }} rot={35} fill="var(--color-lavender)" />
      <DoodleSun style={{ top: "5%", left: "50%" }} rot={10} />
      <DoodleMoon style={{ top: "62%", left: "5%" }} rot={-8} />
      <DoodleSmiley style={{ top: "76%", right: "28%" }} rot={-12} />
      <TinyDoodleFlower style={{ top: "30%", left: "22%" }} rot={-18} />
      <TinyDoodleFlower style={{ top: "18%", right: "20%" }} rot={12} />
      <TinyDoodleFlower style={{ bottom: "20%", left: "44%" }} rot={25} />
      <TinyDoodleFlower style={{ top: "48%", right: "28%" }} rot={-6} />
      <HiddenCat style={{ bottom: "6%", left: "10%" }} />

      {/* tiny floating stars */}
      {[
        [12, 8],
        [60, 12],
        [80, 8],
        [25, 18],
        [70, 20],
        [5, 38],
        [90, 35],
        [15, 65],
        [85, 62],
        [40, 78],
        [55, 82],
      ].map(([l, t], i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute opacity-35"
          style={{
            left: `${l}%`,
            top: `${t}%`,
            fontSize: 10,
            color: "var(--color-ink)",
            transform: `rotate(${((i * 37) % 60) - 30}deg)`,
          }}
        >
          ✦
        </div>
      ))}

      <HomeDoodles />

      {/* === CENTER: title + wheel === */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-center relative z-10"
      >
        <p className="font-marker text-sm text-muted-foreground">{portfolio.home.eyebrow}</p>
        <h1 className="mt-1 font-hand text-6xl leading-none md:text-8xl">
          {portfolio.home.greeting}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{portfolio.home.name}</span>
            <span
              aria-hidden
              className="absolute -bottom-2 left-0 right-0 h-3"
              style={{
                background:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 12' preserveAspectRatio='none'><path d='M2 8 Q 80 2 150 6 T 298 5' stroke='%23c96b3f' stroke-width='4' fill='none' stroke-linecap='round' opacity='0.7'/></svg>\") no-repeat",
                backgroundSize: "100% 100%",
              }}
            />
          </span>
        </h1>
        <p className="mt-4 font-marker text-sm text-ink-soft">{portfolio.home.subtext}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10"
      >
        {wheel}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[calc(100%+18px)] top-20 hidden w-44 -rotate-3 md:block"
        >
          <p className="text-center font-hand text-2xl text-ink-soft">click on a section</p>
          <svg
            width="170"
            height="90"
            viewBox="0 0 170 90"
            fill="none"
            className="mt-1 text-ink-soft"
          >
            <path
              d="M158 9 C127 3 119 34 91 35 C58 36 55 69 18 68"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
            <path
              d="M30 58 L16 68 L31 76"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] w-44 -translate-x-1/2 text-center md:hidden"
        >
          <svg
            width="70"
            height="48"
            viewBox="0 0 70 48"
            fill="none"
            className="mx-auto text-ink-soft"
          >
            <path
              d="M58 42 C35 42 22 30 29 9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
            <path
              d="M20 17 L29 7 L36 19"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-hand text-xl text-ink-soft">click on a section</p>
        </div>
      </motion.div>
    </div>
  );
}

function HomeDoodles() {
  return (
    <div
      aria-hidden
      className="home-background-art pointer-events-none absolute inset-0 z-[1] overflow-hidden text-ink-soft"
    >
      <DoodleHeart style={{ top: "13%", left: "22%" }} rot={-10} />
      <DoodleHeart style={{ top: "39%", right: "11%" }} rot={12} />
      <DoodleHeart style={{ bottom: "17%", left: "20%" }} rot={-8} />
      <DoodleHeart style={{ top: "61%", right: "20%" }} rot={8} />
      <DoodleStar style={{ top: "14%", right: "24%" }} rot={12} fill="var(--color-mustard)" />
      <DoodleStar style={{ top: "50%", left: "21%" }} rot={-10} fill="var(--color-lavender)" />
      <DoodleStar style={{ bottom: "17%", right: "8%" }} rot={18} fill="var(--color-dusty-blue)" />
      <DoodleSmiley style={{ top: "40%", left: "26%" }} rot={-8} />
      <DoodleSmiley style={{ bottom: "8%", left: "27%" }} rot={5} />
      <DoodleSmiley style={{ bottom: "12%", right: "27%" }} rot={-5} />
      <TinyDoodleFlower style={{ top: "39%", right: "24%" }} rot={10} />
      <TinyDoodleFlower style={{ bottom: "5%", right: "16%" }} rot={-12} />
      <MiniCatDoodle style={{ top: "18%", right: "15%" }} />
      <MiniCatDoodle style={{ top: "59%", right: "7%" }} />
      <MiniCatDoodle style={{ top: "62%", left: "9%" }} />
      <div className="absolute left-[9%] top-[38%] h-20 w-24 -rotate-12 opacity-60">
        <svg
          viewBox="0 0 100 80"
          className="h-full w-full"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M8 68 C24 69 25 55 37 55 C49 55 42 38 57 36"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path d="M54 35 L88 18 L69 47 L63 34 Z" strokeWidth="1.5" />
          <path d="M63 34 L88 18" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute right-[7%] top-[29%] text-lg opacity-55">✧</div>
      <div className="absolute left-[14%] top-[24%] text-lg opacity-55">✧</div>
      <div className="absolute right-[5%] top-[16%] text-base opacity-50">☆</div>
      <div className="absolute left-[7%] bottom-[31%] text-sm opacity-50">♡</div>
    </div>
  );
}

function MiniCatDoodle({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute opacity-55" style={style}>
      <svg
        width="32"
        height="30"
        viewBox="0 0 32 30"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <path d="M7 11 L6 3 L13 8 Q16 6 19 8 L26 3 L25 12 Q28 17 25 22 Q21 27 16 27 Q9 27 6 22 Q3 17 7 11 Z" />
        <circle cx="12" cy="16" r="1" fill="var(--color-ink)" />
        <circle cx="20" cy="16" r="1" fill="var(--color-ink)" />
        <path d="M14 20 Q16 22 18 20 M5 18 L1 17 M6 21 L2 23 M26 18 L31 17 M25 21 L30 23" />
      </svg>
    </div>
  );
}
/* =============================================================== */
/* ABOUT — brainstorm doodle page */
/* =============================================================== */
export function AboutSection() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-16">
      <SectionHeading label={portfolio.about.title} note={portfolio.about.subtitle} rotation={-2} />

      <div className="relative mt-10 grid gap-8 md:grid-cols-2">
        <StickyNote color="var(--color-mustard)" rotation={-3} style={{ minHeight: 200 }}>
          <p className="font-marker text-base">{portfolio.about.intro}</p>
        </StickyNote>

        <SketchBox fill="var(--color-sage)" rotation={1.5} className="p-6">
          <h3 className="mb-3 text-center font-hand text-3xl">{portfolio.about.likesTitle}</h3>
          <ul className="font-marker space-y-1 pl-5 pr-3">
            {portfolio.about.likes.map((item) => (
              <li key={item}>→ {item}</li>
            ))}
          </ul>
        </SketchBox>

        <SketchBox fill="var(--color-dusty-blue)" rotation={-1} className="p-6">
          <h3 className="mb-3 text-center font-hand text-3xl">{portfolio.about.stackTitle}</h3>
          <p className="font-marker">{portfolio.about.stack}</p>
        </SketchBox>

        <StickyNote color="var(--color-peach)" rotation={2.5}>
          <p className="font-marker">{portfolio.about.current}</p>
          <SketchArrow rotate={20} width={60} className="mt-2" />
          <span className="font-hand text-lg">{portfolio.about.currentCaption}</span>
        </StickyNote>
      </div>

      {/* Doodled arrows connecting things */}
      <SketchArrow
        rotate={110}
        className="pointer-events-none absolute right-4 top-40 hidden md:block"
      />
      <TinyDoodleFlower style={{ top: 8, right: 40 }} rot={12} />
      <HiddenCat style={{ bottom: 20, right: 20 }} />
    </div>
  );
}

/* =============================================================== */
/* PROJECTS — pastel boxes + crumpled paper modal */
/* =============================================================== */
const PROJECTS = portfolio.projects;
const PROJECT_COLORS = [
  "var(--color-terracotta)",
  "var(--color-sage)",
  "var(--color-dusty-blue)",
  "var(--color-lavender)",
];

const PROJECT_PILE = [
  { x: 0, y: 115, rotate: 0, z: 12 },
  { x: 255, y: 42, rotate: 5, z: 9 },
  { x: -255, y: 38, rotate: -5, z: 8 },
  { x: -405, y: 175, rotate: -8, z: 6 },
  { x: 405, y: 172, rotate: 8, z: 5 },
];

export function ProjectsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative mx-auto min-h-[820px] max-w-7xl overflow-hidden px-6 py-14">
      <div className="relative z-30 text-center">
        <SectionHeading
          label={portfolio.projectsSection.title}
          note={portfolio.projectsSection.subtitle}
          rotation={-1}
        />
        <p className="mt-3 max-w-48 font-hand text-xl text-ink-soft">
          a pile of things I built, each with a story.
        </p>
      </div>

      <div
        className="relative mx-auto mt-8 max-w-6xl flex flex-col md:block items-center gap-10 md:gap-0"
        style={{ height: isMobile ? "auto" : "650px" }}
      >
        {PROJECTS.map((project, i) => {
          const pile = PROJECT_PILE[i % PROJECT_PILE.length];
          return (
            <motion.button
              key={project.title}
              initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: pile.y + 25 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: pile.y }}
              transition={{ delay: i * 0.09 }}
              whileHover={
                isMobile
                  ? { y: -8, scale: 1.02, zIndex: 40 }
                  : { y: pile.y - 28, scale: 1.035, rotate: 0, zIndex: 40 }
              }
              onMouseEnter={() => play("tingle")}
              onClick={() => setOpenIdx(i)}
              className="relative md:absolute left-auto md:left-1/2 top-auto md:top-0 h-[350px] w-[min(82vw,375px)] md:-translate-x-1/2 p-8 text-left shadow-xl md:p-10"
              style={{
                marginLeft: isMobile ? 0 : pile.x,
                rotate: isMobile ? `${i % 2 ? 1.5 : -1.5}deg` : `${pile.rotate}deg`,
                zIndex: isMobile ? 10 : pile.z,
                background: `color-mix(in oklab, ${PROJECT_COLORS[i % PROJECT_COLORS.length]} 23%, var(--color-cream))`,
                clipPath:
                  "polygon(1% 2%, 18% 0, 38% 2%, 57% 0, 77% 2%, 99% 1%, 100% 25%, 99% 51%, 100% 76%, 98% 99%, 75% 98%, 51% 100%, 27% 98%, 1% 100%, 2% 74%, 0 49%, 2% 25%)",
              }}
            >
              <span
                className="tape absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2"
                style={{ background: i % 2 ? "var(--color-dusty-blue)" : "var(--color-mustard)" }}
              />
              <p className="font-hand text-2xl underline decoration-terracotta/60 underline-offset-4">
                {String(i + 1).padStart(2, "0")}.
              </p>
              <h3 className="mt-4 text-center font-hand text-5xl">{project.title}</h3>
              <p className="mx-auto mt-5 max-w-sm font-marker text-base leading-relaxed">
                {project.blurb}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tape px-2 py-1 font-marker text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="absolute bottom-6 right-8 font-hand text-sm text-ink-soft">
                click to view →
              </p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <ProjectModal project={PROJECTS[openIdx]} onClose={() => setOpenIdx(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
function ProjectModal({
  project,
  onClose,
}: {
  project: { title: string; long: string; tech: string[]; liveUrl?: string; sourceUrl?: string };
  onClose: () => void;
}) {
  const { play } = useSound();
  const detailLines = project.long
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const hasBulletPoints =
    detailLines.length > 1 && detailLines.every((line) => line.startsWith("-"));

  useEffect(() => {
    play("crumple");
  }, [play]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={() => {
        play("rustle");
        onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 60, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl z-10 sm:rounded-none"
        style={{ maxHeight: "92dvh" }}
      >
        <SketchBox
          fill="var(--color-paper)"
          className="p-5 sm:p-8 opacity-100 overflow-y-auto"
          style={{
            background: "var(--color-paper)",
            opacity: 1,
            boxShadow: "0 -4px 40px color-mix(in oklab, var(--color-ink) 35%, transparent)",
            backdropFilter: "none",
            maxHeight: "92dvh",
            borderRadius: "16px 16px 0 0",
          }}
        >
          {/* crumple lines */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
            preserveAspectRatio="none"
          >
            <path
              d="M 20 10 L 80 40 M 200 20 L 260 90 M 40 200 L 120 260 M 300 180 L 380 240"
              stroke="var(--color-ink)"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
          {/* drag handle on mobile */}
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/20 sm:hidden" />
          <span className="tape hidden sm:block -top-3 left-1/2 -translate-x-1/2" />
          <button
            onClick={onClose}
            aria-label="close"
            className="absolute right-4 top-4 font-hand text-2xl"
          >
            ✕
          </button>
          <h3 className="font-hand text-4xl sm:text-5xl pr-8">{project.title}</h3>
          {hasBulletPoints ? (
            <ul className="mt-4 space-y-2 font-marker text-base leading-relaxed sm:text-lg">
              {detailLines.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span aria-hidden className="shrink-0">
                    -
                  </span>
                  <span>{line.replace(/^\-\s*/, "")}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 font-marker text-base leading-relaxed sm:text-lg">{project.long}</p>
          )}

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <Polaroid key={i} rot={[-4, 3, -2][i]} label={`shot ${i + 1}`} tint={i} />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="tech-tape font-marker px-3 py-1 text-sm"
                style={{
                  border: "1.5px solid var(--color-ink)",
                  background: "color-mix(in oklab, var(--color-mustard) 30%, transparent)",
                  filter: "url(#sketch-wobble)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.sourceUrl) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  <SketchButton fill="var(--color-sage)">
                    {portfolio.projectsSection.liveDemoLabel}
                  </SketchButton>
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                  <SketchButton fill="var(--color-dusty-blue)">
                    {portfolio.projectsSection.sourceLabel}
                  </SketchButton>
                </a>
              )}
            </div>
          )}

          <div className="mt-4 pb-safe" />
        </SketchBox>
      </motion.div>
    </motion.div>
  );
}

function Polaroid({ rot, label, tint }: { rot: number; label: string; tint: number }) {
  const tints = ["var(--color-peach)", "var(--color-sage)", "var(--color-dusty-blue)"];
  return (
    <div className="relative" style={{ transform: `rotate(${rot}deg)` }}>
      <div
        className="p-2"
        style={{
          background: "var(--color-cream)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 6px color-mix(in oklab, var(--color-ink) 15%, transparent)",
        }}
      >
        <div
          className="aspect-square"
          style={{
            background: `linear-gradient(135deg, ${tints[tint]}, color-mix(in oklab, ${tints[tint]} 40%, var(--color-cream)))`,
          }}
        >
          {/* doodled placeholder image */}
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            style={{ filter: "url(#sketch-wobble)" }}
          >
            <circle
              cx="70"
              cy="30"
              r="8"
              fill="var(--color-mustard)"
              stroke="var(--color-ink)"
              strokeWidth="1"
            />
            <path
              d="M 5 80 Q 25 55 45 70 T 95 60 L 95 100 L 5 100 Z"
              fill="var(--color-ink)"
              opacity="0.2"
            />
            <path
              d="M 20 85 L 22 60 L 30 82"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 55 82 L 60 55 L 68 85"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>
        <p className="font-hand mt-1 text-center text-sm">{label}</p>
      </div>
      <span className="tape -top-2 left-1/2 -translate-x-1/2" style={{ width: 50, height: 16 }} />
    </div>
  );
}

/* =============================================================== */
/* EXPERIENCE — single internship scrapbook */
/* =============================================================== */
const SCRAP_COLORS = [
  "var(--color-lavender)",
  "var(--color-dusty-blue)",
  "var(--color-mustard)",
  "var(--color-peach)",
];

export function ExperienceSection() {
  const internship = portfolio.experience;
  const [openProject, setOpenProject] = useState<number | null>(null);
  const { play } = useSound();

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mx-auto mb-7 text-center">
        <h2 className="font-hand text-5xl md:text-6xl">{portfolio.experienceSection.title}</h2>
        <div className="mx-auto mt-1 h-1 w-52 rounded-full bg-terracotta/70" />
        {portfolio.experienceSection.subtitle && (
          <p className="mt-2 font-marker text-sm text-ink-soft">
            {portfolio.experienceSection.subtitle}
          </p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18, rotate: -0.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-5xl px-7 pb-8 pt-10 md:px-12"
        style={{
          background: "color-mix(in oklab, var(--color-cream) 92%, var(--color-paper))",
          boxShadow: "4px 7px 18px color-mix(in oklab, var(--color-ink) 20%, transparent)",
          clipPath:
            "polygon(1% 2%, 13% 0, 25% 1.5%, 39% .5%, 52% 1.5%, 67% .5%, 81% 1.5%, 98% 0, 100% 18%, 99% 36%, 100% 53%, 99% 72%, 100% 97%, 82% 99%, 64% 98%, 46% 100%, 28% 98%, 2% 100%, 1% 78%, 2% 61%, 1% 42%, 2% 22%)",
        }}
      >
        <span className="tape absolute -top-2 left-5 h-8 w-24 -rotate-12" />
        <span className="tape absolute -right-2 top-4 h-8 w-24 rotate-[28deg]" />
        <div aria-hidden className="absolute inset-y-12 left-2 flex flex-col justify-around">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="h-4 w-4 rounded-full bg-paper-shade shadow-inner" />
          ))}
        </div>

        <div className="grid gap-7 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="relative mx-auto max-w-md -rotate-1 border border-ink/20 bg-cream px-5 py-3 shadow-md">
              <span className="tape absolute -top-3 right-4 h-5 w-14 rotate-6" />
              <h3 className="font-hand text-5xl leading-none">{internship.company}</h3>
              <p className="font-marker text-base">{internship.role}</p>
              <div className="mt-2 inline-flex flex-wrap gap-x-3 bg-sage/50 px-3 py-1 font-marker text-xs">
                <span>{internship.dates}</span>
                <span>•</span>
                <span>{internship.location}</span>
              </div>
            </div>

            <h3 className="mb-4 mt-7 font-hand text-2xl">{internship.projectsLabel} ↓</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {internship.projects.map((project, i) => (
                <motion.button
                  key={project.number}
                  onMouseEnter={() => play("tingle")}
                  onClick={() => setOpenProject(i)}
                  whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }}
                  className="relative min-h-60 p-6 text-left shadow-md"
                  style={{
                    background: `color-mix(in oklab, ${SCRAP_COLORS[i % SCRAP_COLORS.length]} 65%, var(--color-cream))`,
                    transform: `rotate(${i % 2 ? 1 : -1}deg)`,
                  }}
                >
                  <span
                    className="tape absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2"
                    style={{
                      background: i % 2 ? "var(--color-dusty-blue)" : "var(--color-lavender)",
                    }}
                  />
                  <div className="flex gap-2">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink font-marker text-xs">
                      {project.number}
                    </span>
                    <h4 className="font-hand text-xl leading-tight">{project.title}</h4>
                  </div>
                  <p className="mt-2 font-marker text-sm leading-snug text-ink-soft">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tape px-2 py-0.5 font-marker text-[10px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative rotate-1 bg-cream p-5 shadow-md notebook-lines">
              <span className="tape absolute -top-3 right-5 h-5 w-16 rotate-3" />
              <h3 className="text-center font-hand text-3xl">{internship.learnedTitle} ♡</h3>
              <ul className="mt-4 space-y-2 font-marker text-sm">
                {internship.learned.map((item) => (
                  <li key={item}>☆ {item}</li>
                ))}
              </ul>
              <p className="mt-5 -rotate-2 text-center font-hand text-lg text-terracotta">
                {internship.quote}
              </p>
            </div>

            <div className="relative -rotate-1 bg-sage/25 p-5 shadow-md">
              <h3 className="font-hand text-3xl">{internship.skillsTitle} ☆</h3>
              <div className="mt-3 space-y-1.5">
                {internship.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-3 font-marker text-sm"
                  >
                    <span>{skill.name}</span>
                    <span aria-label={`${skill.rating} out of 5`} className="tracking-wider">
                      {Array.from({ length: 5 }, (_, i) => (i < skill.rating ? "★" : "☆")).join("")}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center font-hand text-sm text-ink-soft">
                {internship.skillsNote}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {openProject !== null && (
          <ProjectModal
            project={internship.projects[openProject]}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =============================================================== */
/* SKILLS — hand-drawn fish */
/* =============================================================== */
const SKILL_COLORS = [
  "var(--color-dusty-blue)",
  "var(--color-terracotta)",
  "var(--color-sage)",
  "var(--color-lavender)",
  "var(--color-mustard)",
  "var(--color-peach)",
  "var(--color-dusty-blue)",
  "var(--color-terracotta)",
  "var(--color-sage)",
];

export function SkillsSection() {
  return (
    <div className="hide-butterflies relative mx-auto max-w-7xl px-5 py-12 md:px-8">
      <div className="mb-5 px-3 md:px-12">
        <SectionHeading
          label={portfolio.skillsSection.title}
          note={portfolio.skillsSection.subtitle}
          rotation={-1}
        />
      </div>

      <div
        className="relative overflow-hidden rounded-[28px] border-2 border-ink/65 p-4 md:p-8"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-dusty-blue) 25%, var(--color-paper)), color-mix(in oklab, var(--color-dusty-blue) 42%, var(--color-paper)))",
          boxShadow: "inset 0 0 35px color-mix(in oklab, var(--color-dusty-blue) 20%, transparent)",
          filter: "url(#sketch-wobble)",
        }}
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-10 w-full opacity-60"
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 18 Q70 4 140 18 T280 18 T420 18 T560 18 T700 18 T840 18 T1000 18"
            fill="none"
            stroke="var(--color-dusty-blue)"
            strokeWidth="3"
          />
          <path
            d="M0 23 Q80 10 160 23 T320 23 T480 23 T640 23 T800 23 T1000 23"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity=".7"
          />
        </svg>

        <div className="relative z-10 grid gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.skills.map((skill, i) => (
            <SkillFish key={skill.name} skill={skill} color={SKILL_COLORS[i]} idx={i} />
          ))}
        </div>

        {[8, 16, 29, 42, 58, 71, 86, 94].map((left, i) => (
          <span
            key={left}
            aria-hidden
            className="absolute rounded-full border border-dusty-blue/70 bg-cream/20"
            style={{
              left: `${left}%`,
              bottom: `${12 + (i % 4) * 16}%`,
              width: 7 + (i % 3) * 4,
              height: 7 + (i % 3) * 4,
              animation: `bubble${i % 7} ${4 + (i % 3)}s ease-in-out infinite`,
            }}
          />
        ))}

        <AquariumFloor />
      </div>
    </div>
  );
}

function SkillFish({
  skill,
  color,
  idx,
}: {
  skill: (typeof portfolio.skills)[number];
  color: string;
  idx: number;
}) {
  const lines =
    skill.name.length > 18
      ? skill.name.replace(" / ", "|/").replace(" & ", "|& ").split("|")
      : [skill.name];
  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: idx % 2 ? 1 : -1 }}
      className="relative mx-auto block w-full max-w-[270px]"
    >
      <svg
        viewBox="0 0 250 125"
        className="h-auto w-full overflow-visible"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <path
          d="M18 62 Q34 18 105 18 Q174 18 194 62 Q174 106 105 106 Q34 106 18 62 Z"
          fill={color}
          fillOpacity=".76"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
        <path
          d="M192 62 L235 28 L225 62 L235 96 Z"
          fill={color}
          fillOpacity=".68"
          stroke="var(--color-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M100 19 Q115 5 131 20"
          fill={color}
          fillOpacity=".55"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />
        <circle
          cx="43"
          cy="55"
          r="7"
          fill="var(--color-cream)"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />
        <circle cx="44" cy="55" r="3" fill="var(--color-ink)" />
        <circle cx="45" cy="53" r="1" fill="white" />
        <path d="M20 62 Q13 57 15 68" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
        <path
          d="M77 36 Q85 43 77 51 M101 31 Q109 39 101 47 M128 34 Q136 42 128 50 M88 72 Q96 80 88 88 M119 73 Q127 81 119 89 M151 48 Q159 56 151 64"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1"
          opacity=".25"
        />
        <text
          x="120"
          y={lines.length > 1 ? 58 : 67}
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontWeight="700"
          fontSize={lines.length > 1 ? 18 : 20}
          fill="var(--color-ink)"
        >
          {lines.map((line, i) => (
            <tspan key={line} x="120" dy={i === 0 ? 0 : 22}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </motion.div>
  );
}

function AquariumFloor() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-70"
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0 105 Q100 96 200 105 T400 104 T600 106 T800 102 T1000 105 L1000 120 L0 120 Z"
        fill="var(--color-paper-shade)"
        stroke="var(--color-ink)"
        strokeWidth="1"
      />
      <g fill="none" stroke="var(--color-sage)" strokeWidth="4" strokeLinecap="round">
        <path d="M35 108 Q20 70 38 28 M48 108 Q72 75 55 38 M65 109 Q82 88 79 55" />
        <path d="M930 110 Q914 70 934 24 M948 110 Q972 74 956 43 M965 110 Q982 88 980 57" />
      </g>
      <g fill="var(--color-ink)" opacity=".35">
        <ellipse cx="315" cy="105" rx="18" ry="7" />
        <ellipse cx="610" cy="108" rx="22" ry="8" />
        <circle cx="340" cy="106" r="5" />
        <circle cx="635" cy="106" r="4" />
      </g>
      <path
        d="M115 107 L121 93 L127 107 L141 108 L130 116 L134 120 L115 120 L112 114 L101 108 Z"
        fill="var(--color-terracotta)"
        stroke="var(--color-ink)"
        strokeWidth="1"
      />
    </svg>
  );
}

/* =============================================================== */
/* RESUME — folded paper */
/* =============================================================== */
export function ResumeSection() {
  const [open, setOpen] = useState(false);
  const { play } = useSound();
  const resume = portfolio.resume;

  const reveal = () => {
    play("rustle");
    setOpen(true);
  };

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-14">
      <SectionHeading label={resume.title} note={resume.subtitle} rotation={-1} />

      <div className="relative mx-auto mt-3 min-h-[600px] max-w-3xl">
        <div
          aria-hidden
          className="absolute left-[12%] top-14 hidden -rotate-6 font-hand text-xl text-ink-soft md:block"
        >
          found it! ↓
        </div>
        <div
          aria-hidden
          className="absolute right-[7%] top-40 hidden rotate-3 font-hand text-xl text-ink-soft md:block"
        >
          pull me out! ←
        </div>

        <div className="absolute bottom-20 left-1/2 h-[300px] w-[min(92vw,460px)] -translate-x-1/2 rounded-b-[28px] rounded-t-lg border-2 border-ink/65 bg-paper-shade shadow-xl">
          <div className="absolute inset-3 rounded-b-[22px] border border-dashed border-ink/45" />
          <span className="tape absolute -left-5 -top-4 h-8 w-28 -rotate-[18deg]" />
          <svg
            aria-hidden
            className="absolute -right-5 -top-5 h-24 w-16 rotate-12"
            viewBox="0 0 60 100"
            fill="none"
          >
            <path
              d="M42 8 Q57 20 48 38 L24 82 Q13 99 4 85 Q0 79 7 67 L30 25 Q37 14 43 20 Q48 24 43 33 L22 72"
              stroke="var(--color-ink)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div aria-hidden className="absolute bottom-12 left-10 opacity-50">
            <svg width="65" height="50" viewBox="0 0 65 50" fill="none">
              <path
                d="M5 43 C21 43 18 26 35 27 C48 28 44 14 56 10"
                stroke="var(--color-ink)"
                strokeDasharray="4 5"
              />
              <path d="M48 8 L58 8 L55 18" stroke="var(--color-ink)" />
            </svg>
          </div>
          <p className="absolute bottom-12 right-10 max-w-32 -rotate-3 text-center font-hand text-base text-ink-soft">
            don&apos;t forget to put it back ♡
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="closed"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -120, opacity: 0, rotate: -4 }}
              whileHover={{ y: -12, rotate: -1 }}
              onClick={reveal}
              className="absolute bottom-[300px] left-1/2 z-10 h-36 w-[min(74vw,340px)] -translate-x-1/2 border-2 border-ink/60 bg-cream px-7 pt-8 text-left shadow-md"
            >
              <span className="tape absolute -left-5 -top-3 h-8 w-24 -rotate-12" />
              <div className="border-b border-dashed border-ink/35 pb-3 text-center">
                <span className="mr-5 font-hand text-2xl">☆</span>
                <span className="font-hand text-4xl">{resume.foldedLabel}</span>
              </div>
              <p className="mt-5 text-center font-marker text-sm text-ink-soft">
                {resume.unfoldInstruction}
              </p>
            </motion.button>
          ) : (
            <motion.div
              key="open"
              initial={{ y: 170, opacity: 0, rotate: 4 }}
              animate={{ y: 0, opacity: 1, rotate: -1 }}
              exit={{ y: 170, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute left-1/2 top-0 z-20 w-[min(88vw,410px)] -translate-x-1/2 bg-cream p-6 shadow-2xl"
              style={{ minHeight: 500, opacity: 1 }}
            >
              <span className="tape absolute -top-3 left-5 h-7 w-24 -rotate-12" />
              <svg
                aria-hidden
                className="absolute -right-4 top-24 h-20 w-12 rotate-6"
                viewBox="0 0 45 85"
                fill="none"
              >
                <path
                  d="M32 5 Q44 17 37 31 L18 69 Q9 82 3 72 Q0 67 6 58 L24 21 Q29 13 34 17 Q38 20 34 28 L18 59"
                  stroke="var(--color-ink)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="text-center font-hand text-3xl">~ {resume.documentTitle} ~</h3>
              <p className="mt-1 text-center font-marker text-xs text-ink-soft">
                {resume.documentSubtitle}
              </p>

              <div className="mt-5 space-y-4 font-marker text-xs leading-relaxed">
                <ResumeBlock title={resume.aboutTitle}>
                  <p>{resume.summary}</p>
                </ResumeBlock>
                <ResumeBlock title={resume.educationTitle}>
                  {resume.education.map((item) => (
                    <div key={item.degree} className="flex justify-between gap-3">
                      <span>
                        {item.degree}
                        <br />
                        <span className="text-ink-soft">{item.school}</span>
                        <br />
                        <span className="text-ink-soft">{item.cgpa}</span>
                      </span>
                      <span className="shrink-0">{item.dates}</span>
                    </div>
                  ))}
                </ResumeBlock>
                <ResumeBlock title={resume.skillsTitle}>
                  <p>{resume.skills.join(", ")}</p>
                </ResumeBlock>
                <ResumeBlock title={resume.experienceTitle}>
                  {resume.experience.map((item) => (
                    <div key={item.role} className="flex justify-between gap-3">
                      <span>
                        {item.company}
                        <br />
                        <span className="text-ink-soft">{item.role}</span>
                      </span>
                      <span className="shrink-0">{item.dates}</span>
                    </div>
                  ))}
                </ResumeBlock>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a href={resume.downloadUrl} download>
                  <SketchButton fill="var(--color-sage)">{resume.downloadLabel}</SketchButton>
                </a>
                <SketchButton
                  fill="var(--color-peach)"
                  onClick={() => {
                    play("rustle");
                    setOpen(false);
                  }}
                >
                  {resume.foldBackLabel}
                </SketchButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-ink/25 pb-3">
      <h4 className="mb-1 font-hand text-lg">♟ {title}</h4>
      {children}
    </section>
  );
}
/* =============================================================== */
/* CONTACT — handwritten letter */
/* =============================================================== */
export function ContactSection() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-16">
      <SectionHeading
        label={portfolio.contact.title}
        note={portfolio.contact.subtitle}
        rotation={2}
      />

      <SketchBox fill="var(--color-cream)" className="mt-10 p-10">
        {/* horizontal ruled lines */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="5%"
              x2="95%"
              y1={`${8 + i * 8}%`}
              y2={`${8 + i * 8}%`}
              stroke="var(--color-dusty-blue)"
              strokeWidth="0.8"
            />
          ))}
        </svg>

        <div className="relative">
          <p className="font-hand text-3xl">{portfolio.contact.salutation}</p>
          <form
            className="mt-6 space-y-5"
            action="https://formsubmit.co/bhumika.85p@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New portfolio message" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <SketchField
              name="name"
              label={portfolio.contact.nameLabel}
              placeholder={portfolio.contact.namePlaceholder}
            />
            <SketchField
              name="email"
              label={portfolio.contact.emailLabel}
              placeholder={portfolio.contact.emailPlaceholder}
              type="email"
            />
            <SketchTextarea
              name="message"
              label={portfolio.contact.messageLabel}
              placeholder={portfolio.contact.messagePlaceholder}
            />
            <div className="flex items-center gap-4">
              <SketchButton type="submit" fill="var(--color-terracotta)">
                {portfolio.contact.sendLabel}
              </SketchButton>
              <p className="font-marker text-sm text-ink-soft">
                or:{" "}
                <a className="sketch-underline" href={`mailto:${portfolio.contact.email}`}>
                  {portfolio.contact.email}
                </a>
              </p>
            </div>
          </form>
          <div className="mt-8 flex items-center justify-end gap-3 pr-8">
            <p className="font-hand text-2xl">{portfolio.contact.signoff}</p>
            <svg
              aria-label="blue butterfly"
              width="38"
              height="32"
              viewBox="0 0 38 32"
              style={{ filter: "url(#sketch-wobble)" }}
            >
              <path
                d="M18 16 C10 3 1 5 4 15 C6 22 12 22 18 17 Z"
                fill="var(--color-dusty-blue)"
                stroke="var(--color-ink)"
                strokeWidth="1"
              />
              <path
                d="M20 16 C28 3 37 5 34 15 C32 22 26 22 20 17 Z"
                fill="var(--color-dusty-blue)"
                stroke="var(--color-ink)"
                strokeWidth="1"
              />
              <path
                d="M18 17 C10 18 7 27 14 28 C19 29 20 22 19 18 Z"
                fill="var(--color-lavender)"
                stroke="var(--color-ink)"
                strokeWidth="1"
              />
              <path
                d="M20 17 C28 18 31 27 24 28 C19 29 18 22 19 18 Z"
                fill="var(--color-lavender)"
                stroke="var(--color-ink)"
                strokeWidth="1"
              />
              <ellipse cx="19" cy="17" rx="2" ry="8" fill="var(--color-ink)" />
            </svg>
          </div>
        </div>
      </SketchBox>
      <TinyDoodleFlower style={{ bottom: 20, left: 20 }} rot={20} />
    </div>
  );
}

/* =============================================================== */
/* SHARED BITS */
/* =============================================================== */

function SectionHeading({
  label,
  note,
  rotation = 0,
}: {
  label: string;
  note?: string;
  rotation?: number;
}) {
  return (
    <div className="relative text-center" style={{ transform: `rotate(${rotation}deg)` }}>
      <h2 className="font-hand text-6xl md:text-7xl">
        {label}
        <span className="ml-3 font-marker text-lg text-ink-soft">{note}</span>
      </h2>
      <svg
        aria-hidden
        className="mx-auto mt-2 h-3 w-64"
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
      >
        <path
          d="M 3 8 Q 80 2 150 6 T 297 5"
          stroke="var(--color-terracotta)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

function StickyNote({
  children,
  color,
  rotation = 0,
  style,
}: {
  children: React.ReactNode;
  color: string;
  rotation?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="sticky-wobble relative p-6"
      style={{
        background: color,
        boxShadow: "2px 3px 6px color-mix(in oklab, var(--color-ink) 22%, transparent)",
        // @ts-expect-error css custom prop
        "--rot": `${rotation}deg`,
        ...style,
      }}
    >
      <span className="tape" style={{ top: -10, left: "40%" }} />
      {children}
    </div>
  );
}

function SketchField({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  const { play } = useSound();
  return (
    <label className="block">
      <span className="font-hand text-2xl">{label}</span>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        onKeyDown={() => play("keyPress")}
        className="mt-1 block w-full bg-transparent px-2 py-2 font-marker text-lg text-foreground outline-none placeholder:text-ink-soft/60"
        style={{
          borderBottom: "2px solid var(--color-ink)",
          filter: "url(#sketch-wobble)",
        }}
      />
    </label>
  );
}

function SketchTextarea({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  const { play } = useSound();
  return (
    <label className="block">
      <span className="font-hand text-2xl">{label}</span>
      <textarea
        name={name}
        required
        placeholder={placeholder}
        onKeyDown={() => play("keyPress")}
        rows={5}
        className="mt-1 block w-full resize-none bg-transparent p-3 font-marker text-lg text-foreground outline-none placeholder:text-ink-soft/60"
        style={{
          border: "2px solid var(--color-ink)",
          filter: "url(#sketch-wobble)",
          background: "color-mix(in oklab, var(--color-paper) 70%, transparent)",
        }}
      />
    </label>
  );
}

function TinyDoodleFlower({ style, rot = 0 }: { style?: React.CSSProperties; rot?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute opacity-70"
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36">
        <g style={{ filter: "url(#sketch-wobble)" }}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="18"
              cy="8"
              rx="4"
              ry="6"
              transform={`rotate(${a} 18 18)`}
              fill="var(--color-peach)"
              stroke="var(--color-ink)"
              strokeWidth="1"
              opacity="0.85"
            />
          ))}
          <circle
            cx="18"
            cy="18"
            r="3"
            fill="var(--color-mustard)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
}

function HiddenCat({ style }: { style?: React.CSSProperties }) {
  const { play } = useSound();
  return (
    <button
      aria-label="hidden cat"
      onClick={() => play("meow")}
      className="absolute opacity-60 transition-transform hover:scale-125 hover:opacity-100"
      style={style}
    >
      <svg width="28" height="24" viewBox="0 0 28 24">
        <g style={{ filter: "url(#sketch-wobble)" }}>
          <circle
            cx="14"
            cy="14"
            r="8"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
          />
          <polygon
            points="8,8 6,3 12,6"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <polygon
            points="20,8 22,3 16,6"
            fill="var(--color-cat)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
          <circle cx="11" cy="14" r="1" fill="var(--color-ink)" />
          <circle cx="17" cy="14" r="1" fill="var(--color-ink)" />
          <path d="M 13 17 Q 14 18 15 17" stroke="var(--color-ink)" strokeWidth="0.8" fill="none" />
        </g>
      </svg>
    </button>
  );
}

function DoodleHeart({ style, rot = 0 }: { style?: React.CSSProperties; rot?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute opacity-50"
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <path
          d="M 12 6 C 8.5 1.5 1.5 3 1.5 9 C 1.5 15 12 21.5 12 21.5 C 12 21.5 22.5 15 22.5 9 C 22.5 3 15.5 1.5 12 6 Z"
          fill="var(--color-terracotta)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

function DoodleSun({ style, rot = 0 }: { style?: React.CSSProperties; rot?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute opacity-50"
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <circle
          cx="16"
          cy="16"
          r="6"
          fill="var(--color-mustard)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
        />
        <path
          d="M 16 4 L 16 7 M 16 25 L 16 28 M 4 16 L 7 16 M 25 16 L 28 16 M 7.5 7.5 L 9.5 9.5 M 22.5 22.5 L 24.5 24.5 M 7.5 22.5 L 9.5 20.5 M 22.5 7.5 L 24.5 9.5"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function DoodleStar({
  style,
  rot = 0,
  fill = "var(--color-mustard)",
}: {
  style?: React.CSSProperties;
  rot?: number;
  fill?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute opacity-55"
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <path
          d="M 12 2 L 15 9 L 22 9 L 17 14 L 19 21 L 12 17 L 5 21 L 7 14 L 2 9 L 9 9 Z"
          fill={fill}
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

function DoodleMoon({ style, rot = 0 }: { style?: React.CSSProperties; rot?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute opacity-50"
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <path
          d="M 12 3 A 9 9 0 0 0 21 12 A 9 9 0 0 1 12 3 Z"
          fill="var(--color-lavender)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
          transform="rotate(-20 12 12)"
        />
      </svg>
    </div>
  );
}

function DoodleSmiley({ style, rot = 0 }: { style?: React.CSSProperties; rot?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute opacity-50"
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <circle
          cx="14"
          cy="14"
          r="10"
          fill="var(--color-peach)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
        />
        <circle cx="10" cy="11" r="1.2" fill="var(--color-ink)" />
        <circle cx="18" cy="11" r="1.2" fill="var(--color-ink)" />
        <path
          d="M 9 16 Q 14 21 19 16"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
