import NavLinks from "./NavLinks";
import { Suspense } from "react";

export default function Header() {
  const today = new Date(2026, 10, 14); // Note: Months are 0-indexed in JavaScript
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(today);

  return (
    <header className="site-header no-print">
      <div className="header-inner">
        <div>
          <h1 className="ward-name">Abuja Ward</h1>
          <p className="ward-subtitle">The Church of Jesus Christ of Latter-day Saints</p>
        </div>
        <p className="header-date">{formattedDate}</p>
      </div>

   <Suspense fallback={null}>
  <NavLinks />
    </Suspense>
    </header>
  );
}