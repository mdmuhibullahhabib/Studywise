"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Send, MessageCircle } from "lucide-react";
import { sendMessageAction } from "@/features/messaging/send-message-action";
import { MessageBubble, type MessageData } from "./message-bubble";
import { Avatar } from "@/components/ui/avatar";

export function MessageThread({
  conversationId,
  currentUserId,
  counterpartName,
  counterpartAvatarUrl,
  messages,
  headerActions
}: {
  conversationId: string;
  currentUserId: string;
  counterpartName: string;
  counterpartAvatarUrl?: string | null;
  messages: MessageData[];
  headerActions?: React.ReactNode;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    const content = draft;
    setDraft("");
    startTransition(async () => {
      await sendMessageAction({ conversationId, content });
      router.refresh();
    });
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3 md:px-5 md:py-4">
        <div className="flex items-center gap-3">
          <Avatar name={counterpartName} src={counterpartAvatarUrl} size="sm" />
          <p className="font-display font-semibold text-ink">{counterpartName}</p>
        </div>
        {headerActions && <div className="flex flex-wrap gap-2">{headerActions}</div>}
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-paper p-4 md:p-5">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <MessageCircle className="h-8 w-8 text-ink-300" />
            <p className="text-sm text-ink-500">Say hello to start the conversation.</p>
          </div>
        ) : (
          messages.map((m) => <MessageBubble key={m.id} message={m} isOwn={m.senderId === currentUserId} />)
        )}
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2 border-t border-line bg-white p-3 md:p-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message…"
          aria-label="Message"
          className="input flex-1"
        />
        <button
          type="submit"
          disabled={pending || !draft.trim()}
          aria-label="Send message"
          className="btn-primary !px-4"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
