"use client";

import { useEffect, useRef, useState } from "react";
import { isHtml, plainToHtml } from "@/lib/richText";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Project description...",
  minHeight = 160,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmittedRef = useRef<string | undefined>(undefined);
  const [active, setActive] = useState<Record<string, boolean>>({});

  // Sync external value (initial load, project switch, post-save refetch)
  // without fighting the caret: skip when the change originated from our
  // own onChange (parent echoes back the same html).
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (value === lastEmittedRef.current) return;
    el.innerHTML = isHtml(value) ? value : plainToHtml(value);
  }, [value]);

  const refreshActive = () => {
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    });
  };

  useEffect(() => {
    document.addEventListener("selectionchange", refreshActive);
    return () => document.removeEventListener("selectionchange", refreshActive);
  }, []);

  const sync = () => {
    const el = editorRef.current;
    if (!el) return;
    const html = el.innerHTML;
    // Guard: skip when value is empty but editor has a trailing <br>
    // (contentEditable keeps one when emptied) — avoids infinite churn.
    if (html === "<br>" && !value.trim()) return;
    lastEmittedRef.current = html;
    onChange(html);
  };

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    refreshActive();
    sync();
  };

  const handleLink = () => {
    const url = window.prompt("Link URL (https://…)");
    if (url && url.trim()) exec("createLink", url.trim());
    else exec("unlink");
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    sync();
  };

  const buttonClass = (isActive: boolean) =>
    `w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors hover:bg-surface active:bg-surface ${
      isActive ? "bg-accent-light text-accent font-semibold" : "text-ink-light"
    }`;

  return (
    <div className="rounded-xl border border-border focus-within:border-accent transition-colors overflow-hidden bg-canvas">
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-border bg-canvas-alt/50">
        <button
          type="button"
          title="Bold (Ctrl+B)"
          aria-label="Bold"
          aria-pressed={active.bold}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
          className={buttonClass(active.bold)}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          title="Italic (Ctrl+I)"
          aria-label="Italic"
          aria-pressed={active.italic}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className={buttonClass(active.italic)}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          title="Underline (Ctrl+U)"
          aria-label="Underline"
          aria-pressed={active.underline}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("underline")}
          className={buttonClass(active.underline)}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          title="Strikethrough"
          aria-label="Strikethrough"
          aria-pressed={active.strikethrough}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("strikeThrough")}
          className={buttonClass(active.strikethrough)}
        >
          <s>S</s>
        </button>

        <span className="w-px h-5 mx-1 bg-border" aria-hidden="true" />

        <button
          type="button"
          title="Bullet list"
          aria-label="Bullet list"
          aria-pressed={active.insertUnorderedList}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertUnorderedList")}
          className={buttonClass(active.insertUnorderedList)}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M8 6h13M8 12h13M8 18h13" />
            <circle cx="3.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="3.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="3.5" cy="18" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </button>
        <button
          type="button"
          title="Numbered list"
          aria-label="Numbered list"
          aria-pressed={active.insertOrderedList}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertOrderedList")}
          className={buttonClass(active.insertOrderedList)}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M10 6h11M10 12h11M10 18h11" />
            <path d="M3 5l1.5-1v4M3.5 9v1.5H6" />
            <path d="M3.5 16l1.6-1.7a1 1 0 1 0-1.4-1.4M3 19h2.2L3 21h2.6" />
          </svg>
        </button>

        <span className="w-px h-5 mx-1 bg-border" aria-hidden="true" />

        <button
          type="button"
          title="Insert link"
          aria-label="Insert link"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleLink}
          className={buttonClass(false)}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
        <button
          type="button"
          title="Clear formatting"
          aria-label="Clear formatting"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("removeFormat")}
          className={buttonClass(false)}
        >
          <span className="text-[10px] font-medium">Tx</span>
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
        aria-label={placeholder}
        onInput={sync}
        onPaste={handlePaste}
        className="rich-text px-4 py-3 focus:outline-none"
        style={{ minHeight }}
      />
    </div>
  );
}
