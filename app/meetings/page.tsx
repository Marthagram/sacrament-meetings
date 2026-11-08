import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingsPage() {
  return (
    <div>
      <div className="hero">
        <h2>All Meetings</h2>
        <p>Browse all sacrament meeting programs</p>
      </div>

      <Suspense fallback={<p>Loading meetings...</p>}>
        <MeetingsList />
      </Suspense>
    </div>
  );
}

async function MeetingsList() {
  const res = await fetch('http://localhost:3000/api/meetings', {
    cache: 'no-store',
  });
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <div>
      <div className="meetings-banner">
        <p>{meetings.length} programs found</p>
      </div>

      <div className="quick-links">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}