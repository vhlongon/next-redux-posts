import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { fetchPosts } from '../api/posts';
import { setPosts, PostsState } from '../features/posts/postsSlice';
import { useAppSelector, useAppStore } from './storeHooks';

export const useLoadPosts = (initialData: Omit<PostsState, 'currentPost'>) => {
  const store = useAppStore();
  const initialized = useRef(false);
  const noMorePosts = useRef(false);

  if (!initialized.current) {
    store.dispatch(setPosts(initialData));
    initialized.current = true;
  }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { ref, isIntersecting } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  const { limit, skip, posts, total } = useAppSelector(state => state.posts);

  useEffect(() => {
    if (!isIntersecting || isLoading || noMorePosts.current) {
      return;
    }

    const addPosts = async () => {
      setIsLoading(true);
      try {
        const newPosts = await fetchPosts(limit, skip + posts.length);
        if (newPosts.length === 0) {
          noMorePosts.current = true;
          return;
        }
        const allPosts = [...posts, ...newPosts];
        store.dispatch(
          setPosts({
            limit,
            posts: allPosts,
            skip: skip + posts.length,
            total: allPosts.length,
          })
        );
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    addPosts();
  }, [isIntersecting, limit, skip, posts.length, total]);

  return { ref, isIntersecting, isLoading, limit, skip, posts, total, error };
};
