import Link from "next/link";
import { ConversationService } from "@/features/messaging/conversation.service";
import { ConversationList } from "@/components/messaging/conversation-list";
import { MessageThread } from "@/components/messaging/message-thread";
import { requireSession } from "@/lib/permissions";

interface PageProps {
  params: Promise<{ conversationId: string }>;
}

export default async function StudentConversationPage({ params }: PageProps) {
  const { conversationId } = await params;
  const session = await requireSession();

  const [conversation, allConversations] = await Promise.all([
    ConversationService.getWithMessages(conversationId),
    ConversationService.listForCurrentUser()
  ]);

  const items = allConversations.map((c) => ({
    id: c.id,
    counterpartName: c.mentor.name,
    counterpartAvatarUrl: c.mentor.avatarUrl,
    lastMessagePreview: c.messages[0]?.content ?? "No messages yet",
    updatedAt: c.updatedAt,
    unread: c.unread
  }));

  return (
    <div className="card grid h-[calc(100vh-8rem)] md:grid-cols-[300px_1fr]">
      <div className="hidden border-r border-line md:block">
        <ConversationList conversations={items} basePath="/student/messages" activeId={conversationId} />
      </div>
      <MessageThread
        conversationId={conversation.id}
        currentUserId={session.user.id}
        counterpartName={conversation.mentor.name}
        counterpartAvatarUrl={conversation.mentor.avatarUrl}
        messages={conversation.messages}
        headerActions={
          <Link href={`/student/book/${conversation.mentorId}`} className="btn-secondary !px-3 !py-1.5 text-xs">
            Book session
          </Link>
        }
      />
    </div>
  );
}
