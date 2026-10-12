import Link from "next/link";
import { Video, PlayCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MessageData {
  id: string;
  type: "TEXT" | "IMAGE" | "FILE" | "MEETING" | "RECORDING" | "SYSTEM";
  content: string | null;
  attachmentUrl: string | null;
  relatedId: string | null;
  createdAt: Date;
  senderId: string;
}

function timeLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
}

export function MessageBubble({ message, isOwn }: { message: MessageData; isOwn: boolean }) {
  if (message.type === "SYSTEM") {
    return (
      <p className="my-3 flex items-center justify-center gap-1.5 text-center text-meta text-ink-300">
        <Clock className="h-3 w-3" /> {message.content}
      </p>
    );
  }

  if (message.type === "MEETING") {
    return (
      <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
        <div className="card flex max-w-sm items-center gap-3 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sky-soft">
            <Video className="h-4 w-4 text-sky-text" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink">Session meeting</p>
            <p className="text-meta text-ink-500">Scheduled — join when it starts</p>
          </div>
          {message.relatedId && (
            <Link href={`/meetings/${message.relatedId}`} className="btn-secondary !px-3 !py-1.5 text-xs">
              Join
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (message.type === "RECORDING") {
    return (
      <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
        <div className="card max-w-sm p-4">
          <p className="text-sm font-semibold text-ink">Mentoring session</p>
          <p className="text-meta text-ink-500">{message.content}</p>
          <p className="mt-1 badge-success w-fit">Recording available</p>
          {message.relatedId && (
            <Link
              href={`/api/recordings/${message.relatedId}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-sage-text"
            >
              <PlayCircle className="h-4 w-4" /> Watch recording
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", isOwn ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-sm rounded-lg px-4 py-2.5 text-sm leading-relaxed",
          isOwn ? "bg-ink text-paper" : "bg-paper-muted text-ink"
        )}
      >
        {message.content}
      </div>
      <span className="mt-1 px-1 text-meta text-ink-300">{timeLabel(message.createdAt)}</span>
    </div>
  );
}
