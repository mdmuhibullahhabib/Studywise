import { randomUUID } from "crypto";
import type {
  CreateMeetingInput,
  CreateMeetingResult,
  MeetingProvider,
  RecordingResult
} from "./meeting-provider";

/**
 * Self-hosted WebRTC provider. This is the default so the app runs with
 * zero external credentials during development. `joinUrl` points at the
 * app's own protected meeting room route rather than a third-party host.
 *
 * Recording capture/processing for a real WebRTC deployment (e.g. via an
 * SFU with a recording egress service) is NOT implemented here — this
 * intentionally stops at the architecture boundary. Wire a real egress
 * pipeline into `getRecording` before relying on this in production.
 */
export class WebRTCMeetingProvider implements MeetingProvider {
  readonly name = "webrtc";

  async createMeeting(input: CreateMeetingInput): Promise<CreateMeetingResult> {
    const providerMeetingId = randomUUID();
    return {
      providerMeetingId,
      joinUrl: `/meetings/${providerMeetingId}`
    };
  }

  async joinMeeting(providerMeetingId: string): Promise<{ joinUrl: string }> {
    return { joinUrl: `/meetings/${providerMeetingId}` };
  }

  async endMeeting(): Promise<void> {
    // No-op for the self-hosted stub. A real SFU integration would tear
    // down the room and trigger recording finalization here.
  }

  async getRecording(): Promise<RecordingResult | null> {
    // Not implemented until a real recording egress pipeline is configured.
    return null;
  }
}
