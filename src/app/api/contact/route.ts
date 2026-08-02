import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  source?: string;
}

// Create transporter lazily — supports both SMTP and (future) Resend
function createTransporter() {
  // Priority: SMTP (works reliably), fallback to Resend
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback: Gmail SMTP via OAuth2-less App Password (if GMAIL_APP_PASSWORD set)
  if (process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "rizaplv@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  return null;
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

    const transporter = createTransporter();

    if (!transporter) {
      console.warn("No SMTP/Resend configured — skipping email dispatch (mock success)");
      return NextResponse.json({ success: true, id: "mock" });
    }

    const mailHtml = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; padding: 24px; color: #1f2937;">
        <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">New message from Portfolio site</h1>
        <p><strong>Name:</strong> ${body.name} ${company ? `(${company})` : ""}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h2 style="font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin: 20px 0 8px;">Message</h2>
        <p style="white-space: pre-wrap; line-height: 1.6;">${body.message}</p>
        ${source ? `<p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">Source: ${source}</p>` : ""}
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || "Portfolio Contact <rizaplv@gmail.com>",
      to: "rizaplv@gmail.com",
      subject: company ? `[${source || "Portfolio"}] ${subject} — ${company}` : `[${source || "Portfolio"}] ${subject}`,
      html: mailHtml,
      replyTo: body.email,
    });

    return NextResponse.json({ success: true, id: info.messageId });
  } catch (e: any) {
    console.error("POST /api/contact failed:", e?.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
