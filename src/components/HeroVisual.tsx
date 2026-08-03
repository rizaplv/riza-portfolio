"use client";

import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <motion.div
      className="relative h-[520px] w-full max-w-xl hidden lg:block ml-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-[60px] right-[80px] w-72 h-72 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[40px] left-[40px] w-56 h-56 rounded-full bg-gradient-to-tr from-accent-light/30 to-transparent blur-2xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating geometric shapes (representing design layers / frames) */}
      <motion.div
        className="absolute top-[80px] left-[30px] w-24 h-24 border-2 border-accent/30 rounded-xl bg-canvas/50 backdrop-blur-sm"
        animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[200px] right-[50px] w-16 h-20 border border-border/40 rounded-full bg-canvas-alt/50 flex items-center justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
      </motion.div>
      <motion.div
        className="absolute bottom-[120px] right-[80px] w-20 h-14 border-2 border-accent/20 rounded-lg bg-canvas/30 backdrop-blur-sm flex items-center gap-1 px-2"
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div className="w-1.5 h-4 bg-accent/40 rounded-full"></div>
        <div className="w-1.5 h-6 bg-accent/50 rounded-full"></div>
        <div className="w-1.5 h-3 bg-accent/30 rounded-full"></div>
        <div className="w-1.5 h-5 bg-accent/40 rounded-full"></div>
      </motion.div>

      {/* Waveform path (motion design line) */}
      <svg
        className="absolute bottom-[80px] left-0 w-full h-24 text-accent/20"
        viewBox="0 0 400 60"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 30 Q50 10 100 30 T200 30 T300 30 T400 30"
          stroke="currentColor"
          strokeWidth="1.5"
          className="stroke-accent/30"
          strokeLinecap="round"
        />
        <circle cx="100" cy="30" r="3" fill="currentColor" className="fill-accent" />
        <circle cx="200" cy="30" r="3" fill="currentColor" className="fill-accent" />
        <circle cx="300" cy="30" r="3" fill="currentColor" className="fill-accent" />
      </svg>

      {/* Subtle grid dots (design system reference) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 10 }).map((_, i) =>
            Array.from({ length: 6 }).map((_, j) => (
              <circle key={`${i}-${j}`} cx={i * 40 + 20} cy={j * 40 + 20} r="1" fill="currentColor" />
            ))
          )}
        </svg>
      </div>
    </motion.div>
  );
}
