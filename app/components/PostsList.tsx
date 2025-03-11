'use client';

import { PostsState } from '@/lib/features/posts/postsSlice';
import { useLoadPosts } from '@/lib/hooks/useLoadPosts';

type PostsProps = {
  initialData: Omit<PostsState, 'currentPost'>;
};

export const PostsList = ({ initialData }: PostsProps) => {
  const { ref, posts, isLoading, error } = useLoadPosts(initialData);

  return (
    <>
      <ul>
        {posts?.map(post => (
          <li key={post.id} style={{ marginBottom: '150px' }}>
            <a href={`/post/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
      <div ref={ref} />
      {error && <div>{error.message}</div>}
      {isLoading && <h2>Loading...</h2>}
    </>
  );
};
