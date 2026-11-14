import { Suspense } from 'react';
import MeetingDetails from '@/components/MeetingDetails';
import { getMeetingById } from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';
import MeetingDetailsSkeleton from '@/components/MeetingDetailsSkeleton';

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

      <Suspense fallback={<MeetingDetailsSkeleton />}>
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

  // ✅ DIRECT CALL - no fetch, no headers, no baseUrl
  const meeting: SacramentMeeting | null = await getMeetingById(Number(id));

  if (!meeting) {
    return <p>Meeting not found.</p>;
  }

  return (
    <div className="quick-links">
      <MeetingDetails meeting={meeting} />
    </div>
  );
}