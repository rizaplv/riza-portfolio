export default function Loading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="spinner">
        <span />
        <span />
        <span />
      </div>
      <p className="text-sm text-ink-light animate-pulse">{label}</p>
    </div>
  );
}
