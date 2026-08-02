"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
            className="group block rounded-2xl overflow-hidden bg-canvas-alt border border-border hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden bg-surface relative">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain group-hover:scale-105 transition-transform duration-500"
                unoptimized={project.coverImage?.includes("supabase.co") || false}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-0.5 bg-accent-light text-accent rounded-full">
                  {project.category}
                </span>
                {project.year && (
                  <span className="text-xs text-ink-light">{project.year}</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-ink group-hover:text-accent transition-colors mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-ink-light">
                    #{tag}
                  </span>
                ))}
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