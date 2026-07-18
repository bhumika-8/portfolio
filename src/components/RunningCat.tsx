interface Props {
  speed: "idle" | "hover" | "sprint";
}

export function RunningCat({ speed }: Props) {
  // Cycle duration based on running speed
  const cycle = speed === "sprint" ? "0.24s" : speed === "hover" ? "0.4s" : "0.68s";

  return (
    <svg
      viewBox="0 0 160 115"
      width="100%"
      height="100%"
      style={{ overflow: "visible", filter: "url(#sketch-wobble)" }}
    >
      <style>{`
        .wheel-cat-body {
          animation: cat-body-bob ${cycle} ease-in-out infinite;
          transform-origin: 88px 60px;
        }
        .wheel-cat-head {
          animation: cat-head-bob ${cycle} ease-in-out infinite;
          transform-origin: 48px 42px;
        }
        .wheel-tail {
          animation: tail-flick ${cycle} ease-in-out infinite;
          transform-origin: 124px 58px;
        }
        .wheel-front-a {
          animation: leg-run-front-a ${cycle} ease-in-out infinite;
          transform-origin: 62px 70px;
        }
        .wheel-front-b {
          animation: leg-run-front-b ${cycle} ease-in-out infinite;
          transform-origin: 71px 72px;
        }
        .wheel-back-a {
          animation: leg-run-back-a ${cycle} ease-in-out infinite;
          transform-origin: 104px 70px;
        }
        .wheel-back-b {
          animation: leg-run-back-b ${cycle} ease-in-out infinite;
          transform-origin: 116px 68px;
        }
        .wheel-eye {
          animation: blink 5s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        .wheel-shadow {
          animation: shadow-scale ${cycle} ease-in-out infinite;
          transform-origin: 88px 99px;
        }

        /* Running Animations */
        @keyframes cat-body-bob {
          0%, 100% { transform: translateY(0px) scale(1, 1); }
          25% { transform: translateY(1.5px) scale(1.03, 0.97); }
          50% { transform: translateY(-3px) scale(0.97, 1.03); }
          75% { transform: translateY(-1px) scale(1.01, 0.99); }
        }
        @keyframes cat-head-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(0.5px) rotate(1deg); }
          50% { transform: translateY(-2px) rotate(-1.5deg); }
          75% { transform: translateY(-0.5px) rotate(0.5deg); }
        }
        @keyframes tail-flick {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes leg-run-front-a {
          0% { transform: translate(0px, 0px) rotate(32deg); }
          25% { transform: translate(-6px, -3px) rotate(8deg); }
          50% { transform: translate(-12px, -5px) rotate(-22deg); }
          75% { transform: translate(6px, -6px) rotate(-5deg); }
          100% { transform: translate(0px, 0px) rotate(32deg); }
        }
        @keyframes leg-run-front-b {
          0% { transform: translate(-12px, -5px) rotate(-22deg); }
          25% { transform: translate(6px, -6px) rotate(-5deg); }
          50% { transform: translate(0px, 0px) rotate(32deg); }
          75% { transform: translate(-6px, -3px) rotate(8deg); }
          100% { transform: translate(-12px, -5px) rotate(-22deg); }
        }
        @keyframes leg-run-back-a {
          0% { transform: translate(-8px, -4px) rotate(-20deg); }
          25% { transform: translate(4px, -6px) rotate(-8deg); }
          50% { transform: translate(8px, 0px) rotate(22deg); }
          75% { transform: translate(0px, -2px) rotate(5deg); }
          100% { transform: translate(-8px, -4px) rotate(-20deg); }
        }
        @keyframes leg-run-back-b {
          0% { transform: translate(8px, 0px) rotate(22deg); }
          25% { transform: translate(0px, -2px) rotate(5deg); }
          50% { transform: translate(-8px, -4px) rotate(-20deg); }
          75% { transform: translate(4px, -6px) rotate(-8deg); }
          100% { transform: translate(8px, 0px) rotate(22deg); }
        }
        @keyframes shadow-scale {
          0%, 100% { transform: scaleX(1); opacity: 0.15; }
          50% { transform: scaleX(0.85); opacity: 0.08; }
        }
        @keyframes blink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
      `}</style>

      {/* Shadow */}
      <ellipse
        className="wheel-shadow"
        cx="88"
        cy="99"
        rx="53"
        ry="5"
        fill="var(--color-ink)"
        opacity=".13"
      />

      {/* BACKGROUND LEGS (Drawn first so they reside behind the body) */}
      <g stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Back Leg B */}
        <path
          className="wheel-back-b"
          d="M 112 70 C 118 74, 130 80, 126 92 Q 124 96, 120 98 Q 117 100, 114 98 Q 111 100, 108 97 C 110 90, 106 82, 102 70 Z"
          fill="color-mix(in oklab, var(--color-cat) 76%, black)"
          opacity="0.9"
        />
        {/* Front Leg B */}
        <path
          className="wheel-front-b"
          d="M 67 72 C 67 84, 55 92, 55 98 Q 57 101, 60 99 Q 63 101, 66 99 Q 69 101, 71 98 C 77 90, 81 82, 81 72 Z"
          fill="color-mix(in oklab, var(--color-cat) 76%, black)"
          opacity="0.9"
        />
      </g>

      {/* TAIL (Drawn behind the body torso) */}
      <g className="wheel-cat-body">
        <path
          className="wheel-tail"
          d="M124 58 C146 51 151 32 140 21 C134 15 128 21 133 27 C140 35 136 44 126 46"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          className="wheel-tail"
          d="M124 58 C146 51 151 32 140 21 C134 15 128 21 133 27 C140 35 136 44 126 46"
          fill="none"
          stroke="var(--color-cat)"
          strokeWidth="7.5"
          strokeLinecap="round"
        />
      </g>

      {/* BODY TORSO */}
      <g className="wheel-cat-body">
        {/* Torso main */}
        <path
          d="M 55 48 C 69 32 105 31 125 47 C 137 57 131 77 116 83 C 94 92 63 84 51 69 C 45 61 48 54 55 48 Z"
          fill="var(--color-cat)"
          stroke="var(--color-ink)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Shading, highlight fluff on belly */}
        <path
          d="M 68 73 C 80 84 103 86 116 77 C 105 90 74 92 58 75 Z"
          fill="var(--color-peach)"
          opacity=".5"
        />

        {/* Tabby stripes on body */}
        <path
          d="M 92 38 Q 98 48 91 55 M 108 40 Q 113 49 107 57 M 121 46 Q 126 53 121 61"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
          opacity=".35"
          strokeLinecap="round"
        />
      </g>

      {/* HEAD GROUP */}
      <g className="wheel-cat-head">
        {/* Ears */}
        <g stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" fill="var(--color-cat)">
          {/* Left Ear */}
          <path d="M31 34 L28 10 L47 25 Z" />
          {/* Right Ear */}
          <path d="M57 27 L72 11 L70 37 Z" />
        </g>
        {/* Inner ears pink */}
        <g fill="var(--color-peach)" opacity="0.8">
          <path d="M32 28 L31 16 L42 25 Z" />
          <path d="M61 27 L69 18 L68 32 Z" />
        </g>

        {/* Face structure */}
        <path
          d="M31 34 C25 44 26 58 36 68 C44 74 62 74 70 64 C78 54 77 42 70 37 L57 27 C52 26 49 25 47 25 Z"
          fill="var(--color-cat)"
          stroke="var(--color-ink)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Tabby forehead stripes */}
        <path
          d="M 44 23 L 44 27 M 48 21 L 48 26 M 52 23 L 52 27"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.6"
          opacity="0.45"
          strokeLinecap="round"
        />

        {/* Pink blush cheeks */}
        <circle cx="35" cy="54" r="4" fill="var(--color-peach)" opacity="0.6" />
        <circle cx="68" cy="52" r="4" fill="var(--color-peach)" opacity="0.6" />

        {/* Eyes */}
        <ellipse
          className="wheel-eye"
          cx="44"
          cy="47"
          rx="4.5"
          ry="5.5"
          fill="var(--color-cream)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
        />
        <ellipse
          className="wheel-eye"
          cx="61"
          cy="46"
          rx="4.5"
          ry="5.5"
          fill="var(--color-cream)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
        />
        {/* Pupils */}
        <ellipse cx="45" cy="48" rx="1.8" ry="3.4" fill="var(--color-ink)" />
        <ellipse cx="62" cy="47" rx="1.8" ry="3.4" fill="var(--color-ink)" />
        {/* Eye shines */}
        <circle cx="46" cy="46" r="1.1" fill="white" />
        <circle cx="63" cy="45" r="1.1" fill="white" />

        {/* Nose */}
        <path d="M51 56 L56 55 L54 59 Z" fill="#c47778" stroke="var(--color-ink)" strokeWidth=".7" />

        {/* Mouth */}
        <path
          d="M54 59 Q51 63 48 60 M54 59 Q57 63 60 60"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Whiskers */}
        <path
          d="M36 55 L17 51 M36 59 L15 60 M69 53 L84 48 M69 58 L86 59"
          stroke="var(--color-ink)"
          strokeWidth="1"
          opacity=".65"
          strokeLinecap="round"
        />
      </g>

      {/* FOREGROUND LEGS (Drawn last so they reside in front of the body) */}
      <g stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="var(--color-cat)">
        {/* Back Leg A */}
        <path
          className="wheel-back-a"
          d="M 104 70 C 110 74, 122 80, 118 92 Q 116 96, 112 98 Q 109 100, 106 98 Q 103 100, 100 97 C 102 90, 98 82, 94 70 Z"
        />
        {/* Front Leg A */}
        <path
          className="wheel-front-a"
          d="M 58 72 C 58 84, 46 92, 46 98 Q 48 101, 51 99 Q 54 101, 57 99 Q 60 101, 62 98 C 68 90, 72 82, 72 72 Z"
        />
      </g>
    </svg>
  );
}