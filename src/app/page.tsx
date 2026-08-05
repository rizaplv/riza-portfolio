import prisma from "@/lib/prisma";
import ProjectGrid from "@/components/ProjectGrid";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import AnimatedStatement from "@/components/AnimatedStatement";
import HeroBlock from "@/components/HeroBlock";
import Link from "next/link";

export const dynamic = "force-dynamic";

const CORE_SKILLS = ["UI/UX Design", "Visual Design", "3D Modeling", "Motion Graphics", "Branding", "Stage Design"];
const TOOLS = ["Photoshop", "Illustrator", "After Effects", "Premiere Pro", "SketchUp", "Blender", "Figma", "Resolume"];

const EXPERIENCE = [
  { title: "Graphic Designer & 3D Designer", company: "Artha Kencana Cendekia", period: "Nov 2024 – Present" },
  { title: "Compositor & UI Designer", company: "Mytripology", period: "Mar 2021 – Nov 2024" },
  { title: "Compositor", company: "Firenze Digital", period: "Feb 2020 – Sep 2020" },
  { title: "Graphic Designer", company: "PT Hero Supermarket Tbk", period: "Nov 2019 – Jan 2020" },
  { title: "Graphic Designer & Multimedia Crew", company: "INFINITE Live", period: "Aug 2017 – Oct 2019" },
];

export default async function HomePage() {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Muhammad Riza Pahlevie",
            url: "https://rizaplv.vercel.app",
            sameAs: [
              "https://behance.net/rizaplv",
              "https://linkedin.com/in/rizaplv",
            ],
            jobTitle: "Full-Stack Visual Designer",
            worksFor: { "@type": "Organization", name: "Artha Kencana Cendekia" },
          }),
        }}
      />
      {/* WebSite schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Muhammad Riza Pahlevie — Portfolio",
            url: "https://rizaplv.vercel.app",
            description: "Portfolio of Muhammad Riza Pahlevie — Graphic, Motion, UI Designer & 3D Generalist.",
          }),
        }}
      />

      <HeroBlock />

      <AnimatedStatement />

      <section id="work" className="px-6 sm:px-16 py-section max-w-7xl mx-auto">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0}>
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-2">Portfolio</p>
            <h2 className="text-4xl font-bold">Selected Work</h2>
          </Reveal>
          <Reveal delay={1} className="shrink-0">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              View All Projects
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
        {projects.length > 0 ? (
          <ProjectGrid projects={parsedProjects.filter((p) => p.featured)} />
        ) : (
          <div className="text-center py-20 text-ink-light">
            <p className="text-lg mb-4">Projects are being loaded from the database.</p>
            <p>Run the seed script to populate initial data.</p>
          </div>
        )}
      </section>

      <section id="about" className="px-16 py-section bg-canvas-alt page-enter">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left column: bio + experience */}
            <div className="space-y-10">
              <Reveal delay={0}>
                <p className="text-sm font-medium text-accent tracking-widest uppercase mb-3">About</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                  Multimedia designer & 3D Generalist
                </h2>
                <p className="text-ink-light max-w-md leading-relaxed">
                  Visual designer crafting graphics, interfaces, 3D, and motion that bring ideas to life.
                </p>
              </Reveal>

              <Reveal delay={1}>
                <h3 className="text-xs font-medium text-ink-light uppercase tracking-widest mb-3">Work Experience</h3>
                <div className="space-y-3">
                  {EXPERIENCE.map((exp) => (
                    <div key={exp.company} className="border-b border-border pb-2 last:border-0 last:pb-0">
                      <p className="font-medium text-ink">{exp.title}</p>
                      <p className="text-sm text-accent">{exp.company}</p>
                      <p className="text-xs text-ink-light">{exp.period}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right column: skills + tools + connect */}
            <div className="space-y-10">
              <Reveal delay={3}>
                <h3 className="text-xs font-medium text-ink-light uppercase tracking-widest mb-3">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {CORE_SKILLS.map((skill) => (
                    <span key={skill} className="px-3 py-1 text-xs bg-surface border border-border rounded-full text-ink-light">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={4}>
                <h3 className="text-xs font-medium text-ink-light uppercase tracking-widest mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((tool) => (
                    <span key={tool} className="px-3 py-1 text-xs border border-border rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={5}>
                <h3 className="text-xs font-medium text-ink-light uppercase tracking-widest mb-3">Education</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-ink">Bachelor's Degree, Design and Visual Communications</p>
                    <p className="text-sm text-ink-light">Universitas Mercu Buana — 2023</p>
                  </div>
                  <div>
                    <p className="font-medium text-ink">UI/UX Research & Design Certification</p>
                    <p className="text-sm text-ink-light">Binar Academy — Dec 2023</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={6}>
                <h3 className="text-xs font-medium text-ink-light uppercase tracking-widest mb-3">Connect</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="https://behance.net/rizaplv" target="_blank" rel="noopener" className="text-accent hover:underline">Behance</a>
                  <a href="https://linkedin.com/in/rizaplv" target="_blank" rel="noopener" className="text-accent hover:underline">LinkedIn</a>
                  <a href="mailto:rizaplv@gmail.com" className="text-accent hover:underline">rizaplv@gmail.com</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-16 max-w-7xl mx-auto w-full page-enter">
        <ContactForm />
      </section>
    </>
  );
}
