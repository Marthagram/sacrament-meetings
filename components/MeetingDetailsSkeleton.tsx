export default function MeetingDetailsSkeleton() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 animate-pulse" aria-hidden="true">
      {/* Title */}
      <div className="skeleton-title" />

      {/* Meeting Information */}
      <section className="skeleton-card">
        <div className="skeleton-heading" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line w-3/4" />
        <div className="skeleton-line w-1/2" />
      </section>

      {/* Announcements */}
      <section className="skeleton-card">
        <div className="skeleton-heading" />
        <div className="skeleton-line" />
        <div className="skeleton-line w-5/6" />
      </section>

      {/* Opening */}
      <section className="skeleton-card">
        <div className="skeleton-heading" />
        <div className="skeleton-line" />
        <div className="skeleton-line w-2/3" />
      </section>

      {/* Ward Business */}
      <section className="skeleton-card">
        <div className="skeleton-heading" />
        <div className="skeleton-line" />
        <div className="skeleton-line w-4/5" />
        <div className="skeleton-line w-1/3" />
      </section>

      {/* Sacrament */}
      <section className="skeleton-card">
        <div className="skeleton-heading" />
        <div className="skeleton-line w-2/3" />
      </section>

      {/* Speakers */}
      <section className="skeleton-card">
        <div className="skeleton-heading" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line w-3/4" />
      </section>

      {/* Closing */}
      <section className="skeleton-card">
        <div className="skeleton-heading" />
        <div className="skeleton-line" />
        <div className="skeleton-line w-2/3" />
      </section>
    </main>
  );
}