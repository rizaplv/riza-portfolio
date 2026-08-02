import prisma from "@/lib/prisma";
import ProjectGrid from "@/components/ProjectGrid";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let projects: any[] = [];
  let about: any = null;

  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {}

  try {
    about = await prisma.about.findFirst();
  } catch {}

  const parsedProjects = projects.map((p) => ({
    ...p,
    tags: JSON.parse(p.tags || "[]"),
    images: JSON.parse(p.images || "[]"),
  }));

  return (
    <>
      <Reveal as="section" className="min-h-[90vh] flex items-center px-6" delay={0}>
        <div className="max-w-7xl mx-auto w-full py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
              Available for Freelance & Fulltime
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Muhammad Riza Pahlevie
            </h1>
            <p className="text-xl text-ink-light mb-3">
              Graphic Designer, UI Designer & 3D Generalist
            </p>
            <p className="text-ink-light mb-10 max-w-lg leading-relaxed">
              Based in Tangerang Selatan, Indonesia. I craft visual identities, design intuitive interfaces, and build immersive 3D stage productions that leave lasting impressions.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#work" className="inline-flex px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors">
                View My Work
              </Link>
              <Link href="#contact" className="inline-flex px-8 py-3 border border-border text-ink rounded-full font-medium hover:bg-surface transition-colors">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="px-6 sm:px-16 py-section max-w-7xl mx-auto">
        <Reveal delay={0} className="mb-12">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-2">Portfolio</p>
          <h2 className="text-4xl font-bold">Selected Work</h2>
        </Reveal>
        {projects.length > 0 ? (
          <ProjectGrid projects={parsedProjects} />
        ) : (
          <div className="text-center py-20 text-ink-light">
            <p className="text-lg mb-4">Projects are being loaded from the database.</p>
            <p>Run the seed script to populate initial data.</p>
          </div>
        )}
      </section>

      <section id="about" className="px-16 py-section bg-canvas-alt">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal delay={0}>
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-3">About</p>
              <h2 className="text-4xl font-bold mb-6">The person behind the pixels</h2>
              <div className="space-y-4 text-ink-light leading-relaxed">
                <p>Graphic Designer with 5+ years of experience across visual communication, UI design, and live event production. Skilled in blending digital interfaces with immersive 3D stage design and event execution.</p>
                <p>Currently at Artha Kencana Cendekia, I develop stage concepts, produce visual content for live shows, and operate AV systems with a strong focus on delivering seamless productions.</p>
                <p>When I'm not designing, you'll find me running, cycling, or exploring Japanese and Korean culture.</p>
              </div>
              <div className="mt-10">
                <h3 className="font-semibold mb-4">Work Experience</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Graphic Designer</p>
                    <p className="text-sm text-ink-light">Artha Kencana Cendekia — Nov 2024 – Present</p>
                  </div>
                  <div>
                    <p className="font-medium">Compositor &amp; UI Designer</p>
                    <p className="text-sm text-ink-light">Mytripology — Mar 2021 – Nov 2024</p>
                  </div>
                  <div>
                    <p className="font-medium">Compositor</p>
                    <p className="text-sm text-ink-light">Firenze Digital — Feb 2020 – Sep 2020</p>
                  </div>
                  <div>
                    <p className="font-medium">Graphic Designer</p>
                    <p className="text-sm text-ink-light">PT Hero Supermarket Tbk — Nov 2019 – Jan 2020</p>
                  </div>
                  <div>
                    <p className="font-medium">Graphic Designer &amp; Multimedia Crew</p>
                    <p className="text-sm text-ink-light">INFINITE Live — Aug 2017 – Oct 2019</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-semibold mb-4">Education</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Bachelor's Degree, Design and Visual Communications</p>
                    <p className="text-sm text-ink-light">Universitas Mercu Buana — 2023</p>
                  </div>
                  <div>
                    <p className="font-medium">UI/UX Research &amp; Design Certification</p>
                    <p className="text-sm text-ink-light">Binar Academy — Dec 2023</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Adobe Premiere Pro", "Sketchup", "Blender", "Figma", "Resolume"].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm border border-border rounded-full text-ink-light">{skill}</span>
                ))}
              </div>
              <div className="mt-10">
                <h3 className="font-semibold mb-4">Connect</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="https://behance.net/rizaplv" target="_blank" rel="noopener" className="text-accent hover:underline">Behance</a>
                  <a href="https://linkedin.com/in/rizaplv" target="_blank" rel="noopener" className="text-accent hover:underline">LinkedIn</a>
                  <a href="https://dribbble.com/rizaplv" target="_blank" rel="noopener" className="text-accent hover:underline">Dribbble</a>
                  <a href="mailto:rizaplv@gmail.com" className="text-accent hover:underline">rizaplv@gmail.com</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1} className="bg-surface rounded-2xl aspect-[3/4] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-accent-light flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-accent">RP</span>
                </div>
                <p className="text-ink-light text-sm">Profile Photo</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal as="section" className="px-16 max-w-7xl mx-auto w-full" delay={0}>
        <ContactForm />
      </Reveal>
    </>
  );
}