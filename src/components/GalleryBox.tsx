// src/components/GalleryBox.tsx — clean lightbox dengan UX yang benar
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryBoxProps {
  images: string[];
  title?: string;
}

export default function GalleryBox({ images, title = "Gallery" }: GalleryBoxProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const openAt = (i: number) => {
    setIdx(i);
    setLoaded(false);
    setOpen(true);
  };
  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(images.length - 1, i + 1));
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, idx, images.length]);

  return (
    <>
      {/* Thumbnail grid — responsive, 2-4 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="relative group rounded-xl overflow-hidden bg-surface border border-border hover:ring-2 ring-accent transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={img}
                alt={`${title} #${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading={i < 3 ? "eager" : "lazy"}
                unoptimized={img?.includes("supabase.co") || false}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay — full viewport, black bg */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {}} // click bg — no auto close (avoid conflict with arrows)
          >
            {/* Top: counter + close */}
            <div className="fixed top-5 left-0 right-0 flex items-center justify-between px-6 z-[10000]">
              <span className="text-white/60 text-sm font-mono">
                {idx + 1} / {images.length}
              </span>
              <button
                onClick={close}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Image — centered, object-contain, full viewport */}
            <motion.div
              key={idx}
              initial={{ opacity: 0.6, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.6, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-10 w-10 text-white/20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}
              <Image
                src={images[idx]}
                alt={`${title} #${idx + 1}`}
                width={2200}
                height={1800}
                className="object-contain w-full h-auto"
                onLoadingComplete={() => setLoaded(true)}
                unoptimized={images[idx]?.includes("supabase.co") || false}
                priority
              />
            </motion.div>

            {/* Bottom: thumbnail strip + caption */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 overflow-x-auto py-2 px-4 bg-black/50 rounded-2xl">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all
                    ${i === idx
                      ? "border-white ring-1 ring-accent"
                      : "border-white/20 hover:border-white/50"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={img?.includes("supabase.co") || false}
                  />
                </button>
              ))}
            </div>

            {/* Nav arrows — kiri/kanan, Z di atas image */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  disabled={idx === 0}
                  className="fixed left-6 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14
                             flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20
                             text-white text-2xl disabled:opacity-30 disabled:cursor-not-allowed
                             transition-colors"
                  aria-label="Previous"
                >
                  ◀
                </button>
                <button
                  onClick={next}
                  disabled={idx === images.length - 1}
                  className="fixed right-6 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14
                             flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20
                             text-white text-2xl disabled:opacity-30 disabled:cursor-not-allowed
                             transition-colors"
                  aria-label="Next"
                >
                  ▶
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
