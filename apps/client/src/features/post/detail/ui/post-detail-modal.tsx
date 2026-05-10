'use client';

import { Dialog, DialogContent, DialogTitle } from '@/shared/ui';
import React from 'react';
import PostDetail from '@/features/post/detail/ui/post-detail';
import type { PostItem } from '@pawboo/schemas/post';

interface PostDetailModalProps {
  id: number;
  open: boolean;
  onClose: () => void;
  relatedPosts?: PostItem[];
}

function PostDetailModal({ id, open, onClose, relatedPosts }: PostDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent
        blur={true}
        showCloseButton={true}
        aria-describedby={undefined}
        onClick={() => onClose()}
        onPointerDownOutside={e => {
          if (e.detail.originalEvent.button !== 0) {
            e.preventDefault();
          }
        }}
      >
        <DialogTitle className="sr-only">Post</DialogTitle>
        <PostDetail id={id} relatedPosts={relatedPosts} />
      </DialogContent>
    </Dialog>
  );
}

export default PostDetailModal;
