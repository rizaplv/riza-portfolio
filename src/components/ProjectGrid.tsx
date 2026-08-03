"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  tags: string[];
  year: number | null;
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work">
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
              filter === cat
                ? "bg-ink text-white border-ink"
                : "bg-transparent text-ink-light border-border hover:border-ink-light"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.slug}`}
            className="group relative block rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/30"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized={project.coverImage?.includes("supabase.co") || false}
              />
              {/* Bottom overlay: gradient + title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-xs font-medium px-2.5 py-0.5 bg-accent-light text-accent rounded-full inline-block mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-ink-light/80 max-w-[calc(100% - 1rem)] truncate">
                  {project.tags.map((tag) => `#${tag}`).join(" · ")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-ink-light py-20">No projects in this category yet.</p>
      )}
    </section>
  );
}
