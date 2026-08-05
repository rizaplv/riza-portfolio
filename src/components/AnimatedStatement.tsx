"use client";

import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";

const TOOLS = [
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "SketchUp", icon: "https://cdn.simpleicons.org/sketchup" },
  { name: "Resolume", icon: "/logos/resolume-arena.svg" },
];

// Circle positions: 8 icons at 45° steps starting at top, radius 250px
const R = 250;
const POSITIONS = TOOLS.map((_, i) => {
  const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.round(R * Math.cos(a)), y: Math.round(R * Math.sin(a)) };
});

export default function AnimatedStatement() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-section text-center">
      <Reveal>
        <div className="relative mx-auto h-[600px] w-full max-w-[600px]">
          <h2 className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Tools I Use
          </h2>

          <div className="absolute inset-0 origin-center scale-[0.5] sm:scale-[0.7] md:scale-100">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                aria-label={tool.name}
                className="tool-icon group absolute left-1/2 top-1/2"
                style={
                  {
                    "--i": i,
                    "--tx": `${POSITIONS[i].x}px`,
                    "--ty": `${POSITIONS[i].y}px`,
                  } as CSSProperties
                }
              >
                <div
                  className="tool-float flex h-24 w-24 items-center justify-center rounded-2xl bg-white dark:bg-surface shadow-[0_10px_30px_rgba(2,6,23,0.10)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/10"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <img
                    src={tool.icon}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="pointer-events-none h-14 w-14"
                  />
                </div>
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dark px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
