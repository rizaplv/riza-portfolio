// Server component — forces login before rendering /progress
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ProgressClient from "./ProgressClient";

export default async function ProgressPage() {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      redirect("/admin/login");
    }
  } catch {
    redirect("/admin/login");
  }
  return <ProgressClient />;
}
