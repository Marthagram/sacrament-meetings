import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      // Your custom class + Tailwind classes together
      className="card-link hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <h2>Sacrament Meeting</h2>
      <span>Date: {meeting.date}</span>
      <span>Presiding: {meeting.presiding}</span>
      <span>Conducting: {meeting.conducting}</span>
      <span>Opening Hymn: {meeting.openingHymn.title}</span>
      <span className="card-link-action">View Details →</span>
    </Link>
  );
}