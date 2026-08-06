"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { useState, useEffect, Children, type ReactNode } from "react";

type TextLoopProps = {
  children: ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
};

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const intervalMs = interval * 1000;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  const motionVariants: Variants = {
    initial: { y: 12, opacity: 0, filter: "blur(4px)" },
    animate: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: { y: -12, opacity: 0, filter: "blur(4px)" },
  };

  return (
    <span
      className={["grid justify-center whitespace-nowrap", className].filter(Boolean).join(" ")}
      style={{ gridTemplateColumns: "max-content" }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          aria-hidden={index !== currentIndex}
          style={{ gridArea: "1 / 1" }}
          initial="exit"
          animate={index === currentIndex ? "animate" : "exit"}
          transition={transition}
          variants={variants || motionVariants}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
}
