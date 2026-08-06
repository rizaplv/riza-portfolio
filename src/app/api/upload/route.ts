import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// Force Node.js runtime (supports larger body parsing — edge runtime limited to 4MB)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 25MB)" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const uploadRes = await fetch(
      `${supabaseUrl}/storage/v1/object/portfolio/${fileName}`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`, // fixed: full header value
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "true",
        },
        body: fileBuffer,
      }
    );

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error("Supabase upload error:", uploadRes.status, errorText);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio/${fileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (e: any) {
    console.error("Upload route error:", e?.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
