"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import Loading from "@/components/Loading";

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

  if (loading) return <Loading label="Loading project..." />;
  if (!project) return <Loading label="Project not found" />;

  return <ProjectForm project={{ ...project, projectId: project.id }} />;
}
