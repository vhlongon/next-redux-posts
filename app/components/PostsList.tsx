'use client';

import { PostsResponse } from '@/lib/features/posts/postTypes';
import { useLoadInfinitePosts } from '@/lib/hooks/useLoadInfinitePosts';
import { Post } from './Post';

type PostsProps = {
  initialData: PostsResponse;
};

export const PostsList = ({ initialData }: PostsProps) => {
  const { posts, ref, error, isFetching, isLoading } =
    useLoadInfinitePosts(initialData);
  const attachLoadAnchor = !isLoading && !isFetching;

  return (
    <>
      <ul style={{ marginBottom: '100px' }}>
        {posts?.map(post => {
          return (
            <li
              key={post.id}
              style={{
                paddingBottom: '50xp',
                listStyle: 'none',
              }}
            >
              <Post {...post} shouldTruncate showLink />
            </li>
          );
        })}
      </ul>
      {error && <div>{error.message}</div>}
      {isFetching && <p style={{ padding: '100px' }}>Loading more posts...</p>}
      {attachLoadAnchor && (
        <div style={{ height: '100px', padding: '100px' }} ref={ref} />
      )}
    </>
  );
};
