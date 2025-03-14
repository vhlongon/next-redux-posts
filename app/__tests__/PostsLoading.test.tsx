import { render, screen } from '@/test/utils';
import PostsLoading from '../loading';

describe('PostsLoading', () => {
  test('renders skeleton loading elements', () => {
    render(<PostsLoading />);
    expect(screen.getByRole('heading', { name: 'Posts', level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText('Loading posts list')).toBeInTheDocument();
  });
});
