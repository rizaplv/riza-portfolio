import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isLoggedIn: boolean;
  username: string;
}

// iron-session v6+ REQUIRES password >= 32 chars or it throws on getSession().
// Fallback below is 64 chars so the app never crashes even if SESSION_SECRET env is unset.
// IMPORTANT: set SESSION_SECRET in Vercel for production security.
const FALLBACK_SECRET =
  "dev-fallback-session-secret-please-set-SESSION_SECRET-env-9f3aC7b2D8e1F4a6";

const sessionOptions = {
  cookieName: "riza-portfolio-session",
  password: process.env.SESSION_SECRET || FALLBACK_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
