import { BackHeader } from '@/widgets/header';
import { BottomNav } from '@/widgets/bottom-nav';
import { PostDetail } from '@/features/post/detail/ui';
import { ServerFetchBoundary } from '@/shared/boundary/server-fetch-boundary';
import { getPostQueryOptions } from '@/features/post/detail/api/useGetPostQuery';
import { useTranslations } from 'next-intl';

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId: postIdParam } = await params;
  const postId = Number(postIdParam);

  return (
    <div className="flex flex-col pb-20">
      <BackHeader title="포스트" />
      <ServerFetchBoundary queryOptions={getPostQueryOptions(postId)}>
        <PostDetail id={postId} />
      </ServerFetchBoundary>
      <BottomNav />
    </div>
  );
}
