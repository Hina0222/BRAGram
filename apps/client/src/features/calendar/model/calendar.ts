import type { PostDetail } from '@pawboo/schemas/post';

export function groupPostsByDate(posts: PostDetail[]): Record<string, PostDetail[]> {
  return posts.reduce(
    (acc, post) => {
      const key = post.createdAt.slice(0, 10);
      if (!acc[key]) acc[key] = [];
      acc[key].push(post);
      return acc;
    },
    {} as Record<string, PostDetail[]>
  );
}
