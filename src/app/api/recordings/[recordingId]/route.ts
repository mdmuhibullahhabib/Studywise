import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { storageService } from "@/services/storage.service";

/**
 * Recordings are never served from a public URL. This route re-derives the
 * user's identity from the server session, checks they own the booking the
 * recording belongs to (or are an admin), and only then issues a
 * short-lived signed download URL.
 */
export async function GET(_request: Request, context: { params: Promise<{ recordingId: string }> }) {
  const { recordingId } = await context.params;

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const recording = await db.recording.findUnique({
    where: { id: recordingId },
    include: { booking: true }
  });

  if (!recording) {
    return NextResponse.json({ error: "Recording not found." }, { status: 404 });
  }

  const isOwner =
    session.user.id === recording.booking.studentId || session.user.id === recording.booking.mentorId;
  if (!isOwner && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "You don't have permission to view this." }, { status: 403 });
  }

  if (recording.status !== "READY") {
    return NextResponse.json({ error: `Recording is ${recording.status.toLowerCase()}.` }, { status: 409 });
  }

  const signedUrl = await storageService.getSignedDownloadUrl(recording.storageKey);
  return NextResponse.redirect(signedUrl);
}
