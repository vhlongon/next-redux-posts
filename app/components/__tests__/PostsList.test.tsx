import type { PostsWithAuthorResponse } from '@/lib/features/posts/postTypes';
import { mockedPosts } from '@/test/mocks/postMock';
import { render, screen } from '@/test/utils';
import { PostsList } from '../PostsList';

describe('PostsList', () => {
  const initialData: PostsWithAuthorResponse = {
    posts: mockedPosts,
    total: mockedPosts.length,
    limit: mockedPosts.length,
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
