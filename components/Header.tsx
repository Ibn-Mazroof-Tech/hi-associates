import { TopBar } from "./TopBar";
import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <Navbar />
      <AnnouncementBar />
    </header>
  );
}
