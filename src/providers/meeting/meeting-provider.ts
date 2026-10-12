/**
 * MeetingProvider — the interface every video backend must implement.
 *
 * The rest of the app (booking flow, meeting room, recording pipeline)
 * only ever talks to this interface via MeetingService, never to a
 * specific vendor SDK. Swapping Zoom for Google Meet or a WebRTC stack
 * later means writing one new adapter, not touching feature code.
 */

export interface CreateMeetingInput {
  bookingId: string;
  scheduledStart: Date;
  durationMinutes: number;
  hostName: string;
  guestName: string;
}

export interface CreateMeetingResult {
  providerMeetingId: string;
  joinUrl: string;
}

export interface RecordingResult {
  status: "PROCESSING" | "READY" | "FAILED";
  storageKey?: string;
  durationSeconds?: number;
  downloadUrl?: string; // short-lived signed URL, never a permanent public link
}

export interface MeetingProvider {
  readonly name: string;
  createMeeting(input: CreateMeetingInput): Promise<CreateMeetingResult>;
  joinMeeting(providerMeetingId: string, participantName: string): Promise<{ joinUrl: string }>;
  endMeeting(providerMeetingId: string): Promise<void>;
  getRecording(providerMeetingId: string): Promise<RecordingResult | null>;
}
