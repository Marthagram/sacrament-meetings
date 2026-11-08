import { Suspense } from 'react';
import MeetingDetail from '@/components/MeetingDetails';
import type { SacramentMeeting } from '@/lib/types';

// the code here is for the page that shows the details of a specific sacrament meeting based on its ID.
//  It fetches the meeting data from an API and displays it using the MeetingDetail component.

export default function MeetingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <div className="hero">
        <h2>Meeting Details</h2>
        <p>View details for a specific sacrament meeting</p>
      </div>

      <Suspense fallback={<p>Loading meeting details...</p>}>
        <MeetingDetailsContent params={params} />
      </Suspense>
    </div>
  );
}

async function MeetingDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <p>Meeting not found.</p>;
  }

  const meeting: SacramentMeeting = await res.json();

  return (
    <div className="quick-links">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}