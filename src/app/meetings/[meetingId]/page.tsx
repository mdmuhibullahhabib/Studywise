import { notFound } from "next/navigation";
import { requireSession, assertOwnsResource } from "@/lib/permissions";
import { db } from "@/lib/db";
import { MeetingRoom } from "@/components/meeting/meeting-room";

interface PageProps {
  params: Promise<{ meetingId: string }>;
}

export default async function MeetingPage({ params }: PageProps) {
  const { meetingId } = await params;
  const session = await requireSession();

  const meeting = await db.meeting.findUnique({
    where: { id: meetingId },
    include: { student: true, mentor: true }
  });
  if (!meeting) notFound();
  await assertOwnsResource(session, meeting.studentId, meeting.mentorId);

  if (meeting.status === "CANCELLED") {
    return (
      <div className="flex h-screen items-center justify-center bg-ink text-center text-paper">
        <p>This meeting was cancelled.</p>
      </div>
    );
  }

  // First participant to load the room flips it from SCHEDULED to LIVE.
  if (meeting.status === "SCHEDULED") {
    await db.meeting.update({ where: { id: meeting.id }, data: { status: "LIVE", startedAt: new Date() } });
  }

  const isMentor = session.user.id === meeting.mentorId;
  const counterpartName = isMentor ? meeting.student.name : meeting.mentor.name;

  return <MeetingRoom meetingId={meeting.id} counterpartName={counterpartName} canEnd={isMentor} />;
}
