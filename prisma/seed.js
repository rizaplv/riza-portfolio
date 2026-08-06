const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPw = await bcrypt.hash("riza2026", 10);
  await prisma.user.upsert({
    where: { username: "riza" },
    update: {},
    create: { username: "riza", password: hashedPw },
  });

  // About
  await prisma.about.deleteMany();
  await prisma.about.create({
    data: {
      bio: "Graphic Designer with 6+ years of experience, UI Designer, and 3D Generalist based in Jakarta. Blending visual communication design with spatial thinking to create impactful brand experiences.",
      avatar: "/avatar-placeholder.svg",
      skills: JSON.stringify(["Figma", "Adobe Illustrator", "Photoshop", "UI/UX Design", "3D Rendering", "Stage Design", "Video Editing", "Graphic Design"]),
      socials: JSON.stringify({ behance: "https://behance.net/rizaplv", linkedin: "https://linkedin.com/in/rizaplv", dribbble: "https://dribbble.com/rizaplv", instagram: "https://instagram.com/rizaplv" }),
    },
  });

  // Projects
  const projects = [
    { title: "PORTFOLIO 2026", slug: "portfolio-2026", category: "Graphic Design", description: "A curated showcase of my best work from 2023-2026 spanning graphic design, UI/UX, 3D stage design, and event production. This portfolio represents my multidisciplinary approach to visual communication.\n\nEach project demonstrates a unique challenge solved through design thinking — from brand identities to immersive event spaces.", coverImage: "/placeholder-cover.svg", images: JSON.stringify([]), tags: JSON.stringify(["Portfolio", "Showcase", "2026"]), year: 2026, featured: true },
    { title: "Wanderstyle Quiz Page", slug: "wanderstyle-quiz-ui", category: "UI Design", description: "An immersive travel personality quiz designed for a travel agency campaign. The UI combines editorial typography with cinematic travel photography to create an engaging user experience.\n\nThe design features a responsive layout optimized for both desktop and mobile, with a luxury travel aesthetic using gold accents and high-contrast hero imagery.", coverImage: "/placeholder-cover.jpg", images: JSON.stringify([]), tags: JSON.stringify(["UI Design", "Mobile", "Travel", "Quiz"]), year: 2025, featured: true },
    { title: "UX Case Study — Voyager", slug: "voyager-ux-case-study", category: "UI Design", description: "A comprehensive UX case study for Voyager — a travel exploration platform. The project involved user research, wireframing, prototyping, and user testing to create an intuitive browsing experience for travelers.\n\nKey features include personalized itinerary builder, social travel recommendations, and seamless booking integration.", coverImage: "/placeholder-cover.jpg", images: JSON.stringify([]), tags: JSON.stringify(["UX Design", "Case Study", "Travel", "Web"]), client: "Personal Project", year: 2025, featured: true },
    { title: "Wisuda Akbar STAN 2019", slug: "wisuda-akbar-stan-2019", category: "Event Production", description: "Stage design and event production for the grand graduation ceremony of STAN (State College of Accountancy) 2019. The event featured an immersive stage setup spanning over 40 meters with synchronized LED screens and dramatic lighting sequences.\n\nMy role included the complete 3D stage design, visual production planning, and on-site event supervision.", coverImage: "/placeholder-cover.jpg", images: JSON.stringify([]), tags: JSON.stringify(["Stage Design", "3D", "Graduation", "Event Production"]), client: "PKN STAN", year: 2019, featured: true },
    { title: "Wisuda Akbar PKN STAN 2018", slug: "wisuda-akbar-pkn-stan-2018", category: "Event Production", description: "The 2018 graduation ceremony for PKN STAN featuring an elaborate stage design with a majestic backdrop, layered panel structures, and coordinated lighting design.\n\nDesigned to accommodate over 2000 guests with optimal sight lines throughout the auditorium.", coverImage: "/placeholder-cover.jpg", images: JSON.stringify([]), tags: JSON.stringify(["Stage Design", "3D", "Graduation", "Event"]), client: "PKN STAN", year: 2018, featured: false },
    { title: "Danapala Hall", slug: "danapala-hall", category: "3D Stage Design", description: "A 3D architectural visualization of a multipurpose hall with stage configurations for various event types — conferences, awards ceremonies, and performances. The design explores lighting dynamics and screen placement for optimal audience experience.", coverImage: "/placeholder-cover.jpg", images: JSON.stringify([]), tags: JSON.stringify(["3D", "Stage", "Architecture", "Rendering"]), client: "Personal Project", year: 2024, featured: false },
    { title: "HWI Indonesia", slug: "hwi-indonesia", category: "Graphic Design", description: "Brand identity and marketing collateral for HWI (Health Wellness Indonesia). The project included logo design, packaging, social media templates, and promotional materials.\n\nThe visual direction focused on a natural, organic aesthetic with earthy color tones to convey health and wellness values.", coverImage: "/placeholder-cover.jpg", images: JSON.stringify([]), tags: JSON.stringify(["Branding", "Logo", "Marketing", "Packaging"]), client: "HWI Indonesia", year: 2023, featured: false },
  ];

  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }

  console.log("✅ Seed complete! Login: riza / riza2026");
  console.log(`   ${projects.length} projects created`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
