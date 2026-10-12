import Link from "next/link";
import { MessageSquare } from "lucide-react";

export function MessageBell({ href, unreadCount }: { href: string; unreadCount: number }) {
  return (
    <Link
      href={href}
      aria-label={unreadCount > 0 ? `Messages, ${unreadCount} unread` : "Messages"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors duration-150 hover:bg-ink/5 hover:text-ink"
    >
      <MessageSquare className="h-[18px] w-[18px]" />
      {unreadCount > 0 && (
        <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-gold ring-2 ring-paper" aria-hidden="true" />
      )}
    </Link>
  );
}
