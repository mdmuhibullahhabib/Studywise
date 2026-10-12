"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneOff } from "lucide-react";
import { endMeetingAction } from "@/features/meetings/end-meeting-action";

/**
 * UI + local state for the meeting room. Actual media capture/transport is
 * NOT wired to a real provider here — see MeetingProvider
 * (src/providers/meeting) for where that plugs in. This gives the correct
 * shape (controls, participant state, duration) to attach a real
 * WebRTC/Zoom/Meet SDK to later without changing this component's contract.
 */
export function MeetingRoom({
  meetingId,
  counterpartName,
  canEnd
}: {
  meetingId: string;
  counterpartName: string;
  canEnd: boolean;
}) {
  const router = useRouter();
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [connectionState, setConnectionState] = useState<"connecting" | "connected">("connecting");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setConnectionState("connected"), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (connectionState !== "connected") return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [connectionState]);

  async function handleEnd() {
    setEnding(true);
    await endMeetingAction(meetingId);
    router.push("/");
  }

  const mm = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const ss = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div className="flex h-screen flex-col bg-ink text-paper">
      <header className="flex items-center justify-between px-6 py-4">
        <p className="text-sm text-ink-300">
          {connectionState === "connecting" ? "Connecting…" : `Connected · ${mm}:${ss}`}
        </p>
        <p className="text-sm">with {counterpartName}</p>
      </header>

      <div className="flex flex-1 items-center justify-center gap-6 px-6">
        <div className="flex h-72 w-full max-w-md items-center justify-center rounded-lg bg-ink-700">
          {cameraOn ? (
            <p className="text-sm text-ink-300">Your camera</p>
          ) : (
            <VideoOff className="h-8 w-8 text-ink-300" />
          )}
        </div>
        <div className="hidden h-72 w-full max-w-md items-center justify-center rounded-lg bg-ink-700 md:flex">
          <p className="text-sm text-ink-300">{counterpartName}&apos;s camera</p>
        </div>
      </div>

      <footer className="flex items-center justify-center gap-3 pb-10 pt-4">
        <ControlButton active={micOn} onClick={() => setMicOn((v) => !v)} label={micOn ? "Mute" : "Unmute"}>
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </ControlButton>
        <ControlButton
          active={cameraOn}
          onClick={() => setCameraOn((v) => !v)}
          label={cameraOn ? "Stop camera" : "Start camera"}
        >
          {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </ControlButton>
        <ControlButton
          active={screenSharing}
          onClick={() => setScreenSharing((v) => !v)}
          label="Share screen"
        >
          <ScreenShare className="h-5 w-5" />
        </ControlButton>
        {canEnd && (
          <button
            onClick={handleEnd}
            disabled={ending}
            className="flex h-11 items-center gap-2 rounded-full bg-red-600 px-5 text-sm font-medium text-white disabled:opacity-60"
          >
            <PhoneOff className="h-4 w-4" /> {ending ? "Ending…" : "End meeting"}
          </button>
        )}
      </footer>
    </div>
  );
}

function ControlButton({
  active,
  onClick,
  label,
  children
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full ${
        active ? "bg-ink-700 text-paper" : "bg-paper text-ink"
      }`}
    >
      {children}
    </button>
  );
}
