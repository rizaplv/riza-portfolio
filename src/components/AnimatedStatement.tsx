"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOOLS = [
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "SketchUp", icon: "https://cdn.simpleicons.org/sketchup" },
];

// Position + float delay/offset per icon (desktop only — hidden on mobile)
const ICON_POSITIONS = [
  { top: "-2rem", left: "-4rem", delay: "0s", dur: "7s" },
  { top: "1rem", left: "-9rem", delay: "1.2s", dur: "8s" },
  { top: "55%", left: "-6.5rem", delay: "2.1s", dur: "6.5s" },
  { top: "-1.5rem", right: "-4.5rem", delay: "0.6s", dur: "7.5s" },
  { top: "1.5rem", right: "-9rem", delay: "1.8s", dur: "8.5s" },
  { top: "50%", right: "-7rem", delay: "2.6s", dur: "6s" },
  { top: "-3rem", right: "22%", delay: "3.2s", dur: "7s" },
];

const ICON_SIZES = [56, 40, 48, 52, 42, 46, 44];

export default function AnimatedStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const words = TOOLS.map((t) => t.name).join(" · ").split(" ");

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight;

    // Entry point: top of element crosses 80% viewport height
    const entry = winH * 0.8 - rect.top;
    // Exit point: bottom of element leaves 20% viewport height
    const exit = winH * 0.2 - rect.bottom + rect.height;

    let progress: number;
    if (entry <= 0) {
      progress = 0; // haven't entered yet
    } else if (exit <= 0) {
      // between entry (0) and exit, map to 0..1
      const range = winH * 0.6 + rect.height * 0.2;
      progress = entry / range;
    } else {
      progress = 1; // fully passed
    }
    progress = Math.min(1, Math.max(0, progress));

    // fade out fully when element completely scrolled past top
    if (rect.bottom < 0 || rect.top > winH) {
      setVisibleCount(0);
    } else {
      setVisibleCount(Math.ceil(progress * words.length));
    }
  }, [words.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScrollThrottled = () => requestAnimationFrame(onScroll);
    onScroll();
    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    return () => window.removeEventListener("scroll", onScrollThrottled);
  }, [onScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-section max-w-5xl mx-auto text-center"
    >
      {/* Floating tool logos around the statement */}
      <div className="hidden md:block" aria-hidden="true">
        {TOOLS.map((tool, i) => (
          <img
            key={tool.name}
            src={tool.icon}
            alt=""
            loading="lazy"
            style={{
              position: "absolute",
              width: ICON_SIZES[i],
              height: ICON_SIZES[i],
              ...ICON_POSITIONS[i],
              animation: `float ${ICON_POSITIONS[i].dur} ease-in-out ${ICON_POSITIONS[i].delay} infinite alternate`,
            }}
            className="tool-float opacity-70"
          />
        ))}
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.35] tracking-tight">
        {words.map((word, wi) => (
          <span key={wi} className="inline">
            <span
              className="inline-block transition-all duration-300 ease-out"
              style={{
                opacity: wi < visibleCount ? 1 : 0,
                transform: wi < visibleCount ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {word}
            </span>
            {wi < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
      <p className="mt-4 text-sm text-ink-light">Tools I work with every day</p>
    </section>
  );
}
