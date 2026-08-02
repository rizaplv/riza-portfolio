"use client";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  priority: "high" | "medium" | "low";
  category: string;
}

const PROGRESS_VERSION = 4;

const initialTasks: Task[] = [
  { id: "1", title: "Setup Next.js + TypeScript + Tailwind", description: "Initialize project with Next.js 16, TypeScript, and Tailwind CSS v4", status: "completed", priority: "high", category: "Setup" },
  { id: "2", title: "Setup Prisma + SQLite", description: "Configure Prisma ORM with SQLite database for local development", status: "completed", priority: "high", category: "Setup" },
  { id: "3", title: "Build color system & design tokens", description: "Extract colors from Behance screenshots and create design system", status: "completed", priority: "high", category: "Design" },
  { id: "4", title: "Build portfolio frontend pages", description: "Hero, project grid, project detail pages with Behance-inspired design", status: "completed", priority: "high", category: "Frontend" },
  { id: "5", title: "Build admin dashboard", description: "Login page, project list, project CRUD, media upload", status: "completed", priority: "high", category: "Admin" },
  { id: "6", title: "Update content from CV", description: "Match About section, work experience, skills, and personal info with CV", status: "completed", priority: "high", category: "Content" },
  { id: "7", title: "Implement image upload to public/uploads/", description: "Upload cover image and gallery images to local filesystem", status: "completed", priority: "high", category: "Feature" },
  { id: "8", title: "Add GIF support + drag & drop reorder", description: "Support GIF uploads and drag-and-drop gallery reordering", status: "completed", priority: "medium", category: "Feature" },
  { id: "9", title: "Setup Vercel deployment configuration", description: "Prepare for Vercel deployment with PostgreSQL and Supabase Storage", status: "completed", priority: "high", category: "Deployment" },
  { id: "10", title: "Migrate database to PostgreSQL", description: "Update Prisma schema for PostgreSQL and test migration", status: "completed", priority: "high", category: "Deployment" },
  { id: "11", title: "Setup Supabase Storage", description: "Configure Supabase bucket for image uploads in production", status: "completed", priority: "high", category: "Deployment" },
  { id: "12", title: "Push to GitHub and deploy to Vercel", description: "Final deployment to production with all environment variables", status: "completed", priority: "high", category: "Deployment" },
  { id: "13", title: "Auto compress/resize images before upload", description: "Optimize images to reduce file size and improve loading speed", status: "completed", priority: "low", category: "Feature" },
  { id: "14", title: "Add SEO optimization", description: "Meta tags, Open Graph, structured data for better SEO", status: "completed", priority: "medium", category: "SEO" },
  { id: "15", title: "Add contact form email notification", description: "Send email notification when someone submits contact form (Resend API)", status: "completed", priority: "low", category: "Feature" },
  { id: "16", title: "Add logout button in admin dashboard", description: "Tombol logout di header admin agar bisa keluar dari sesi dengan aman", status: "completed", priority: "high", category: "Admin" },
];

export default function ProgressClient() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<string>("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("portfolio-progress");
    const savedVersion = localStorage.getItem("portfolio-progress-version");
    if (saved && savedVersion === String(PROGRESS_VERSION)) {
      try {
        const parsed = JSON.parse(saved);
        setTasks(parsed);
      } catch {}
    } else {
      // stale cache or first load — use initialTasks
      localStorage.setItem("portfolio-progress", JSON.stringify(initialTasks));
      localStorage.setItem("portfolio-progress-version", String(PROGRESS_VERSION));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("portfolio-progress", JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTasks = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const updateStatus = (id: string, status: Task["status"]) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };
  const categories = Array.from(new Set(tasks.map((t) => t.category)));

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700 border-green-300";
      case "in-progress": return "bg-blue-100 text-blue-700 border-blue-300";
      case "pending": return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-canvas-alt">
      <header className="bg-canvas border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-2">Project Progress</h1>
          <p className="text-ink-light">Track portfolio development progress</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-canvas rounded-xl border border-border p-6">
            <div className="text-3xl font-bold text-ink">{totalCount}</div>
            <div className="text-sm text-ink-light mt-1">Total Tasks</div>
          </div>
          <div className="bg-canvas rounded-xl border border-border p-6">
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-ink-light mt-1">Completed</div>
          </div>
          <div className="bg-canvas rounded-xl border border-border p-6">
            <div className="text-3xl font-bold text-blue-600">{inProgressCount}</div>
            <div className="text-sm text-ink-light mt-1">In Progress</div>
          </div>
          <div className="bg-canvas rounded-xl border border-border p-6">
            <div className="text-3xl font-bold text-gray-400">{pendingCount}</div>
            <div className="text-sm text-ink-light mt-1">Pending</div>
          </div>
        </div>

        <div className="bg-canvas rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <span className="text-2xl font-bold text-accent">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="bg-accent h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-xs text-ink-light mt-2">{completedCount} of {totalCount} tasks completed</p>
        </div>

        <div className="bg-canvas rounded-xl border border-border p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-accent text-white" : "bg-gray-100 text-ink-light hover:bg-gray-200"}`}>All ({totalCount})</button>
            <button onClick={() => setFilter("completed")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-ink-light hover:bg-gray-200"}`}>Completed ({completedCount})</button>
            <button onClick={() => setFilter("in-progress")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "in-progress" ? "bg-blue-600 text-white" : "bg-gray-100 text-ink-light hover:bg-gray-200"}`}>In Progress ({inProgressCount})</button>
            <button onClick={() => setFilter("pending")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "pending" ? "bg-gray-600 text-white" : "bg-gray-100 text-ink-light hover:bg-gray-200"}`}>Pending ({pendingCount})</button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-canvas rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-ink">{task.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>{task.status}</span>
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>{task.priority} priority</span>
                  </div>
                  <p className="text-sm text-ink-light mb-3">{task.description}</p>
                  <span className="text-xs text-ink-light bg-gray-50 px-2 py-1 rounded">{task.category}</span>
                </div>
                <div className="flex gap-2">
                  <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value as Task["status"])} className="text-sm border border-border rounded-lg px-3 py-1.5 bg-canvas focus:outline-none focus:border-accent">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-canvas rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Progress by Category</h2>
          <div className="space-y-3">
            {categories.map((category) => {
              const categoryTasks = tasks.filter((t) => t.category === category);
              const categoryCompleted = categoryTasks.filter((t) => t.status === "completed").length;
              const categoryPercent = categoryTasks.length > 0 ? Math.round((categoryCompleted / categoryTasks.length) * 100) : 0;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-xs text-ink-light">{categoryCompleted}/{categoryTasks.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: `${categoryPercent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-ink-light pb-8">
          <p>Portfolio Project Progress Tracker • Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
