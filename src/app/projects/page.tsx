import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: any[] = [];

  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    projects = [];
  }

  const parsedProjects = projects.map((p) => ({
    ...p,
    tags: JSON.parse(p.tags || "[]"),
    images: JSON.parse(p.images || "[]"),
  }));

  return (
    <section className="px-6 sm:px-16 py-16 max-w-7xl mx-auto page-enter">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-light hover:text-ink transition-colors mb-10"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
        </svg>
        Back to Home
      </Link>

      <Reveal className="mb-12">
        <p className="text-sm font-medium text-accent tracking-widest uppercase mb-2">Portfolio</p>
        <h1 className="text-4xl font-bold">All Projects</h1>
      </Reveal>

      {parsedProjects.length > 0 ? (
        <ProjectGrid projects={parsedProjects} />
      ) : (
        <div className="text-center py-20 text-ink-light">
          <p className="text-lg mb-4">Projects are being loaded from the database.</p>
          <p>Run the seed script to populate initial data.</p>
        </div>
      )}
    </section>
  );
}
