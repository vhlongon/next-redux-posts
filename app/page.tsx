import { fetchPosts } from '@/lib/api/posts';
import { getPropFromParams } from '@/lib/utils/params';
import type { Metadata } from 'next';
import { Posts } from './components/Posts';

type PostsPageProps = {
  searchParams: {
    limit?: string;
    skip?: string;
  };
};

export default async function IndexPage({ searchParams }: PostsPageProps) {
  const sParams = await searchParams;
  const limit = getPropFromParams(sParams, 'limit', 20);
  const skip = getPropFromParams(sParams, 'skip');
  const postsData = await fetchPosts(limit, skip);

  return (
    <Posts
      initialData={{
        posts: postsData,
        limit,
        skip,
        total: postsData.length,
      }}
    />
  );
}

export const metadata: Metadata = {
  title: 'Redux Toolkit posts',
};
