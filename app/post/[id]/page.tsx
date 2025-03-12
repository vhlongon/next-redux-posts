import { Post } from '@/app/components/Post';
import { fetchPost } from '@/lib/api/posts';

type Params = { id: string };

type PostPageProps = {
  params: Params;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postData = await fetchPost(id);

  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      {postData ? (
        <>
          <h2 style={{ textAlign: 'center' }}>Post: {id}</h2>
          <Post {...postData} />
        </>
      ) : (
        <h2>No data for post with id {id}</h2>
      )}
    </div>
  );
}
