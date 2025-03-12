'use client';

import { useGetPostQuery } from '@/lib/features/posts/postsApiSlice';
import { Post } from './Post';

export const SinglePost = ({ id }: { id: number }) => {
  const { data, isLoading, error, isError } = useGetPostQuery({ id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        {error && 'status' in error
          ? `${error.status} ${JSON.stringify(error.data)}`
          : error.message}
      </div>
    );
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <Post {...data} />;
};
