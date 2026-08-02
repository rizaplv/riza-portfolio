import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ReactMarkdown from "react-markdown";

export default function ProgressPage() {
  const mdPath = path.join(process.cwd(), "PROGRESS.md");

  if (!fs.existsSync(mdPath)) {
    notFound();
  }

  const md = fs.readFileSync(mdPath, "utf8");

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 page-enter">
      <Reveal delay={0}>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-4 mt-8" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-2 mt-6" {...props} />,
            table: ({ node, ...props }) => (
              <table className="w-full border-collapse my-4 text-sm" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="border border-border px-3 py-2 text-left bg-canvas-alt" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-border px-3 py-2" {...props} />
            ),
            p: ({ node, ...props }) => <p className="mb-3 leading-relaxed text-ink-light" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-ink-light" {...props} />
            ),
          }}
        >
          {md}
        </ReactMarkdown>
      </Reveal>
    </article>
  );
}
