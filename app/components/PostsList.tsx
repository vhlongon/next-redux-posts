'use client';

import type { PostsWithAuthorResponse } from '@/lib/features/posts/postTypes';
import { useLoadInfinitePosts } from '@/lib/hooks/useLoadInfinitePosts';
import { Post } from './Post';
import styled from 'styled-components';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { AddPostForm } from './AddPostForm';

type PostsProps = {
  initialData: PostsWithAuthorResponse;
};

const AddPostButton = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl} auto;
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <AddPostButton onClick={handleOpenDrawer}>Add new</AddPostButton>
      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <h2 style={{ textAlign: 'center' }}>Create New Post</h2>
        <AddPostForm />
      </Drawer>
      <List data-testid="posts-list">
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
