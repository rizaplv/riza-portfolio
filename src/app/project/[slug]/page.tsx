import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-ink-light hover:text-ink transition-colors mb-10">
        ← Back to Work
      </Link>

      <div className="mb-12">
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
      </div>

      <div className="aspect-video rounded-2xl overflow-hidden bg-surface mb-12">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${project.coverImage})` }} />
      </div>

      <div className="prose prose-lg max-w-none mb-16">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <div className="text-ink-light leading-relaxed whitespace-pre-wrap">{project.description}</div>
      </div>

      {images.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img: string, i: number) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-surface">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}