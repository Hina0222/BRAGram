'use client';

import { memo } from 'react';
import { Link } from '@/app/i18n/navigation';
import { ImageOff } from 'lucide-react';
import { LikeButton } from '@/features/like/ui';
import { ShareButton } from '@/features/post/share/ui';
import type { PostItem as PostItemType } from '@pawboo/schemas/post';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import { timeAgo } from '@/shared/lib/utils';

interface PostItemProps {
  item: PostItemType;
}

export const PostItem = memo(function PostItem({ item }: PostItemProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="flex items-center gap-2 p-4">
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
              <div className="relative aspect-square w-full bg-muted">
                <img
                  src={url}
                  alt={`${item.pet.name} ${i + 1}`}
                  className="h-full w-full object-cover"
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

      <div className="flex items-center justify-between px-4 py-2">
        <LikeButton
          submissionId={item.id}
          initialLikeCount={item.likeCount}
          initialIsLiked={item.isLiked}
        />
        <ShareButton postId={item.id} />
      </div>

      <div className="px-4 pb-3 text-xs text-muted-foreground">{timeAgo(item.createdAt)}</div>
    </article>
  );
});
