import { Suspense } from 'react';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from './edit-form';
import { notFound } from 'next/navigation';

export default function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading meeting details...</p>}>
      <MeetingData params={params} />
    </Suspense>
  );
}

async function MeetingData({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return <EditMeetingForm meeting={meeting} />;
}