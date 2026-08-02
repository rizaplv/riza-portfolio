import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(projects);
  } catch (e: any) {
    console.error("GET /api/projects failed:", e?.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug,
        category: body.category,
        description: body.description || "",
        coverImage: body.coverImage || "/placeholder-cover.jpg",
        images: JSON.stringify(body.images || []),
        tags: JSON.stringify(body.tags || []),
        client: body.client || null,
        year: body.year || null,
        featured: body.featured || false,
        published: body.published !== false,
      },
    });

    return NextResponse.json(project);
  } catch (e: any) {
    console.error("POST /api/projects failed:", e?.message);
    return NextResponse.json({ error: e?.message || "Create failed" }, { status: 500 });
  }
}
