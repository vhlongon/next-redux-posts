import { fetchPosts } from '@/lib/api/posts';
import { getPropFromParams } from '@/lib/utils/params';
import type { Metadata } from 'next';
import { PostsList } from './components/PostsList';

type PostsPageProps = {
  searchParams: Promise<{
    limit?: string;
    skip?: string;
  }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const sParams = await searchParams;
  const limit = getPropFromParams(sParams, 'limit', 20);
  const skip = getPropFromParams(sParams, 'skip', 0);
  const { posts, total } = await fetchPosts(limit, skip);

  return (
    <div
      style={{
        padding: 'var(--spacing-xl)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Posts</h2>
      <PostsList
        initialData={{
          limit,
          posts,
          skip,
          total
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Redux Toolkit Next.js posts',
  description: 'A list of posts created with Redux Toolkit and Next.js'
};
