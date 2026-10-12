import Link from "next/link";
import { ConversationService } from "@/features/messaging/conversation.service";
import { ConversationList } from "@/components/messaging/conversation-list";
import { MessageThread } from "@/components/messaging/message-thread";
import { requireSession } from "@/lib/permissions";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ conversationId: string }>;
}

export default async function MentorConversationPage({ params }: PageProps) {
  const { conversationId } = await params;
  const session = await requireSession();

  const [conversation, allConversations, upcomingMeeting] = await Promise.all([
    ConversationService.getWithMessages(conversationId),
    ConversationService.listForCurrentUser(),
    db.meeting.findFirst({
      where: { conversationId, status: { in: ["SCHEDULED", "LIVE"] } },
      orderBy: { scheduledStart: "asc" }
    })
  ]);

  const items = allConversations.map((c) => ({
    id: c.id,
    counterpartName: c.student.name,
    counterpartAvatarUrl: c.student.avatarUrl,
    lastMessagePreview: c.messages[0]?.content ?? "No messages yet",
    updatedAt: c.updatedAt,
    unread: c.unread
  }));

  return (
    <div className="card grid h-[calc(100vh-8rem)] md:grid-cols-[300px_1fr]">
      <div className="hidden border-r border-line md:block">
        <ConversationList conversations={items} basePath="/mentor/messages" activeId={conversationId} />
      </div>
      <MessageThread
        conversationId={conversation.id}
        currentUserId={session.user.id}
        counterpartName={conversation.student.name}
        counterpartAvatarUrl={conversation.student.avatarUrl}
        messages={conversation.messages}
        headerActions={
          <>
            {upcomingMeeting && (
              <Link href={`/meetings/${upcomingMeeting.id}`} className="btn-secondary !px-3 !py-1.5 text-xs">
                Join meeting
              </Link>
            )}
            <Link
              href={`/mentor/students/${conversation.studentId}`}
              className="btn-secondary !px-3 !py-1.5 text-xs"
            >
              View student
            </Link>
          </>
        }
      />
    </div>
  );
}
