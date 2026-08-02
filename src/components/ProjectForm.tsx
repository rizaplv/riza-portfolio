"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Graphic Design",
  "UI Design",
  "3D Stage Design",
  "Event Production",
  "Video Editing",
];

interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  coverImage: string;
  tags: string;
  client: string;
  year: string;
  featured: boolean;
  published: boolean;
  images: string;
}

interface ProjectFormProps {
  project?: any;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [exiting, setExiting] = useState(false);

  const navigateWithFade = (href: string) => {
    setExiting(true);
    setTimeout(() => router.push(href), 220);
  };
  const projectId = project?.projectId || project?.id || null;
  const [form, setForm] = useState<ProjectFormData>({
    title: "",
    category: "Graphic Design",
    description: "",
    coverImage: "/placeholder-cover.jpg",
    tags: "",
    client: "",
    year: "",
    featured: false,
    published: true,
    images: "",
  });
  const [saving, setSaving] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string>("/placeholder-cover.jpg");
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isGalleryDragOver, setIsGalleryDragOver] = useState(false);
  const [galleryDragOverIndex, setGalleryDragOverIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      const cover = project.coverImage || "/placeholder-cover.jpg";
      let images: string[] = [];
      if (Array.isArray(project.images)) {
        images = project.images;
      } else if (typeof project.images === "string") {
        try {
          const parsed = JSON.parse(project.images);
          images = Array.isArray(parsed) ? parsed : [];
        } catch {
          images = [];
        }
      }
      setForm({
        title: project.title || "",
        category: project.category || "Graphic Design",
        description: project.description || "",
        coverImage: cover,
        tags: Array.isArray(project.tags)
          ? project.tags.join(", ")
          : typeof project.tags === "string"
          ? (() => {
              try {
                return JSON.parse(project.tags).join(", ");
              } catch {
                return "";
              }
            })()
          : "",
        client: project.client || "",
        year: project.year?.toString() || "",
        featured: project.featured || false,
        published: project.published !== false,
        images: images.join("\n"),
      });
      setCoverPreview(cover);
      setGalleryPreviews(images);
    }
  }, [project]);

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadFile(file);
        setCoverPreview(url);
        setForm({ ...form, coverImage: url });
      } catch {
        alert("Failed to upload cover image");
      }
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadFile(file)));
      const newImages = [...galleryPreviews, ...urls];
      setGalleryPreviews(newImages);
      setForm({ ...form, images: newImages.join("\n") });
    } catch {
      alert("Failed to upload gallery images");
    }
    setUploading(false);
  };

  const removeGalleryImage = (index: number) => {
    const newImages = galleryPreviews.filter((_, i) => i !== index);
    setGalleryPreviews(newImages);
    setForm({ ...form, images: newImages.join("\n") });
  };

  const handleGalleryDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleGalleryDragOverItem = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setGalleryDragOverIndex(index);
  };

  const handleGalleryDropItem = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setGalleryDragOverIndex(null);
    const fromRaw = e.dataTransfer.getData("text/plain");
    const fromIndex = Number(fromRaw);
    if (!Number.isInteger(fromIndex) || fromIndex === targetIndex) return;
    const updated = [...galleryPreviews];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setGalleryPreviews(updated);
    setForm({ ...form, images: updated.join("\n") });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploading(true);
      try {
        const url = await uploadFile(file);
        setCoverPreview(url);
        setForm({ ...form, coverImage: url });
      } catch {
        alert("Failed to upload cover image");
      }
      setUploading(false);
    }
  };

  const handleGalleryDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsGalleryDragOver(true);
  };

  const handleGalleryDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsGalleryDragOver(false);
  };

  const handleGalleryDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsGalleryDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadFile(file)));
      const newImages = [...galleryPreviews, ...urls];
      setGalleryPreviews(newImages);
      setForm({ ...form, images: newImages.join("\n") });
    } catch {
      alert("Failed to upload gallery images");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      year: form.year ? parseInt(form.year) : null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      images: form.images.split("\n").map((t) => t.trim()).filter(Boolean),
    };

    const url = projectId ? `/api/projects/${projectId}` : "/api/projects";
    const method = projectId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      navigateWithFade("/admin");
    } else {
      alert("Failed to save");
    }
    setSaving(false);
  };

  return (
    <div className={`min-h-screen bg-canvas-alt transition-all duration-300 ease-out ${exiting ? "opacity-0 translate-y-2" : "opacity-100"}`}>
      <header className="bg-canvas border-b border-border h-16 flex items-center px-6">
        <div className="max-w-3xl w-full mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">{projectId ? "Edit Project" : "New Project"}</h1>
          <button onClick={() => navigateWithFade("/admin")} className="text-sm text-ink-light hover:text-ink transition-colors">
            Cancel
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-canvas rounded-xl border border-border p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-accent transition-colors" placeholder="Project title" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas focus:outline-none focus:border-accent transition-colors">
                {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Year</label>
              <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-accent transition-colors" placeholder="2025" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Client</label>
            <input type="text" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-accent transition-colors" placeholder="Client name (optional)" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Project description..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Cover Image</label>
            <div
              onClick={() => coverInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragOver ? "border-accent bg-accent-light/20" : "border-border hover:border-accent/50"}`}
            >
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*,video/gif"
                onChange={handleCoverUpload}
                className="hidden"
              />
              {coverPreview && !coverPreview.startsWith("/placeholder") ? (
                <div className="relative w-full">
                  <img src={coverPreview} alt="Cover preview" className="w-full h-64 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCoverPreview("/placeholder-cover.jpg");
                      setForm({ ...form, coverImage: "/placeholder-cover.jpg" });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto mb-3 text-ink-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium mb-1">Drop your cover image here</p>
                  <p className="text-xs text-ink-light">or click to browse</p>
                </div>
              )}
            </div>
            {uploading && <p className="text-xs text-ink-light mt-2">Uploading...</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Gallery Images</label>
            <div
              onClick={() => galleryInputRef.current?.click()}
              onDragOver={handleGalleryDragOver}
              onDragLeave={handleGalleryDragLeave}
              onDrop={handleGalleryDrop}
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isGalleryDragOver ? "border-accent bg-accent-light/20" : "border-border hover:border-accent/50"}`}
            >
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*,video/gif"
                multiple
                onChange={handleGalleryUpload}
                className="hidden"
              />
              {galleryPreviews.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto mb-3 text-ink-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium mb-1">Drop gallery images here</p>
                  <p className="text-xs text-ink-light">or click to browse multiple files</p>
                </div>
              ) : (
                <div className="w-full">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {galleryPreviews.map((img, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleGalleryDragStart(e, index)}
                        onDragOver={(e) => handleGalleryDragOverItem(e, index)}
                        onDrop={(e) => handleGalleryDropItem(e, index)}
                        onDragEnd={() => setGalleryDragOverIndex(null)}
                        className={`relative group cursor-move ${galleryDragOverIndex === index ? "ring-2 ring-accent" : ""}`}
                      >
                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-32 object-contain bg-surface rounded-lg" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeGalleryImage(index);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Drag to reorder
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-ink-light text-center">Click to add more images</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
              <span className="text-sm">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
              <span className="text-sm">Published</span>
            </label>
          </div>

          <button type="submit" disabled={saving || uploading}
            className={`w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 disabled:opacity-70 transition-all ${saving || uploading ? "btn-saving" : ""}`}
          >
            {saving ? "Saving..." : uploading ? "Uploading..." : projectId ? "Update Project" : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
