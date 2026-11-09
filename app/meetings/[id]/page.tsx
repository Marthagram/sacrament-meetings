import { Suspense } from 'react';
import { headers } from 'next/headers';
import MeetingDetail from '@/components/MeetingDetails';
import type { SacramentMeeting } from '@/lib/types';

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
  let meeting: SacramentMeeting | null = null;
  let hasError = false;

  try {
    const { id } = await params;

    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/meetings/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      hasError = true;
    } else {
      meeting = await res.json();
    }
  } catch (error) {
    console.error('Failed to load meeting:', error);
    hasError = true;
  }

  if (hasError) {
    return <p>Could not load meeting. Please try again.</p>;
  }

  if (!meeting) {
    return <p>Meeting not found.</p>;
  }

  return (
    <div className="quick-links">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}