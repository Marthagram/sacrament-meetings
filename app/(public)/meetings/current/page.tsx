import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetingByDate } from '@/lib/meetings-db';

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

export default async function CurrentMeetingPage() {
  await connection(); // <-- this is the fix, tells Next 16 this is dynamic

  const sundayDate = getMostRecentSundayISO();
  const currentMeeting = await getMeetingByDate(sundayDate);

  if (!currentMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${currentMeeting.id}`);
}