'use client';

import { setCurrentPost } from '@/lib/features/posts/postsSlice';
import type { Post as PostType } from '@/lib/features/posts/postsValidation';
import { useLoadStore } from '@/lib/hooks/useLoadStore';
import { Post } from './Post';

export const SinglePost = (props: PostType) => {
  // Initialize the store with the product information once
  useLoadStore(setCurrentPost(props));

  return <Post {...props} />;
};
