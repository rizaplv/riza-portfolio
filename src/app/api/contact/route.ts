import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { ReactEmail } from "@/lib/email-template";

interface ContactBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  source?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    const { subject = "Portfolio Contact Form", company, source } = body;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — skipping email dispatch (mock success)");
      return NextResponse.json({ success: true, id: "mock" });
    }

    // Lazy-load Resend only when env is set
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["rizaplv@gmail.com"],
      subject: company
        ? `[${source || "Portfolio"}] ${subject} — ${company}`
        : `[${source || "Portfolio"}] ${subject}`,
      replyTo: body.email,
      react: React.createElement(ReactEmail, {
        name: body.name,
        email: body.email,
        subject,
        message: body.message,
        company,
        source,
      }),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e: any) {
    console.error("POST /api/contact failed:", e?.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
