import type {
  CreateMeetingInput,
  CreateMeetingResult,
  MeetingProvider,
  RecordingResult
} from "./meeting-provider";

/**
 * Zoom adapter boundary. Left unimplemented on purpose: wiring this up
 * for real requires a Zoom Server-to-Server OAuth app and its credentials
 * (MEETING_API_KEY / MEETING_API_SECRET), which this project does not
 * have. Implement each method against the Zoom REST API once those are
 * available — the rest of the app already depends only on the
 * MeetingProvider interface, so no other code needs to change.
 */
export class ZoomMeetingProvider implements MeetingProvider {
  readonly name = "zoom";

  async createMeeting(_input: CreateMeetingInput): Promise<CreateMeetingResult> {
    throw new Error(
      "ZoomMeetingProvider is not configured. Set MEETING_API_KEY / MEETING_API_SECRET and implement createMeeting against the Zoom API."
    );
  }

  async joinMeeting(_providerMeetingId: string): Promise<{ joinUrl: string }> {
    throw new Error("ZoomMeetingProvider is not configured.");
  }

  async endMeeting(_providerMeetingId: string): Promise<void> {
    throw new Error("ZoomMeetingProvider is not configured.");
  }

  async getRecording(_providerMeetingId: string): Promise<RecordingResult | null> {
    throw new Error("ZoomMeetingProvider is not configured.");
  }
}
