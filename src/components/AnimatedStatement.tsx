"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function AnimatedStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const words = TEXT.split(" ");

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
      className="px-6 py-section max-w-4xl mx-auto text-center"
    >
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
    </section>
  );
}
