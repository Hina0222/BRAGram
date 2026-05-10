'use client';

import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { LikeButton } from '@/features/like/ui';
import { PostDetailSkeleton, PostDetailError } from '@/features/post/detail/ui';
import { useGetPostSuspenseQuery } from '@/features/post/detail/api/useGetPostQuery';
import { useGetPetsQuery } from '@/features/pet/list/api/useGetPetsQuery';
import { Carousel, CarouselContent, CarouselItem, ConfirmDialog } from '@/shared/ui';
import { useRouter } from '@/app/i18n/navigation';
import { useDeletePostMutation } from '@/features/post/delete/api/useDeletePostMutation';
import { CarouselApi } from '@/shared/ui/carousel';
import React, { useEffect, useState } from 'react';
import LogoIcon from '@/shared/assets/icons/LogoIcon.svg';
import type { PostItem } from '@pawboo/schemas/post';
import { cn } from '@/shared/lib/utils';

interface PostDetailProps {
  id: number;
  relatedPosts?: PostItem[];
}

function PostDetail({ id, relatedPosts }: PostDetailProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  const { data: item } = useGetPostSuspenseQuery(id);
  const { data: pets } = useGetPetsQuery();
  const { mutate: deletePost, isPending } = useDeletePostMutation();
  const router = useRouter();

  const representativePetId = pets?.find(p => p.isRepresentative)?.id;
  const canDelete = representativePetId === item.pet.id;

  const handleDelete = () => {
    deletePost(id, { onSuccess: () => router.back() });
  };

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap());
    };

    update();
    api.on('select', update);

    return () => {
      api.off('select', update);
    };
  }, [api]);

  return (
    <article className="flex flex-col items-center gap-2">
      <Carousel className="w-full" setApi={setApi} onClick={e => e.stopPropagation()}>
        <CarouselContent>
          {relatedPosts
            ? relatedPosts.map((post, i) => (
                <CarouselItem key={post.id}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-[30px]">
                    <img
                      src={post.imageUrls[0]}
                      alt={`${item.pet.name} ${i + 1}`}
                      className="h-full w-full rounded-[30px] object-cover"
                    />
                  </div>
                </CarouselItem>
              ))
            : item.imageUrls.map((url, i) => (
                <CarouselItem key={i}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-[30px]">
                    <img
                      src={url}
                      alt={`${item.pet.name} ${i + 1}`}
                      className="h-full w-full rounded-[30px] object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        {relatedPosts && relatedPosts.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {relatedPosts.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full',
                  i === current ? 'h-3 w-3 bg-white' : 'h-2 w-2 bg-[#E1E1E3] opacity-40'
                )}
              />
            ))}
          </div>
        )}
        <LikeButton
          submissionId={relatedPosts ? relatedPosts[current].id : item.id}
          initialLikeCount={item.likeCount}
          initialIsLiked={item.isLiked}
        />
      </Carousel>

      {relatedPosts ? (
        <div className="flex gap-2 overflow-x-auto" onClick={e => e.stopPropagation()}>
          {relatedPosts.map((post, i) => (
            <div
              key={post.id}
              className={cn(
                'rounded-[8px] border',
                i === current ? 'bg-[#FFFFFF]' : 'bg-transparent'
              )}
            >
              <img
                src={post.imageUrls[0]}
                alt=""
                className="h-18 w-18 rounded-[8px] object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex cursor-pointer gap-x-2.5 rounded-full bg-[#333333CC] p-2 backdrop-blur-md"
          onClick={e => {
            e.stopPropagation();
            router.push(`/pets/${item.pet.id}`);
          }}
        >
          <div className="flex items-center gap-2">
            <div className="h-11 w-14 overflow-hidden rounded-full border border-[#F5F5F5]">
              {item.pet.imageUrl ? (
                <img
                  src={item.pet.imageUrl}
                  alt={item.pet.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#FADF78]">
                  <LogoIcon className="h-5 w-5 text-[#C59D07]" />
                </div>
              )}
            </div>
            <span className="font-medium text-[#E1E1E3]">{item.pet.name}</span>
          </div>
        </div>
      )}

      {canDelete && (
        <ConfirmDialog
          title={'정말 삭제 하겠습니까?'}
          isPending={isPending}
          onConfirm={handleDelete}
          trigger={
            <button
              onClick={e => {
                e.stopPropagation();
              }}
              className="font-medium text-[#E1E1E3] underline disabled:opacity-50"
            >
              삭제하기
            </button>
          }
        />
      )}
    </article>
  );
}

export default withErrorBoundary(withSuspense(PostDetail, <PostDetailSkeleton />), PostDetailError);
