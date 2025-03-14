import { Post } from '@/app/components/Post';
import { fetchPost, fetchPosts } from '@/lib/api/posts';
import type { PostWithAuthor } from '@/lib/features/posts/postTypes';
import { validatePostWithAuthor } from '@/lib/features/posts/postsValidation';
import { decompressData } from '@/lib/utils/compression';

type Params = { id: string };
type SearchParams = { [key: string]: string | string[] | undefined };

type PostPageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export async function generateStaticParams() {
  const posts = await fetchPosts(200, 0).then((res) => res.posts);

  return posts.map((post: PostWithAuthor) => ({
    id: String(post.id)
  }));
}

const getData = async (searchParams: Awaited<SearchParams>, id: string) => {
  const urlData = searchParams.post;

  if (urlData && typeof urlData === 'string') {
    try {
      return validatePostWithAuthor(decompressData(urlData));
    } catch (error) {
      console.error('Error validating post data from url:', error);
      throw new Error('Failure to validate post data from url');
    }
  }

  try {
    return await fetchPost(id);
  } catch (error) {
    console.error('Error fetching post data:', error);
    throw new Error('Failure to fetch post data from api');
  }
};

export async function generateMetadata({ params, searchParams }: PostPageProps) {
  const { id } = await params;

  const data = await getData(await searchParams, id);
  const authorFullName = data ? `${data.author.firstName} ${data.author.lastName}` : '';
  const by = authorFullName ? `by ${authorFullName}` : '';

  return {
    title: `Post ${id}`,
    description: `Post ${id} ${by}`
  };
}

export default async function PostPage({ params, searchParams }: PostPageProps) {
  const { id } = await params;
  const postData = await getData(await searchParams, id);

  return (
    <div style={{ padding: 'var(--spacing-xl)', maxWidth: '936px', margin: '0 auto' }}>
      {postData ? (
        <>
          <h2 style={{ textAlign: 'center' }}>Post: {id}</h2>
          <Post {...postData} />
        </>
      ) : (
        <h2 style={{ textAlign: 'center' }}>No data available for post with id {id}</h2>
      )}
    </div>
  );
}
