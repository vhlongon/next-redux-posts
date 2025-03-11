import type { Metadata } from 'next';
import { Posts } from './components/Posts';
import { fetchPosts } from '@/lib/api/posts';

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { limit?: string; skip?: string };
}) {
  const sParams = await searchParams;
  const limit = Number(sParams.limit) || 20;
  const skip = Number(sParams.skip) || 0;
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
