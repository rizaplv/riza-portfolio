import Link from "next/link";

export default function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className="bg-dark text-white">
      <div className={`max-w-7xl mx-auto px-6 ${compact ? "py-8" : "py-16"}`}>
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-lg font-bold mb-4">Muhammad Riza Pahlevie</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Graphic Designer, UI Designer and 3D Generalist based in Tangerang Selatan, Indonesia. Available for freelance and full-time opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/#work" className="hover:text-white transition-colors">Work</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="https://behance.net/rizaplv" target="_blank" rel="noopener" className="hover:text-white transition-colors">Behance</a></li>
                <li><a href="https://linkedin.com/in/rizaplv" target="_blank" rel="noopener" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://dribbble.com/rizaplv" target="_blank" rel="noopener" className="hover:text-white transition-colors">Dribbble</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        )}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Muhammad Riza Pahlevie. All rights reserved.</p>
          <p>Tangerang Selatan, Indonesia • rizaplv@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}