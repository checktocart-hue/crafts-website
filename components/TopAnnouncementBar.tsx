import Link from "next/link";

export default function TopAnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-amber-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm transition-colors hover:bg-amber-700"
    >
      <span>Building your first miniature kit? </span>
      <Link
        href="https://craftsman353.gumroad.com/l/miniature-guide"
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-bold hover:text-amber-100 transition-colors inline-block ml-1"
      >
        Get the "Zero to Finished" eBook guide →
      </Link>
    </aside>
  );
}