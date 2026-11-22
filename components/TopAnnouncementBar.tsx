import Link from "next/link";

export default function TopAnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-slate-950 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-medium shadow-sm border-b border-blue-900/60"
    >
      <Link
        href="/deals"
        className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 hover:text-amber-300 transition-colors"
      >
        <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 rounded">
          Black Friday Live
        </span>
        <span>
          Save <strong>20%–25% off Rolife</strong> with codes{" "}
          <strong className="text-amber-300">BFCM20</strong> /{" "}
          <strong className="text-amber-300">BFCM25</strong>
        </span>
        <span className="underline font-bold text-amber-300">
          Copy Codes &amp; Shop Deals →
        </span>
      </Link>
    </aside>
  );
}
