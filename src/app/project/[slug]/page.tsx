import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import GalleryBox from "@/components/GalleryBox";
import { Metadata } from "next";

export const revalidate = 60; // ISR 60s — enables client hydration + static page

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let project: any = null;
  try {
    project = await prisma.project.findUnique({ where: { slug } });
  } catch {}
  if (!project) return {};

  const description = project.description.substring(0, 160);
  const ogImage = project.coverImage || "https://rizaplv.vercel.app/og-image.png";

  return {
    title: `${project.title} — Muhammad Riza Pahlevie`,
    description,
    openGraph: {
      title: `${project.title} — Muhammad Riza Pahlevie`,
      description,
      type: "article",
      url: `https://rizaplv.vercel.app/project/${project.slug}`,
      images: [{ url: ogImage, alt: project.title }],
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Muhammad Riza Pahlevie`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://rizaplv.vercel.app/project/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let project: any = null;
  try {
    project = await prisma.project.findUnique({ where: { slug } });
  } catch {}

  if (!project) notFound();

  const tags: string[] = JSON.parse(project.tags || "[]");
  const images: string[] = JSON.parse(project.images || "[]");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.description.substring(0, 160),
    image: project.coverImage,
    author: { "@type": "Person", name: "Muhammad Riza Pahlevie" },
    publisher: { "@type": "Organization", name: "Riza Portfolio" },
    datePublished: project.createdAt,
    dateModified: project.updatedAt,
    about: {
      "@type": "CreativeWork",
      name: project.title,
      category: project.category,
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 page-enter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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

      <Reveal delay={1} className="bg-surface rounded-2xl overflow-hidden mb-12">
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-contain absolute inset-0 w-full h-full"
            unoptimized={project.coverImage?.includes("supabase.co") || false}
          />
        </div>
      </Reveal>

      <Reveal delay={0} className="prose prose-lg max-w-none mb-16">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <div className="text-ink-light leading-relaxed whitespace-pre-wrap">{project.description}</div>
      </Reveal>

      {images.length > 0 && (
        <Reveal delay={0} className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <GalleryBox images={images} title={project.title} />
        </Reveal>
      )}
    </article>
  );
}
