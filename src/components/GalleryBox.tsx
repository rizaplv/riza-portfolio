// src/components/GalleryBox.tsx — single column masonry gallery, no lightbox
// Images use their natural aspect ratio so photos with different
// orientations (landscape, portrait, square) flow organically in the column.
"use client";

import { useInView } from "react-intersection-observer";

interface GalleryBoxProps {
  images: string[];
  title?: string;
}

// Shared alt-label helper for a tight, semantic gallery
const altFor = (title: string, i: number) => `${title} — image ${i + 1}`;

export default function GalleryBox({ images, title = "Gallery" }: GalleryBoxProps) {
  // For small galleries (≤ 10 images), eager-load all for instant UX.
  // For larger ones, lazy-load via Intersection Observer with placeholder.
  const eagerCount = Math.min(10, images.length);

  return (
    <div className="masonry-gallery">
      {images.map((img, i) => (
        <MasonryItem
          key={i}
          src={img}
          alt={altFor(title, i)}
          eager={i < eagerCount}
        />
      ))}
    </div>
  );
}

// Individual masonry item: lazy-loads only when scrolled near viewport.
// Uses natural image aspect ratio (no forced aspect ratio) so that
// varying photo ratios create the organic masonry flow.
function MasonryItem({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  eager: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "400px 0px",
  });

  const shouldLoad = inView || eager;

  return (
    <figure
      ref={ref}
      className="masonry-item mb-3 break-inside-avoid rounded-xl overflow-hidden bg-surface border border-border shadow-sm relative block w-full"
    >
      {shouldLoad ? (
        // Native <img> — preserves the natural aspect ratio of every photo.
        // No width/height props => browser uses the intrinsic ratio, which is
        // exactly what a masonry column wants.
        <img
          src={src}
          alt={alt}
          className="masonry-img w-full h-auto object-top"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ height: "auto", width: "100%" }}
        />
      ) : (
        // Lightweight placeholder while waiting for viewport
        <div className="absolute inset-0 aspect-[4/3] bg-surface animate-pulse" />
      )}
    </figure>
  );
}
