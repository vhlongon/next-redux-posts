'use client';

import { setCurrentPost } from '@/lib/features/posts/postsSlice';
import type { Post as PostType } from '@/lib/features/posts/postsValidation';
import { useAppStore } from '@/lib/hooks/storeHooks';
import { useRef } from 'react';

export const Post = (props: PostType) => {
  // Initialize the store with the product information
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(setCurrentPost(props));
    initialized.current = true;
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.body}</p>
    </div>
  );
};
