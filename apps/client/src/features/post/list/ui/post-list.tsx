'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { useTranslations } from 'next-intl';
import { useGetPostsSuspenseInfiniteQuery } from '@/features/post/list/api/useGetPostsInfiniteQuery';
import { PostItem, PostListSkeleton, PostListError } from '@/features/post/list/ui';

function PostList() {
  const t = useTranslations('post');
  const tc = useTranslations('common');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPostsSuspenseInfiniteQuery();

  const { ref, inView } = useInView();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const posts = data.pages.flatMap(page => page.data);

  const virtualizer = useWindowVirtualizer({
    count: posts.length + (hasNextPage ? 1 : 0),
    estimateSize: index => (index === posts.length ? 40 : 520),
    overscan: 3,
    measureElement: el => el.getBoundingClientRect().height,
  });

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-sm">{t('noPosts')}</p>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="px-4 pt-4"
      style={{ position: 'relative', height: virtualizer.getTotalSize() }}
    >
      {virtualizer.getVirtualItems().map(virtualRow => (
        <div
          key={virtualRow.key}
          data-index={virtualRow.index}
          ref={virtualizer.measureElement}
          className="pb-6"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
          }}
        >
          {virtualRow.index < posts.length ? (
            <PostItem item={posts[virtualRow.index]} />
          ) : (
            <div ref={ref} className="flex justify-center py-4">
              {isFetchingNextPage && (
                <p className="text-xs text-muted-foreground">{tc('loading')}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default withErrorBoundary(withSuspense(PostList, <PostListSkeleton />), PostListError);
