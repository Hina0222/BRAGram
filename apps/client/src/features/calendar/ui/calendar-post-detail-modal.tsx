'use client';

import { Dialog, DialogContent, DialogTitle } from '@/shared/ui';
import React from 'react';
import type { PostDetail } from '@pawboo/schemas/post';
import { CalendarPostDetail } from './calendar-post-detail';

interface CalendarPostDetailModalProps {
  posts: PostDetail[];
  open: boolean;
  onClose: () => void;
}

function CalendarPostDetailModal({ posts, open, onClose }: CalendarPostDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent
        blur={true}
        showCloseButton={true}
        aria-describedby={undefined}
        onPointerDownOutside={e => {
          if (e.detail.originalEvent.button !== 0) {
            e.preventDefault();
          }
        }}
      >
        <DialogTitle className="sr-only">Post</DialogTitle>
        <CalendarPostDetail posts={posts} onDeleted={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default CalendarPostDetailModal;
