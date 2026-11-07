'use client';
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold">
        Sacrament Meeting
      </h2>

      <p>Date: {meeting.date}</p>

      <p>Presiding: {meeting.presiding}</p>

      <p>Conducting: {meeting.conducting}</p>

      <p>Opening Hymn: {meeting.openingHymn.title}</p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="text-blue-600 underline"
      >
        View Details
      </Link>
    </div>
  );
}