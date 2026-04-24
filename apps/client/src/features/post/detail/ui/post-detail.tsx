'use client';

import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { ImageOff } from 'lucide-react';
import { LikeButton } from '@/features/like/ui';
import { ShareButton } from '@/features/post/share/ui';
import { PostDetailSkeleton, PostDetailError } from '@/features/post/detail/ui';
import { useGetPostSuspenseQuery } from '@/features/post/detail/api/useGetPostQuery';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import { timeAgo } from '@/shared/lib/utils';

interface PostDetailProps {
  id: number;
}

function PostDetail({ id }: PostDetailProps) {
  const { data: item } = useGetPostSuspenseQuery(id);

  return (
    <article className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-muted">
          {item.pet.imageUrl ? (
            <img
              src={item.pet.imageUrl}
              alt={item.pet.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff size={14} className="text-muted-foreground" />
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-foreground">{item.pet.name}</span>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {item.imageUrls.map((url, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-square max-h-[60svh] w-full bg-muted">
                <img
                  src={url}
                  alt={`${item.pet.name} ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {item.imageUrls.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>

      <div className="flex items-center gap-1 px-4">
        <LikeButton
          submissionId={item.id}
          initialLikeCount={item.likeCount}
          initialIsLiked={item.isLiked}
        />
        <ShareButton postId={item.id} />
      </div>

      <div className="px-4 pb-4 text-xs text-muted-foreground">{timeAgo(item.createdAt)}</div>
    </article>
  );
}

export default withErrorBoundary(withSuspense(PostDetail, <PostDetailSkeleton />), PostDetailError);
