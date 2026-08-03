import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Service role client for generating signed upload URL
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const ext = req.nextUrl.searchParams.get("ext") || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Generate signed upload URL (valid for 5 minutes)
    const { data, error } = await supabase.storage
      .from("portfolio")
      .createSignedUploadUrl(fileName);

    if (error || !data) {
      console.error("Signed URL error:", error);
      return NextResponse.json(
        { error: "Failed to generate upload URL" },
        { status: 500 }
      );
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio/${fileName}`;

    return NextResponse.json({
      signedUrl: data.signedUrl,
      path: data.path,
      publicUrl,
      token: data.token,
    });
  } catch (e: any) {
    console.error("Upload URL error:", e?.message);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
