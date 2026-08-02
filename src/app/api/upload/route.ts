import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Fallback to local disk for development
    if (!supabaseUrl || !supabaseKey) {
      const path = require("path");
      const fs = require("fs");
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const ext = path.extname(file.name) || ".jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      const bytes = await file.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(bytes));

      return NextResponse.json({ url: `/uploads/${fileName}` });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadRes = await fetch(
      `${supabaseUrl}/storage/v1/object/portfolio/${fileName}`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "true",
        },
        body: fileBuffer,
      }
    );

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error("Supabase upload error:", uploadRes.status, errorText);
      return NextResponse.json(
        { error: `Upload failed: ${uploadRes.status}` },
        { status: 500 }
      );
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio/${fileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (e: any) {
    console.error("Upload route error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}