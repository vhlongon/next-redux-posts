import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { useGetInfinitePostsInfiniteQuery } from '../features/posts/postsApiSlice';
import { PostsWithAuthorResponse } from '../features/posts/postTypes';

export const useLoadInfinitePosts = (props: PostsWithAuthorResponse) => {
  const { data, isLoading, error, fetchNextPage, isFetching } =
    useGetInfinitePostsInfiniteQuery({
      limit: props.limit,
      skip: props.skip,
    });

  const { ref, entry } = useIntersectionObserver();

  const queryPosts = data?.pages.flatMap(page => page.posts) ?? [];
  const total = data?.pages[0]?.total ?? props.total;
  const hasMore = queryPosts.length < total;
  const loadMorePosts =
    entry?.isIntersecting && !isFetching && !isLoading && hasMore;

  useEffect(() => {
    if (loadMorePosts) {
      fetchNextPage();
    }
  }, [loadMorePosts, fetchNextPage]);

  // Always use query data if available, if not use initial data that will be provided by the server
  const posts = data?.pages.flatMap(page => page.posts) ?? props.posts;

  return { posts, ref, error, isFetching, isLoading };
};
