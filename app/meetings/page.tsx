import Link from 'next/link';
import { getAllMeetings } from '@/lib/meetings-db';


export default function MeetingsPage() {
  const meetings = getAllMeetings();

  return (
    <div>
      <div className="hero">
        <h2>All Meetings</h2>
        <p>{meetings.length} programs found</p>
      </div>

      <div className="quick-links">
        {meetings.map((meeting) => (
          <Link key={meeting.id} href={`/meetings/${meeting.id}`} className="card-link">
            <strong>{meeting.date} — {meeting.meetingType}</strong>
            <span>Conducting: {meeting.conducting}</span>
            <span>Presiding: {meeting.presiding}</span>
            <span>{meeting.speakers.length} speakers</span>
            <span>View Program →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}