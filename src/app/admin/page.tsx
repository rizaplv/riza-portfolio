"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";
import Reveal from "@/components/Reveal";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  featured: boolean;
  year: number | null;
  createdAt: string;
  updatedAt: string;
  _removing?: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [exiting, setExiting] = useState(false);

  const navigateWithFade = (href: string) => {
    setExiting(true);
    setTimeout(() => router.push(href), 220);
  };

  useEffect(() => {
    fetch("/api/projects")
      .then(async (r) => {
        if (r.status === 401) { setUnauthorized(true); return []; }
        const data = await r.json();
        if (!Array.isArray(data)) {
          console.error("Expected array, got:", typeof data);
          return [];
        }
        return data;
      })
      .then((data) => { setProjects(data); setLoading(false); })
      .catch((err) => { console.error("Fetch projects error:", err); setLoading(false); });
  }, []);

  if (unauthorized) { router.push("/admin/login"); return null; }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, _removing: true } : p))
    );
    setTimeout(() => {
      setProjects(projects.filter((p) => p.id !== id));
    }, 300);
  };

  return (
    <div className={`min-h-screen bg-canvas-alt transition-all duration-300 ease-out ${exiting ? "opacity-0 translate-y-2" : "opacity-100"}`}>
      <header className="bg-canvas border-b border-border h-16 flex items-center px-6">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">Portfolio Admin</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateWithFade("/admin/projects/new")} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
              + New Project
            </button>
            <Link href="/progress" className="text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-surface transition-colors">Check Progress</Link>
            <Link href="/" target="_blank" className="text-sm text-ink-light hover:text-ink transition-colors">View Site ↗</Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <Loading label="Loading projects..." />
        ) : (
          <div className="bg-canvas rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-canvas-alt">
                  <th className="text-left px-6 py-3 text-xs font-medium text-ink-light uppercase">Project</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ink-light uppercase">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ink-light uppercase">Year</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ink-light uppercase">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-ink-light uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, idx) => (
                  <Reveal as="tr" key={p.id} delay={idx} className={`border-b border-border last:border-0 hover:bg-canvas-alt/50 transition-all duration-300 ${p._removing ? "opacity-0 translate-x-4" : "opacity-100"}`}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-ink">{p.title}</p>
                      <p className="text-xs text-ink-light">/{p.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-0.5 bg-accent-light text-accent rounded-full">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-light">{p.year || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                      {p.featured && <span className="text-xs ml-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full">Featured</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => navigateWithFade(`/admin/projects/${p.id}/edit`)} className="text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-surface transition-colors">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
                      </div>
                    </td>
                  </Reveal>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-ink-light">No projects yet. Create your first one!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}