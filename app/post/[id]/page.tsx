import { Post } from '@/app/components/Post';
import { fetchPost, fetchPosts } from '@/lib/api/posts';
import { validatePostWithAuthor } from '@/lib/features/posts/postsValidation';
import type { PostWithAuthor } from '@/lib/features/posts/postTypes';
import { decompressData } from '@/lib/utils/compression';

type Params = { id: string };
type SearchParams = { [key: string]: string | string[] | undefined };

type PostPageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export async function generateStaticParams() {
  const posts = await fetchPosts(200, 0).then(res => res.posts);

  return posts.map((post: PostWithAuthor) => ({
    id: String(post.id),
  }));
}

const getPostFromUrl = (searchParams: Awaited<SearchParams>) => {
  const urlData = searchParams.post;

  if (!urlData || typeof urlData !== 'string') {
    return null;
  }

  try {
    return validatePostWithAuthor(decompressData(urlData));
  } catch (error) {
    console.error('Error validating post data:', error);
    return null;
  }
};

const getData = async (searchParams: Awaited<SearchParams>, id: string) => {
  try {
    const postDataFromUrl = getPostFromUrl(searchParams);
    const postData = postDataFromUrl ?? (await fetchPost(id));
    return postData;
  } catch (error) {
    return null;
  }
};

export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const { id } = await params;
  const postData = await getData(await searchParams, id);

  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      {postData ? (
        <>
          <h2 style={{ textAlign: 'center' }}>Post: {id}</h2>
          <Post {...postData} />
        </>
      ) : (
        <h2 style={{ textAlign: 'center' }}>
          No data available for post with id {id}
        </h2>
      )}
    </div>
  );
}
