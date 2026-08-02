"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "Animos simplifies the process for designers &",
  "creatives, enabling them to easily showcase their",
  "designs and create stunning animations",
];

export default function AnimatedStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0); // how many words have appeared

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(1); // start the cascade
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // total words across all lines
  const totalWords = LINES.join(" ").split(" ").length;
  // "quickly" is the last faded word
  const quicklyIndex = totalWords; // 1-based index for the extra faded word

  let wordCounter = 0;

  return (
    <section
      ref={ref}
      className="px-6 py-section max-w-4xl mx-auto text-center"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.25] tracking-tight">
        {LINES.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi) => {
              wordCounter += 1;
              const show = revealed >= wordCounter;
              return (
                <span
                  key={wi}
                  className="inline-block transition-all duration-500 ease-out"
                  style={{
                    opacity: show ? 1 : 0,
                    transform: show ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: `${wordCounter * 70}ms`,
                  }}
                >
                  {word}
                  {" "}
                </span>
              );
            })}
          </span>
        ))}
        {/* the faded "quickly" word */}
        <span className="block">
          <span
            className="inline-block transition-all duration-700 ease-out text-ink/30"
            style={{
              opacity: revealed >= quicklyIndex ? 0.4 : 0,
              transform: revealed >= quicklyIndex ? "translateY(0)" : "translateY(8px)",
              transitionDelay: `${quicklyIndex * 70}ms`,
            }}
          >
            quickly
          </span>
        </span>
      </h2>
    </section>
  );
}
