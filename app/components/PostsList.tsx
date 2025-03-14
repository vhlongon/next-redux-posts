'use client';

import type { PostsWithAuthorResponse } from '@/lib/features/posts/postTypes';
import { useLoadInfinitePosts } from '@/lib/hooks/useLoadInfinitePosts';
import { useState } from 'react';
import styled from 'styled-components';
import { AddPostForm } from './AddPostForm';
import { Drawer } from './Drawer';
import { Post } from './Post';
import { Spinner } from './Spinner';

type PostsProps = {
  initialData: PostsWithAuthorResponse;
};

const PostTitle = styled.h2`
  text-align: center;
`;

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

const LoadingText = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const LoadingAnchor = styled.div`
  height: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ListItem = styled.li`
  padding-bottom: ${({ theme }) => theme.spacing.base};
  list-style: none;
`;

export const PostsList = ({ initialData }: PostsProps) => {
  const { posts, ref, error, isFetching, isLoading } = useLoadInfinitePosts(initialData);
  const attachLoadAnchor = !(isLoading || isFetching);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <AddPostButton onClick={handleOpenDrawer}>Add new</AddPostButton>
      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <PostTitle>Create New Post</PostTitle>
        <AddPostForm onSubmit={handleCloseDrawer} />
      </Drawer>
      <List data-testid="posts-list">
        {posts?.map((post) => (
          <ListItem key={`post-${post.id}`}>
            <Post {...post} preview />
          </ListItem>
        ))}
      </List>
      {error && <div>{error.message}</div>}
      {isFetching && (
        <LoadingText>
          <Spinner />
          <p>Loading more posts...</p>
        </LoadingText>
      )}
      {attachLoadAnchor && <LoadingAnchor ref={ref} />}
    </>
  );
};
