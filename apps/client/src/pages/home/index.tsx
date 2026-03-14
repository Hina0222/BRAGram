'use client';

import { useState } from 'react';
import { BottomNav } from '@/widgets/bottom-nav';
import { TitleHeader } from '@/widgets/header';
import { FeedList } from '@/features/feed/list/ui';
import { CommentList } from '@/features/comment/list/ui';
import { CreateCommentForm } from '@/features/comment/create/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';

export default function HomePage() {
  const [commentSubmissionId, setCommentSubmissionId] = useState<number | null>(null);

  return (
    <div className="pb-20">
      <TitleHeader title="홈" />

      <FeedList onCommentClick={setCommentSubmissionId} />

      <Dialog
        open={commentSubmissionId !== null}
        onOpenChange={open => !open && setCommentSubmissionId(null)}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader className="shrink-0 border-b border-border px-5 py-4">
            <DialogTitle className="text-sm font-semibold">댓글</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {commentSubmissionId !== null && <CommentList submissionId={commentSubmissionId} />}
          </div>
          <div className="shrink-0 px-5 pb-6">
            {commentSubmissionId !== null && (
              <CreateCommentForm submissionId={commentSubmissionId} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
