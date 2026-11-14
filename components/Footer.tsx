export default function Footer() {
  const year = 2026;

  return (
    <footer className="site-footer no-print">
      <p>Abuja Ward • Sacrament Meeting Programs • © {year}</p>
      <p className="footer-muted">For ward use only. Please return programs after the meeting.</p>
    </footer>
  );
}