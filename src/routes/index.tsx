import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SketchbookWheel, type SectionKey } from "@/components/SketchbookWheel";
import { PaperPage } from "@/components/PaperPage";
import {
  HomeSection,
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  ResumeSection,
  ContactSection,
} from "@/components/sections";
import { useSound } from "@/components/useSound";
import portfolio from "@/content/portfolio.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: portfolio.site.title },
      {
        name: "description",
        content: portfolio.site.description,
      },
    ],
  }),
  component: Sketchbook,
});

const TABS: { key: SectionKey; label: string }[] = [
  { key: "home", label: portfolio.navigation.home },
  { key: "about", label: portfolio.navigation.about },
  { key: "projects", label: portfolio.navigation.projects },
  { key: "experience", label: portfolio.navigation.experience },
  { key: "skills", label: portfolio.navigation.skills },
  { key: "resume", label: portfolio.navigation.resume },
  { key: "contact", label: portfolio.navigation.contact },
];

function Sketchbook() {
  const [section, setSection] = useState<SectionKey>("home");

  const handleNavigate = (key: SectionKey) => {
    setSection(key);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = document.getElementById(key);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const wheel = <SketchbookWheel onSelect={handleNavigate} />;

  // Observe which section is currently on screen for mobile vertical scroll
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSection(entry.target.id as SectionKey);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -50% 0px" },
    );

    TABS.forEach((tab) => {
      const el = document.getElementById(tab.key);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="notebook-page paper-texture paper-vignette relative min-h-screen w-full overflow-x-hidden">
      <SkillsAmbience active={section === "skills"} />
      <div aria-hidden className="notebook-rule-layer" />

      {/* Notebook spiral binding coils on the left — Desktop only */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 hidden md:flex flex-col justify-around items-center"
        style={{ width: 28, zIndex: 20 }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <svg
            key={i}
            width="28"
            height="36"
            viewBox="0 0 28 36"
            style={{ overflow: "visible", flexShrink: 0 }}
          >
            <path
              d="M 14 4 C 26 4 26 18 14 18 C 2 18 2 32 14 32"
              fill="none"
              stroke="color-mix(in oklab, var(--color-ink) 55%, transparent)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 14 4 C 2 4 2 18 14 18 C 26 18 26 32 14 32"
              fill="none"
              stroke="color-mix(in oklab, var(--color-ink) 20%, transparent)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="3 2"
            />
            <ellipse
              cx="14"
              cy="18"
              rx="5"
              ry="5"
              fill="color-mix(in oklab, var(--color-paper-shade) 90%, transparent)"
              stroke="color-mix(in oklab, var(--color-ink) 30%, transparent)"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>

      {/* Peeping cat from behind the binding — Desktop only */}
      <PeepingCat />

      {/* Left notebook sidebar (persistent nav) — Desktop only */}
      <div className="hidden md:block">
        <TopTabs current={section} onSelect={handleNavigate} />
      </div>

      {/* Mobile Clip/Pin Menu */}
      <MobileClipMenu onNavigate={handleNavigate} />

      {/* DESKTOP VIEW: Tabbed single section */}
      <div className="hidden md:block relative z-[1] pl-[150px] pt-2 md:pl-[170px]">
        <PaperPage pageKey={section}>
          {section === "home" && <HomeSection wheel={wheel} />}
          {section === "about" && <AboutSection />}
          {section === "projects" && <ProjectsSection />}
          {section === "experience" && <ExperienceSection />}
          {section === "skills" && <SkillsSection />}
          {section === "resume" && <ResumeSection />}
          {section === "contact" && <ContactSection />}
        </PaperPage>
      </div>

      {/* MOBILE VIEW: Stacked vertical sections scroll list (no large left padding) */}
      <div className="block md:hidden px-4 pb-24 pt-20 space-y-20 relative z-[1]">
        <section id="home" className="scroll-mt-24 border-b border-dashed border-ink/10 pb-16">
          <HomeSection wheel={wheel} />
        </section>
        <section id="about" className="scroll-mt-24 border-b border-dashed border-ink/10 pb-16">
          <AboutSection />
        </section>
        <section id="projects" className="scroll-mt-24 border-b border-dashed border-ink/10 pb-16">
          <ProjectsSection />
        </section>
        <section
          id="experience"
          className="scroll-mt-24 border-b border-dashed border-ink/10 pb-16"
        >
          <ExperienceSection />
        </section>
        <section id="skills" className="scroll-mt-24 border-b border-dashed border-ink/10 pb-16">
          <SkillsSection />
        </section>
        <section id="resume" className="scroll-mt-24 border-b border-dashed border-ink/10 pb-16">
          <ResumeSection />
        </section>
        <section id="contact" className="scroll-mt-24">
          <ContactSection />
        </section>
      </div>

      {/* Page number — Desktop only */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-4 right-6 font-hand text-xl text-ink-soft hidden md:block"
      >
        — pg. {TABS.findIndex((t) => t.key === section) + 1} —
      </div>
    </main>
  );
}

function SkillsAmbience({ active }: { active: boolean }) {
  const { enabled, pauseBg, resumeBg } = useSound();

  useEffect(() => {
    if (!active || !enabled) return;

    pauseBg();
    const bubblingAudio = new Audio("/bubbling.mp3");
    bubblingAudio.loop = true;
    bubblingAudio.volume = 0.55;
    bubblingAudio.play().catch(() => {});

    return () => {
      bubblingAudio.pause();
      bubblingAudio.currentTime = 0;
      bubblingAudio.removeAttribute("src");
      bubblingAudio.load();
      resumeBg();
    };
  }, [active, enabled, pauseBg, resumeBg]);

  return null;
}

/** Black cat peeking from the bottom left corner — slides diagonally away on hover */
function PeepingCat() {
  const [hiding, setHiding] = useState(false);
  const { play } = useSound();

  return (
    <>
      <div
        aria-hidden
        className="fixed hidden md:block"
        style={{
          left: -20,
          bottom: -20,
          zIndex: 25,
          pointerEvents: "auto",
          transition: "transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)",
          transform: hiding ? "translate(-120px, 120px)" : "translate(0px, 0px)",
        }}
        onMouseEnter={() => setHiding(true)}
        onPointerEnter={() => play("meow")}
        onMouseLeave={() => setTimeout(() => setHiding(false), 900)}
      >
        {/* Bigger, adorable hand-drawn black cat peeking from the corner */}
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          style={{ overflow: "visible", cursor: "pointer" }}
        >
          <g style={{ filter: "url(#sketch-wobble)" }}>
            {/* Main black body curved in the corner */}
            <path
              d="M 10 160 C 10 90 70 80 110 120 C 130 140 130 160 130 160 Z"
              fill="#1a1a1a"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />
            {/* Head peeking out diagonally */}
            <circle
              cx="85"
              cy="85"
              r="34"
              fill="#1a1a1a"
              stroke="var(--color-ink)"
              strokeWidth="1.8"
            />

            {/* Ears pointing up-right */}
            <polygon
              points="62,60 48,28 78,50"
              fill="#1a1a1a"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />
            <polygon
              points="108,60 122,28 92,50"
              fill="#1a1a1a"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />

            {/* Inner ear pink */}
            <polygon points="64,56 53,38 75,49" fill="#c87a8a" opacity="0.85" />
            <polygon points="106,56 117,38 95,49" fill="#c87a8a" opacity="0.85" />

            {/* Big yellow eyes */}
            <ellipse
              cx="73"
              cy="80"
              rx="7"
              ry="9"
              fill="#ffd700"
              stroke="var(--color-ink)"
              strokeWidth="1"
            />
            <ellipse
              cx="97"
              cy="80"
              rx="7"
              ry="9"
              fill="#ffd700"
              stroke="var(--color-ink)"
              strokeWidth="1"
            />
            {/* Pupils */}
            <ellipse cx="73" cy="81" rx="3.2" ry="7" fill="#111" />
            <ellipse cx="97" cy="81" rx="3.2" ry="7" fill="#111" />
            {/* Eye shines */}
            <circle cx="75" cy="78" r="1.8" fill="white" />
            <circle cx="99" cy="78" r="1.8" fill="white" />

            {/* Tiny pink nose */}
            <polygon points="85,91 82,95 88,95" fill="#c87a8a" />
            {/* Mouth */}
            <path
              d="M 82,98 Q 85,100 88,98"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Whiskers */}
            <line x1="68" y1="92" x2="38" y2="88" stroke="#555" strokeWidth="1" />
            <line x1="68" y1="95" x2="36" y2="98" stroke="#555" strokeWidth="1" />
            <line x1="102" y1="92" x2="132" y2="88" stroke="#555" strokeWidth="1" />
            <line x1="102" y1="95" x2="134" y2="98" stroke="#555" strokeWidth="1" />

            {/* Paws resting on the page edge */}
            <ellipse
              cx="50"
              cy="130"
              rx="14"
              ry="10"
              fill="#1a1a1a"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
            />
            <ellipse
              cx="115"
              cy="135"
              rx="14"
              ry="10"
              fill="#1a1a1a"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
            />
            {/* Toe beans */}
            <circle cx="44" cy="130" r="2" fill="#333" />
            <circle cx="50" cy="132" r="2" fill="#333" />
            <circle cx="56" cy="130" r="2" fill="#333" />
            <circle cx="109" cy="135" r="2" fill="#333" />
            <circle cx="115" cy="137" r="2" fill="#333" />
            <circle cx="121" cy="135" r="2" fill="#333" />
          </g>
        </svg>
      </div>
      <PetTheCatHint hiding={hiding} />
    </>
  );
}

function PetTheCatHint({ hiding }: { hiding: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none fixed bottom-24 left-28 z-[26] hidden md:block">
      <p className="-rotate-6 font-hand text-xl text-ink-soft">{hiding ? "lol" : "try to pet"}</p>
      <svg
        width="105"
        height="75"
        viewBox="0 0 105 75"
        fill="none"
        className="-ml-12 mt-1 text-ink-soft"
      >
        <path
          d="M98 8 C77 10 84 35 59 38 C38 41 42 61 17 62"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />
        <path
          d="M27 53 L15 62 L29 68"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
function TopTabs({
  current,
  onSelect,
}: {
  current: SectionKey;
  onSelect: (k: SectionKey) => void;
}) {
  const { play } = useSound();
  const scribbleColors = [
    "var(--color-dusty-blue)",
    "var(--color-sage)",
    "var(--color-mustard)",
    "var(--color-lavender)",
    "var(--color-dusty-blue)",
    "var(--color-peach)",
    "var(--color-sage)",
  ];

  return (
    <nav aria-label="sections" className="fixed left-7 top-1/2 z-30 -translate-y-1/2">
      <div className="relative flex flex-col gap-4 py-5">
        {TABS.map((tab, i) => {
          const active = tab.key === current;
          return (
            <motion.button
              key={tab.key}
              whileHover={{ x: 6, rotate: i % 2 ? 1 : -1 }}
              animate={{ x: active ? 5 : 0 }}
              onMouseEnter={() => play("tingle")}
              onClick={() => {
                if (tab.key === current) return;
                play("navClick");
                onSelect(tab.key);
              }}
              className="group relative grid h-12 w-[108px] place-items-center bg-transparent font-hand text-xl text-foreground"
            >
              <svg
                aria-hidden
                className={`absolute inset-0 h-full w-full overflow-visible transition-opacity ${active ? "opacity-90" : "opacity-0 group-hover:opacity-65"}`}
                viewBox="0 0 120 50"
                fill="none"
                style={{ color: scribbleColors[i] }}
              >
                <ellipse
                  cx="60"
                  cy="25"
                  rx="54"
                  ry="18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  transform="rotate(-2 60 25)"
                />
                <ellipse
                  cx="60"
                  cy="25"
                  rx="56"
                  ry="20"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity=".75"
                  transform="rotate(2 60 25)"
                />
                <path
                  d="M12 39 Q40 43 68 40 T108 38"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity=".6"
                />
              </svg>
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

function MobileClipMenu({ onNavigate }: { onNavigate: (key: SectionKey) => void }) {
  const [open, setOpen] = useState(false);
  const { play } = useSound();

  const handleLinkClick = (key: SectionKey) => {
    play("pageFlip");
    setOpen(false);
    onNavigate(key);
  };

  return (
    <div className="block md:hidden">
      {/* Binder Clip Button */}
      <button
        onClick={() => {
          play("tingle");
          setOpen(!open);
        }}
        aria-label="Toggle navigation menu"
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card/85 shadow-md backdrop-blur-sm"
        style={{
          border: "1.5px solid var(--color-border)",
          filter: "url(#sketch-wobble)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" style={{ transform: "rotate(-10deg)" }}>
          {/* Binder clip wire handles */}
          <path
            d="M 12 14 C 12 6, 20 6, 20 14"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Binder clip metal body */}
          <path
            d="M 6 24 L 26 24 L 20 14 L 12 14 Z"
            fill="var(--color-ink)"
            stroke="var(--color-ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Tiny indicator line inside */}
          <path
            d="M 13 18 L 19 18"
            stroke="var(--color-paper)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            />

            {/* Notebook Paper Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-40 w-[260px] bg-paper shadow-2xl p-6 pt-20 border-r-2 border-ink flex flex-col paper-texture"
              style={{
                clipPath: "polygon(0 0, 100% 0, 96% 25%, 100% 50%, 95% 75%, 100% 100%, 0 100%)",
                filter: "url(#sketch-wobble)",
              }}
            >
              {/* Notebook binding holes on the left side of the menu page */}
              <div className="absolute left-2 inset-y-0 flex flex-col justify-around py-8 pointer-events-none">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-ink/30 bg-paper-shade"
                    style={{
                      boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  />
                ))}
              </div>

              {/* Menu Content */}
              <div className="ml-4 pl-4 flex flex-col h-full">
                <p className="font-marker text-sm text-ink-soft mb-6 text-center border-b border-dashed border-ink/20 pb-2">
                  ~ sketchbook index ~
                </p>
                <div className="flex flex-col gap-5 my-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => handleLinkClick(tab.key)}
                      className="text-left font-hand text-3xl hover:text-terracotta transition-colors py-1 relative group w-fit"
                    >
                      <span className="relative z-10">{tab.label}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-1 bg-terracotta/40 rounded-full transition-all duration-300 group-hover:w-full" />
                    </button>
                  ))}
                </div>
                <div className="mt-auto border-t border-dashed border-ink/20 pt-4 text-center font-marker text-xs text-ink-soft">
                  — index —
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
