
import { Suspense } from 'react';
import MeetingDetail from '@/components/MeetingDetails';
import { getMeetingById } from '@/lib/meetings-db';

// 1. Outer page is NOT async, does NOT touch params
export default function MDPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        {/* 2. Pass the whole params PROMISE down, don't await it here */}
        <MeetingDetailPage params={params} />
      </Suspense>
    </div>
  );
}

// 3. Inner page IS async, and IS inside Suspense — safe to await params here
async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = getMeetingById(Number(id));

  if (!meeting) {
    return <p>Meeting not found.</p>;
  }

  return <MeetingDetail meeting={meeting} />;
}