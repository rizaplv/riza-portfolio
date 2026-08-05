"use client";

import type { CSSProperties, PointerEvent } from "react";

const TOOLS = [
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "SketchUp", icon: "https://cdn.simpleicons.org/sketchup" },
];

// Arch per card: edges lowest, middle pair highest (deck-of-cards fan, md+ only)
const ARCH = [0, -18, -30, -36, -36, -30, -18];

const SPRING = "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";

function startDrag(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.setPointerCapture(e.pointerId);
  el.dataset.x = "0";
  el.dataset.y = "0";
  el.dataset.dragging = "1";
  el.style.transition = "none";
  el.style.zIndex = "30";
}

function moveDrag(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  if (el.dataset.dragging !== "1") return;
  const x = (parseFloat(el.dataset.x ?? "0") || 0) + e.movementX;
  const y = (parseFloat(el.dataset.y ?? "0") || 0) + e.movementY;
  el.dataset.x = String(x);
  el.dataset.y = String(y);
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function endDrag(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.dataset.dragging = "";
  el.style.transition = SPRING;
  el.style.transform = "";
  el.style.zIndex = "";
}

export default function AnimatedStatement() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-section text-center">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
        Tools I Use
      </h2>
      <p className="mt-4 text-sm text-ink-light">
        The tools I reach for when designing and building digital products.
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:flex-nowrap md:gap-0">
        {TOOLS.map((tool, i) => (
          <div
            key={tool.name}
            title={tool.name}
            aria-label={tool.name}
            className={`touch-none select-none ${i === 0 ? "" : "md:-ml-6"} cursor-grab active:cursor-grabbing`}
            style={{ transition: SPRING }}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(2,6,23,0.10)] ring-1 ring-black/5 md:translate-y-[var(--arch)]"
              style={{ "--arch": `${ARCH[i]}px` } as CSSProperties}
            >
              <img
                src={tool.icon}
                alt=""
                loading="lazy"
                draggable={false}
                className="pointer-events-none h-8 w-8"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
