'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';
import { PostsState, setPosts } from '@/lib/features/posts/postsSlice';
import type { Posts as PostType } from '@/lib/features/posts/postsValidation';
import { PayloadAction } from '@reduxjs/toolkit';

type PostsProps = {
  initialData: Omit<PostsState, 'currentPost'>;
};

export const Posts = ({ initialData }: PostsProps) => {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(setPosts(initialData));
    initialized.current = true;
  }

  const { posts } = store.getState().posts;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <a href={`/post/${post.id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
};
