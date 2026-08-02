import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isLoggedIn: boolean;
  username: string;
}

const sessionOptions = {
  cookieName: "riza-portfolio-session",
  password:
    process.env.SESSION_SECRET ||
    "x7R9mP2vN4kL8wQ1aZ3bY6cH5tF0j",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}