import { Metadata } from 'next';
import { PostsList } from './components/PostsList';
import { fetchPosts } from '@/lib/api/posts';
import { getPropFromParams } from '@/lib/utils/params';

type PostsPageProps = {
  searchParams: {
    limit?: string;
    skip?: string;
  };
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const sParams = await searchParams;
  const limit = getPropFromParams(sParams, 'limit', 20);
  const skip = getPropFromParams(sParams, 'skip', 0);
  const postsData = await fetchPosts(limit, skip);

  return (
    <div>
      <h1>Posts</h1>
      <PostsList
        initialData={{
          limit: 10,
          posts: postsData,
          skip: 0,
          total: postsData.length,
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Redux Toolkit posts',
};
