import { Star } from "lucide-react";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { moderateReviewAction } from "@/features/admin/admin-actions";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Reviews" };

export default async function AdminReviewsPage() {
  await requireRole("ADMIN");

  const reviews = await db.review.findMany({
    include: { student: true, mentor: true },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-h1">Reviews</h1>

      <div className="mt-6 space-y-3">
        {reviews.length === 0 ? (
          <div className="card p-10 text-center text-sm text-ink-500">No reviews yet.</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={review.student.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {review.student.name} → {review.mentor.name}
                    </p>
                    <p className="mt-0.5 text-meta text-ink-300">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <Badge variant={review.status === "PUBLISHED" ? "success" : review.status === "HIDDEN" ? "danger" : "warning"}>
                  {review.status.toLowerCase()}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-gold text-gold" : "text-ink-300"}`} />
                ))}
              </div>
              {review.review && <p className="mt-2 text-sm text-ink-500">{review.review}</p>}

              <div className="mt-3 flex gap-2">
                {review.status !== "HIDDEN" && (
                  <form action={moderateReviewAction}>
                    <input type="hidden" name="reviewId" value={review.id} />
                    <input type="hidden" name="status" value="HIDDEN" />
                    <SubmitButton variant="ghost" pendingLabel="…" className="!text-danger text-xs">
                      Hide
                    </SubmitButton>
                  </form>
                )}
                {review.status !== "PUBLISHED" && (
                  <form action={moderateReviewAction}>
                    <input type="hidden" name="reviewId" value={review.id} />
                    <input type="hidden" name="status" value="PUBLISHED" />
                    <SubmitButton variant="ghost" pendingLabel="…" className="text-xs">
                      Publish
                    </SubmitButton>
                  </form>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
