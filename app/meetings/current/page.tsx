import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getAllMeetings } from '@/lib/meetings-db';

function getMostRecentSundayISO(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function RedirectToCurrent() {
  await connection();

  const sundayDate = getMostRecentSundayISO();
  const meetings = getAllMeetings();

  const currentMeeting = meetings.find((m) => m.date === sundayDate);

  if (!currentMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${currentMeeting.id}`);

  return null;
}

export default function CurrentMeetingPage() {
  return (
    <Suspense fallback={null}>
      <RedirectToCurrent />
    </Suspense>
  );
}