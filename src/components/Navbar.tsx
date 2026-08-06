import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-ink">
          Riza<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/#work" className="text-sm text-ink-light hover:text-ink transition-colors">Work</Link>
          <Link href="/#about" className="text-sm text-ink-light hover:text-ink transition-colors">About</Link>
          <Link href="/#contact" className="text-sm px-4 py-2 bg-ink text-white rounded-full hover:bg-ink/90 transition-colors">Contact</Link>
        </div>
      </nav>
    </header>
  );
}