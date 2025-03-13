import type { PostsWithAuthorResponse } from '@/lib/features/posts/postTypes';
import { mockedPosts, mockedUser } from '@/test/mocks/postMock';
import { render, screen } from '@/test/utils';
import { PostsList } from '../PostsList';

describe('PostsList', () => {
  const postsWithAuthor = mockedPosts.map(post => ({
    ...post,
    author: mockedUser,
  }));

  const initialData: PostsWithAuthorResponse = {
    posts: postsWithAuthor,
    total: postsWithAuthor.length,
    limit: postsWithAuthor.length,
    skip: 0,
  };

  test('should render correctly with initial data', () => {
    render(<PostsList initialData={initialData} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(mockedPosts.length);

    for (const post of mockedPosts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });
});
