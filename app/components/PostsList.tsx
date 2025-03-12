'use client';

import type { PostsWithAuthorResponse } from '@/lib/features/posts/postTypes';
import { useLoadInfinitePosts } from '@/lib/hooks/useLoadInfinitePosts';
import { Post } from './Post';
import styled from 'styled-components';
type PostsProps = {
  initialData: PostsWithAuthorResponse;
};

const List = styled.ul`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 0;
`;

const LoadingText = styled.p`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const LoadingAnchor = styled.div`
  height: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ListItem = styled.li`
  padding-bottom: ${({ theme }) => theme.spacing.base};
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
      {isFetching && <LoadingText>Loading more posts...</LoadingText>}
      {attachLoadAnchor && <LoadingAnchor ref={ref} />}
    </>
  );
};
