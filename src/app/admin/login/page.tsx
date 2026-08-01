"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-alt flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-ink-light text-sm">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-canvas p-8 rounded-2xl border border-border space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Username</label>
            <input type="text" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas focus:outline-none focus:border-accent transition-colors" autoFocus />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas focus:outline-none focus:border-accent transition-colors" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-ink text-white rounded-xl font-medium hover:bg-ink/90 disabled:opacity-50 transition-all">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}