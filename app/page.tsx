import Link from 'next/link';
import  Image  from 'next/image';

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <h2>Welcome to Abuja Ward</h2>
        <p>Find this Sunday&apos;s sacrament meeting program, hymns, speakers, and announcements.</p>
        <Link href="/meetings/current" className="btn-primary">
          View This Sunday&apos;s Program →
        </Link>
      </section>
      
      <Image
        src="/images/sacrament-meeting-pictures.webp"
        alt="picture of a sacrament meeting"
        width={698}
        height={400}
        loading="eager"
      
        className="hidden md:inline-block "
      />


      <section>
        <h3>Quick Links</h3>
        <div className="quick-links">
          <Link href="/meetings" className="card-link">
            <strong>All Meetings</strong>
            <span>Browse past programs</span>
          </Link>
          <Link href="/meetings/current" className="card-link">
            <strong>This Sunday</strong>
            <span>Current program</span>
          </Link>
        </div>
      </section>
    </div>
  );
}