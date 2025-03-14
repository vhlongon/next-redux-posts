import { mockedPosts } from '@/test/mocks/postMock';
import { render, screen } from '@/test/utils';
import PostsPage from '../page';

describe('MainPage', () => {
  test('renders the main page', async () => {
    const searchParams = Promise.resolve({
      limit: '20',
      skip: '0'
    });
    render(await PostsPage({ searchParams }));

    expect(screen.getByRole('heading', { name: 'Posts', level: 2 })).toBeInTheDocument();

    expect(screen.getAllByRole('listitem')).toHaveLength(mockedPosts.length);

    for (const post of mockedPosts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });
});
