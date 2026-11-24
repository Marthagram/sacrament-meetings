
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";
interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="card-link hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <Link href={`/meetings/${meeting.id}`} className="block">
        <h2>Sacrament Meeting</h2>
        <span>Date: {meeting.date}</span>
        <span>Presiding: {meeting.presiding}</span>
        <span>Conducting: {meeting.conducting}</span>
        <span>Opening Hymn: {meeting.openingHymn.title}</span>
        <span className="card-link-action">View Details →</span>
      </Link>

      <Link
        href={`/meetings/${meeting.id}/edit`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        Edit Meeting
      </Link>

        <form action={deleteMeeting.bind(null, meeting.id)} className="mt-4">
  <button
    type="submit"
    className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-400 transition-colors cursor-pointer"
  >
    Delete
  </button>
</form>
    </div>
  );
}
