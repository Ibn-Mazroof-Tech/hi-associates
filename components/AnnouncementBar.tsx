import { site } from "@/data/site";

export function AnnouncementBar() {
  // Rendered twice back-to-back so the -50% translateX loop is seamless.
  const track = [...site.announcementMessages, ...site.announcementMessages];

  return (
    <div className="overflow-hidden border-b border-[var(--color-line)] bg-white py-2">
      <div className="flex w-max animate-marquee">
        {track.map((msg, i) => (
          <span key={i} className="flex shrink-0 items-center whitespace-nowrap px-6 text-xs font-bold text-black">
            {msg}
            <span className="ml-6 text-[var(--color-seal)]" aria-hidden="true">
              &#8226;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
