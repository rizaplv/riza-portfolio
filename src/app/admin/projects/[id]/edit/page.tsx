"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ id }) => {
      fetch("/api/projects")
        .then((r) => (r.status === 401 ? router.push("/admin/login") : r.json()))
        .then((data) => {
          const p = data.find((d: any) => d.id === id);
          setProject(p || null);
          setLoading(false);
        });
    });
  }, [params, router]);

  if (loading) return <div className="min-h-screen bg-canvas-alt flex items-center justify-center"><p className="text-ink-light">Loading...</p></div>;
  if (!project) return <div className="min-h-screen bg-canvas-alt flex items-center justify-center"><p className="text-ink-light">Project not found</p></div>;

  return <ProjectForm project={{ ...project, projectId: project.id }} />;
}