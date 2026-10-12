import { ConversationService } from "@/features/messaging/conversation.service";
import { ConversationList } from "@/components/messaging/conversation-list";

export const metadata = { title: "Messages" };

export default async function StudentMessagesPage() {
  const conversations = await ConversationService.listForCurrentUser();

  const items = conversations.map((c) => ({
    id: c.id,
    counterpartName: c.mentor.name,
    counterpartAvatarUrl: c.mentor.avatarUrl,
    lastMessagePreview: c.messages[0]?.content ?? "No messages yet",
    updatedAt: c.updatedAt,
    unread: c.unread
  }));

  return (
    <div className="card grid h-[calc(100vh-8rem)] md:grid-cols-[300px_1fr]">
      {/* Mobile: list only. Desktop: list beside the empty-state prompt below. */}
      <div className="border-r border-line">
        <ConversationList conversations={items} basePath="/student/messages" />
      </div>
      <div className="hidden items-center justify-center text-sm text-ink-500 md:flex">
        Select a conversation to view messages.
      </div>
    </div>
  );
}
