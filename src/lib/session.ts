import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isLoggedIn: boolean;
  username: string;
}

const sessionOptions = {
  cookieName: "riza-portfolio-session",
  password: process.env.SESSION_SECRET || "a-very-long-and-secure-secret-key-for-dev-only-change-in-production",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
