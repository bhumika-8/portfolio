import { useEffect, useRef, useState } from "react";

export function PencilCursor() {
  const [visible, setVisible] = useState(false);
  const [touch, setTouch] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pawRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none)").matches || "ontouchstart" in window;
    if (isTouch) {
      setTouch(true);
      document.body.style.cursor = "auto";
      return;
    }

    const onMove = (event: MouseEvent) => {
      if (!pawRef.current) return;
      pawRef.current.style.transform = `translate3d(${event.clientX - 5}px, ${event.clientY - 5}px, 0)`;
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (touch) return null;

  return (
    <div ref={pawRef} aria-hidden style={{ position: "fixed", left: 0, top: 0, width: 29, height: 31, pointerEvents: "none", zIndex: 9999, opacity: visible ? 1 : 0, transition: "opacity 140ms ease", willChange: "transform" }}>
      <div style={{ transform: `rotate(-18deg) scale(${pressed ? .82 : 1})`, transformOrigin: "7px 7px", transition: "transform 90ms ease" }}>
        <svg viewBox="0 0 58 62" width="29" height="31" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(1px 2px 1px rgba(55,35,22,.2))" }}>
          <g fill="#9a6539" stroke="#3f2a1e" strokeWidth="2" strokeLinejoin="round">
            <ellipse cx="9" cy="19" rx="6" ry="8" transform="rotate(-24 9 19)" />
            <ellipse cx="21" cy="10" rx="6.5" ry="8.5" transform="rotate(-9 21 10)" />
            <ellipse cx="36" cy="10" rx="6.5" ry="8.5" transform="rotate(9 36 10)" />
            <ellipse cx="49" cy="19" rx="6" ry="8" transform="rotate(24 49 19)" />
            <path d="M12 43 C12 31 20 24 29 25 C38 24 46 31 46 43 C46 54 38 59 29 55 C20 59 12 54 12 43 Z" />
          </g>
          <g fill="#d9aa7b" opacity=".7">
            <ellipse cx="9" cy="17" rx="2.5" ry="3" /><ellipse cx="21" cy="8" rx="2.7" ry="3" /><ellipse cx="36" cy="8" rx="2.7" ry="3" /><ellipse cx="49" cy="17" rx="2.5" ry="3" />
            <path d="M21 43 C21 36 25 32 29 32 C33 32 37 36 37 43 C34 41 32 42 29 46 C26 42 24 41 21 43 Z" />
          </g>
          <circle cx="5" cy="5" r="2.2" fill="#f5ead9" stroke="#3f2a1e" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}