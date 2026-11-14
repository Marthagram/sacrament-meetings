export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="meetings-banner">
        <h2>Sacrament Meeting Programs Manager</h2>
        <p>Manage sacrament meeting programs</p>
      </div>
      {children}
    </section>
  );
}