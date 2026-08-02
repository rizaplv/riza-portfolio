import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let project: any = null;
  try {
    project = await prisma.project.findUnique({ where: { slug } });
  } catch {}

  if (!project) notFound();

  const tags: string[] = JSON.parse(project.tags || "[]");
  const images: string[] = JSON.parse(project.images || "[]");

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 page-enter">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-ink-light hover:text-ink transition-colors mb-10">
        ← Back to Work
      </Link>

      <Reveal delay={0} className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2.5 py-1 bg-accent-light text-accent rounded-full">{project.category}</span>
          {project.year && <span className="text-sm text-ink-light">{project.year}</span>}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
        {project.client && <p className="text-ink-light mb-4">Client: {project.client}</p>}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="text-sm text-ink-light px-3 py-1 bg-surface rounded-full">{tag}</span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={1} className="rounded-2xl overflow-hidden bg-surface mb-12">
        <img src={project.coverImage} alt={project.title} className="w-full h-auto object-contain" />
      </Reveal>

      <Reveal delay={0} className="prose prose-lg max-w-none mb-16">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <div className="text-ink-light leading-relaxed whitespace-pre-wrap">{project.description}</div>
      </Reveal>

      {images.length > 0 && (
        <Reveal delay={0} className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((img: string, i: number) => (
              <Reveal key={i} delay={i % 2} className="rounded-xl overflow-hidden bg-surface border border-border">
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </Reveal>
            ))}
          </div>
        </Reveal>
      )}
    </article>
  );
}