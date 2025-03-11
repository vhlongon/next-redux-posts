'use client';

import { PostsState } from '@/lib/features/posts/postsSlice';
import { useLoadPosts } from '@/lib/hooks/useLoadPosts';
import Link from 'next/link';

type PostsProps = {
  initialData: Omit<PostsState, 'currentPost'>;
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

export const PostsList = ({ initialData }: PostsProps) => {
  const { ref, posts, isLoading, error } = useLoadPosts(initialData);

  return (
    <>
      <ul>
        {posts?.map(post => (
          <li
            key={post.id}
            style={{
              paddingTop: '50px',
              paddingBottom: '50xp',
              listStyle: 'none',
            }}
          >
            <h2>{post.title}</h2>
            <p>{truncateText(post.body, 100)}</p>
            <Link href={`/post/${post.id}`}>Read more</Link>
          </li>
        ))}
      </ul>

      <div style={{ height: '100px', padding: '100px' }} ref={ref} />
      {error && <div>{error.message}</div>}
      {isLoading && <h2>Loading...</h2>}
    </>
  );
};
