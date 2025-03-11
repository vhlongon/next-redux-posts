import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { useGetInfinitePostsInfiniteQuery } from '../features/posts/postsApiSlice';
import { PostsResponse } from '../features/posts/postTypes';

export const useLoadInfinitePosts = (initialData: PostsResponse) => {
  const { data, isLoading, error, fetchNextPage, isFetching } =
    useGetInfinitePostsInfiniteQuery({
      limit: initialData.limit,
      skip: initialData.skip,
    });
  const { ref, entry } = useIntersectionObserver();
  const queryPosts = data?.pages.flatMap(page => page.posts) ?? [];
  const total = initialData.total;
  const hasMore = Boolean(queryPosts.length && queryPosts.length < total);
  const loadMorePosts =
    entry?.isIntersecting && !isFetching && !isLoading && hasMore;

  useEffect(() => {
    if (loadMorePosts) {
      fetchNextPage();
    }
  }, [loadMorePosts, fetchNextPage]);

  const posts = isLoading ? initialData.posts : queryPosts;

  return { posts, ref, error, isFetching, isLoading };
};
