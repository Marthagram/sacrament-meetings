import { Suspense } from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingsPage() {
  return (
    <div>
      <div className="hero">
        <h2>Meetings</h2>
        <p>View all sacrament meetings</p>
      </div>

      <Suspense fallback={<p>Loading meetings...</p>}>
        <MeetingsList />
      </Suspense>
    </div>
  );
}

async function MeetingsList() {
  let meetings: SacramentMeeting[] | null = null;
  let hasError = false;

  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/meetings`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      hasError = true;
    } else {
      meetings = await res.json();
    }
  } catch (error) {
    console.error('Failed to load meetings:', error);
    hasError = true;
  }

  if (hasError) {
    return <p>Could not load meetings. Please try again.</p>;
  }

  if (!meetings || meetings.length === 0) {
    return <p>No meetings found.</p>;
  }

  return (
    <div className="quick-links">
      {meetings.map((meeting) => {
        const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const typeLabel =
          meeting.meetingType === 'testimony'
            ? 'Testimony Meeting'
            : meeting.meetingType === 'stake'
            ? 'Stake Conference'
            : meeting.meetingType === 'general'
            ? 'General Conference'
            : 'Sacrament Meeting';

        return (
          <Link key={meeting.id} href={`/meetings/${meeting.id}`} className="card-link">
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                padding: '0.25rem 0.6rem',
                borderRadius: '20px',
                background: '#f0e9d8',
                color: '#1f3a5f',
                marginBottom: '0.5rem',
              }}
            >
              {typeLabel}
            </span>

            <strong style={{ display: 'block', fontSize: '1.1rem', color: '#1f3a5f', fontFamily: 'Georgia, serif' }}>
              {formattedDate}
            </strong>

            <span style={{ marginTop: '0.5rem' }}>
              <strong>Presiding:</strong> {meeting.presiding}
            </span>
            <span>
              <strong>Conducting:</strong> {meeting.conducting}
            </span>
            <span>
              <strong>Opening Hymn:</strong> #{meeting.openingHymn.number} — {meeting.openingHymn.title}
            </span>
            <span>
              <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
            </span>
            <span>
              <strong>Speakers:</strong> {meeting.speakers.map((s) => s.name).join(', ')}
            </span>

            {meeting.announcements && meeting.announcements.length > 0 && (
              <span
                style={{
                  marginTop: '0.5rem',
                  background: '#fdfcf8',
                  borderLeft: '3px solid #c5a880',
                  padding: '0.5rem 0.75rem',
                }}
              >
                📢 {meeting.announcements[0]}
              </span>
            )}

            <span style={{ marginTop: '0.75rem', color: '#1f3a5f', fontWeight: 600 }}>
              View Details →
            </span>
          </Link>
        );
      })}
    </div>
  );
}