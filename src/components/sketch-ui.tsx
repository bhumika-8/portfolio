import type { ReactNode } from "react";
import type React from "react";

/**
 * A hand-drawn wobbly box. Pass a fill color (semantic token) for a pastel
 * background, or leave undefined for just a sketched outline.
 */
export function SketchBox({
  children,
  fill,
  rotation = 0,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  fill?: string;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof HTMLElementTagNameMap;
}) {
  return (
    <Tag
      className={`relative ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        {fill && (
          <path
            d="M 4 6 Q 20 3 50 4 T 96 5 Q 97 20 96 50 T 95 95 Q 80 97 50 96 T 5 95 Q 3 80 4 50 T 4 6 Z"
            fill={fill}
            opacity="0.55"
          />
        )}
        <path
          d="M 4 6 Q 20 3 50 4 T 96 5 Q 97 20 96 50 T 95 95 Q 80 97 50 96 T 5 95 Q 3 80 4 50 T 4 6 Z"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 5 8 Q 22 5 50 6 T 95 7"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="0.35"
          opacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative">{children}</div>
    </Tag>
  );
}

/** Hand-drawn arrow SVG — pass width/rotation for direction. */
export function SketchArrow({
  className = "",
  rotate = 0,
  width = 80,
}: {
  className?: string;
  rotate?: number;
  width?: number;
}) {
  return (
    <svg
      width={width}
      height={width / 2}
      viewBox="0 0 80 40"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, filter: "url(#sketch-wobble)" }}
      aria-hidden
    >
      <path
        d="M 4 20 Q 30 12 60 22"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 60 22 L 52 16 M 60 22 L 54 30"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn button. */
export function SketchButton({
  children,
  fill = "var(--color-mustard)",
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  fill?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}) {
  return (
    <button type={type} onClick={onClick} className={`btn-sketch ${className}`}>
      <svg
        aria-hidden
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "url(#sketch-wobble)" }}
      >
        <path
          d="M 6 10 Q 40 4 100 6 T 194 8 Q 197 25 194 45 T 190 54 Q 140 58 100 55 T 8 52 Q 4 40 6 25 T 6 10 Z"
          fill={fill}
          opacity="0.55"
        />
        <path
          d="M 6 10 Q 40 4 100 6 T 194 8 Q 197 25 194 45 T 190 54 Q 140 58 100 55 T 8 52 Q 4 40 6 25 T 6 10 Z"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative">{children}</span>
    </button>
  );
}
