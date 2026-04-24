import { PostDetail } from '@/features/post/detail/ui';
import { ServerFetchBoundary } from '@/shared/boundary/server-fetch-boundary';
import { getPostQueryOptions } from '@/features/post/detail/api/useGetPostQuery';

interface PostModalProps {
  params: Promise<{ postId: string }>;
}

export default async function PostModal({ params }: PostModalProps) {
  const { postId: postIdParam } = await params;
  const postId = Number(postIdParam);

  return (
    <ServerFetchBoundary queryOptions={getPostQueryOptions(postId)}>
      <PostDetail id={postId} />
    </ServerFetchBoundary>
  );
}
