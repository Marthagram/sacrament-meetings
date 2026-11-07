
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Sacrament Meeting Program
      </h1>

      <section>
        <h2>Meeting Information</h2>
        <p>Date: {meeting.date}</p>
        <p>Meeting Type: {meeting.meetingType}</p>
        <p>Presiding: {meeting.presiding}</p>
        <p>Conducting: {meeting.conducting}</p>
      </section>

      <section>
        <h2>Announcements</h2>
        {meeting.announcements?.map((announcement, index) => (
          <p key={index}>{announcement}</p>
        ))}
      </section>

      <section>
        <h2>Opening</h2>
        <p>
          Opening Hymn: {meeting.openingHymn.number} -{" "}
          {meeting.openingHymn.title}
        </p>
        <p>Opening Prayer: {meeting.openingPrayer}</p>
      </section>

      <section>
        <h2>Ward Business</h2>
        {meeting.wardBusiness.map((item, index) => (
          <p key={index}>{item.description}</p>
        ))}

        <p>
          Stake Business: {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      <section>
        <h2>Sacrament</h2>
        <p>
          Sacrament Hymn: {meeting.sacramentHymn.number} -{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section>
        <h2>Speakers and Musical Numbers</h2>
        {meeting.speakers.map((item, index) => (
          <p key={index}>
            {item.type === "speaker" ? "Speaker" : "Musical Number"}:{" "}
            {item.name}
            {item.topic && ` - ${item.topic}`}
          </p>
        ))}
      </section>

      <section>
        <h2>Closing</h2>
        <p>
          Closing Hymn: {meeting.closingHymn.number} -{" "}
          {meeting.closingHymn.title}
        </p>
        <p>Closing Prayer: {meeting.closingPrayer}</p>
      </section>

      
    </main>
  );
}
