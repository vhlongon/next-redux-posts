'use client';

import type { PostsWithAuthorResponse } from '@/lib/features/posts/postTypes';
import { useLoadInfinitePosts } from '@/lib/hooks/useLoadInfinitePosts';
import { Post } from './Post';
import styled from 'styled-components';
type PostsProps = {
  initialData: PostsWithAuthorResponse;
};

const List = styled.ul`
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 0;
`;

export const ListItem = styled.li`
  padding-bottom: 50px;
  list-style: none;
`;

export const PostsList = ({ initialData }: PostsProps) => {
  const { posts, ref, error, isFetching, isLoading } =
    useLoadInfinitePosts(initialData);
  const attachLoadAnchor = !isLoading && !isFetching;

  return (
    <>
      <List>
        {posts?.map(post => (
          <ListItem key={`post-${post.id}`}>
            <Post {...post} preview />
          </ListItem>
        ))}
      </List>
      {error && <div>{error.message}</div>}
      {isFetching && <p style={{ padding: '100px' }}>Loading more posts...</p>}
      {attachLoadAnchor && (
        <div style={{ height: '100px', padding: '100px' }} ref={ref} />
      )}
    </>
  );
};
