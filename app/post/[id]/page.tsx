import { Post } from '../../components/Post';
import { fetchPost } from '@/lib/api/posts';

type Params = { id: string };

type PostPageProps = {
  params: Params;
};

export default async function PostsPage({ params }: PostPageProps) {
  const { id } = await params;
  const postData = await fetchPost(id);

  return (
    <>
      {postData ? (
        <Post {...postData} />
      ) : (
        <h1>No data for post with id {id}</h1>
      )}
    </>
  );
}
