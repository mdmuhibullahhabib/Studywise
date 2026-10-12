import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ConversationListItem {
  id: string;
  counterpartName: string;
  counterpartAvatarUrl?: string | null;
  lastMessagePreview: string;
  updatedAt: Date;
  unread?: boolean;
}

export function ConversationList({
  conversations,
  basePath,
  activeId
}: {
  conversations: ConversationListItem[];
  basePath: string;
  activeId?: string;
}) {
  if (conversations.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
        <MessagesSquare className="h-7 w-7 text-ink-300" />
        <p className="text-sm font-medium text-ink">No conversations yet.</p>
        <p className="text-meta text-ink-500">Messages you send or receive will show up here.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-line overflow-y-auto">
      {conversations.map((c) => (
        <li key={c.id}>
          <Link
            href={`${basePath}/${c.id}`}
            className={cn(
              "flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-paper-muted",
              activeId === c.id && "bg-paper-muted"
            )}
          >
            <Avatar name={c.counterpartName} src={c.counterpartAvatarUrl} size="sm" />
            <div className="min-w-0 flex-1">
              <p className={cn("truncate text-sm", c.unread ? "font-semibold text-ink" : "font-medium text-ink")}>
                {c.counterpartName}
              </p>
              <p className="truncate text-meta text-ink-500">{c.lastMessagePreview}</p>
            </div>
            {c.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-sage" aria-label="Unread" />}
          </Link>
        </li>
      ))}
    </ul>
  );
}
