export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="meetings-banner">
        <h2>Sacrament Meeting Programs</h2>
        <p>Browse past and upcoming programs</p>
      </div>
      {children}
    </section>
  );
}